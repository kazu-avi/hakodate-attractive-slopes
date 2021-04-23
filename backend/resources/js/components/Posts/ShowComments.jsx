import React from 'react';
import CommentIcon from '@material-ui/icons/Comment';
import { List } from '@material-ui/core';
import ItemLists from '../UIKit/ItemLists';

const ShowComments = (props) => {
    return (
        <div>
            <h3>
                <span>
                    <CommentIcon />
                </span>
                みんなのコメント
            </h3>
            <List>
                {props.comments.map((comment) => (
                    <ItemLists name={comment.user.name} comment={comment.comment} key={comment.id} />
                ))}
            </List>
        </div>
    );
};

export default ShowComments;
