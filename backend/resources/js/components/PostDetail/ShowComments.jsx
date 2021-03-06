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
                    <ItemLists
                        name={comment.user.name}
                        img={comment.user.img}
                        comment={comment.comment}
                        date={comment.updated_at}
                        key={comment.id}
                    />
                ))}
            </List>
        </div>
    );
};

export default ShowComments;
