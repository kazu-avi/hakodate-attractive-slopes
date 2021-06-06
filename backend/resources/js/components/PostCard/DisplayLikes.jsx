import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selector';
import { showLoadingAction, hideLoadingAction } from '../../reducks/loading/actions';
import { hideAlertAction, showAlertAction, showMessageAction } from '../../reducks/alert/actions';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
    isLikes: {
        color: '#DA1725',
    },
});

const DisplayLikes = (props) => {
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);
    const postId = props.postId;

    const likesClickHandler = useCallback(
        async (id) => {
            if (!isSignedIn) {
                dispatch(showAlertAction('ログインが必要です'));
                setTimeout(() => {
                    dispatch(hideAlertAction());
                }, 2000);
                return false;
            }

            const url = 'https://hakodate-slopes.com/api/v1/posts/' + id + '/likes';
            const token = localStorage.getItem('access_token');

            const like = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            };

            dispatch(showLoadingAction());

            await fetch(url, like)
                .then(() => {
                    setIsLiked(true);
                    dispatch(hideLoadingAction());
                    dispatch(showMessageAction('「行きたい！」に追加しました'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                });
        },
        [likesClickHandler]
    );

    const unlikeClickHandler = useCallback(
        async (id) => {
            if (!isSignedIn) {
                dispatch(showAlertAction('ログインが必要です'));
                setTimeout(() => {
                    dispatch(hideAlertAction());
                }, 2000);
                return false;
            }

            const url = 'https://hakodate-slopes.com/api/v1/posts/' + id + '/likes';
            const token = localStorage.getItem('access_token');

            const unlike = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            };

            dispatch(showLoadingAction());

            await fetch(url, unlike)
                .then(() => {
                    setIsLiked(false);
                    dispatch(showMessageAction('「行きたい！」から削除しました'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                    dispatch(hideLoadingAction());
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                });
        },
        [unlikeClickHandler]
    );

    return (
        <>
            {isLiked ? (
                <IconButton onClick={() => unlikeClickHandler(postId)}>
                    <FavoriteIcon className={classes.isLikes} />
                </IconButton>
            ) : (
                <IconButton onClick={() => likesClickHandler(postId)}>
                    <FavoriteIcon />
                </IconButton>
            )}
        </>
    );
};

export default DisplayLikes;
