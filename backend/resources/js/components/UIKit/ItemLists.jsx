import React from 'react';
import { makeStyles } from '@material-ui/styles';
import CommentIcon from '@material-ui/icons/Comment';
import { Divider, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core';

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
                    <CommentIcon />
                </ListItemAvatar>
                <ListItemText primary={props.name} secondary={props.comment} />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
};

export default ItemLists;
