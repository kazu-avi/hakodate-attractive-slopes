import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Divider, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';
import noimage from '../../../../public/img/noimage.jpeg';

const useStyles = makeStyles({
    comment: {
        whiteSpace: 'pre-wrap',
    },
});

const ItemLists = (props) => {
    const classes = useStyles();
    return (
        <>
            <ListItem className={classes.comment}>
                <ListItemAvatar>
                    {props.img ? <Avatar alt="ユーザー画像" src={props.img} /> : <Avatar alt="noimage" src={noimage} />}
                </ListItemAvatar>
                <ListItemText
                    primary={props.name}
                    secondary={
                        <>
                            <span>{props.comment}</span>
                            <br />
                            &nbsp;--{props.date}
                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
};

export default ItemLists;
