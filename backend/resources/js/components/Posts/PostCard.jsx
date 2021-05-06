import React from 'react';
import {
    Avatar,
    Card,
    CardMedia,
    CardContent,
    Chip,
    CardActions,
    IconButton,
    Typography,
    CardHeader,
} from '@material-ui/core';
import FilterHdrIcon from '@material-ui/icons/FilterHdr';
import ShareIcon from '@material-ui/icons/Share';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import { makeStyles } from '@material-ui/styles';
import { DisplayLikes } from '../PostCard';
import noimage from '../../../../public/img/noimage.jpeg';

const useStyles = makeStyles({
    root: {
        width: '32%',
        zIndex: 1,
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
    },
    media: {
        position: 'absolute',
        objectFit: 'cover',
        objectPosition: 'center',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 10,
    },
    chip: {
        zIndex: 99,
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(204, 204, 204, 0.8)',
    },
    content: {
        whiteSpace: 'pre-wrap',
        flexGrow: 1,
    },
});

const PostCard = (props) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <div className="image-thumb">
                <CardMedia className={classes.media} image={props.image} onClick={() => props.onClick()} />
                <Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    icon={<FilterHdrIcon />}
                    label={props.category}
                    onClick={() => props.chipClick()}
                />
            </div>
            <CardContent className={classes.content}>
                <Typography>{props.text}</Typography>
                {props.tags.map((tag) => (
                    <Chip
                        variant="outlined"
                        size="small"
                        icon={<LocalOfferIcon />}
                        label={tag.name}
                        key={tag.id}
                        onClick={() => props.tagClick(tag.id)}
                    />
                ))}
            </CardContent>
            <CardActions>
                <DisplayLikes isLiked={props.isLiked} postId={props.postId} />
                <IconButton>
                    <ShareIcon />
                </IconButton>
                <CardHeader
                    avatar={
                        props.userImg ? (
                            <Avatar alt="ユーザー画像" src={props.userImg} />
                        ) : (
                            <Avatar alt="noimage" src={noimage} />
                        )
                    }
                    title={props.name}
                    subheader={props.date}
                />
            </CardActions>
        </Card>
    );
};

export default PostCard;
