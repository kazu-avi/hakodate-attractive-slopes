import React, { useState, useCallback } from 'react';
import { DisplayLikes } from '../PostCard';
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
import noimage from '../../../../public/img/noimage.jpeg';
import { ShareMenu } from '../PostCard';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
    root: {
        width: '32%',
        zIndex: 1,
        marginBottom: '2rem',
        display: 'flex',
        flexDirection: 'column',
        '@media(max-width: 950px)': {
            width: '48%',
        },
        '@media(max-width: 650px)': {
            width: '95%',
        },
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
    actions: {
        justifyContent: 'space-around',
    },
});

const MyPageCard = (props) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleClick = useCallback(
        (event) => {
            setAnchorEl(event.currentTarget);
        },
        [handleClick]
    );

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, [handleClose]);

    return (
        <Card className={classes.root}>
            <div className="image-thumb hover">
                <CardMedia className={classes.media} image={props.image} onClick={() => props.onClick()} />
                <Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    icon={<FilterHdrIcon />}
                    label={props.category}
                    onClick={() => props.chipClick()}
                />
                <div className="hover-text" onClick={() => props.onClick()}>
                    <p>詳細を見る</p>
                </div>
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
                        onClick={() => dispatch(push('/?tag=' + tag.id))}
                    />
                ))}
            </CardContent>
            <CardActions className={classes.actions}>
                <DisplayLikes isLiked={props.isLiked} postId={props.postId} />
                <IconButton onClick={handleClick}>
                    <ShareIcon />
                </IconButton>
                <ShareMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClick={handleClick}
                    onClose={handleClose}
                    postId={props.postId}
                    postUser={props.name}
                    postText={props.text}
                />
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

export default MyPageCard;
