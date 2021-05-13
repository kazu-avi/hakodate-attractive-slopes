import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { makeStyles } from '@material-ui/styles';
import { Chip } from '@material-ui/core';
import { showLoadingAction, hideLoadingAction } from '../../reducks/loading/actions';
import { hideAlertAction, showAlertAction, showMessageAction } from '../../reducks/alert/actions';

const useStyles = makeStyles({
    icon: {
        color: '#DA1725',
    },
});

const ShowLikes = (props) => {
    const [isLiked, setIsLiked] = useState('');
    const [likesCount, setLikesCount] = useState('');

    const getCount = useCallback(async (id) => {
        const url = 'https://hakodate-slopes.com/api/v1/posts/' + id;
        const token = localStorage.getItem('access_token');

        const option = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        };
        dispatch(showLoadingAction());
        await fetch(url, option)
            .then((response) => response.json())
            .then((responseJson) => {
                setIsLiked(responseJson.liked_by_user);
                setLikesCount(responseJson.likes_count);
                dispatch(hideLoadingAction());
            })
            .catch((error) => console.error(error));
    });

    useEffect(() => {
        getCount(props.id);
        console.log('initialState');
    }, []);

    const classes = useStyles();
    const id = props.id;
    const dispatch = useDispatch();

    const likesClickHandler = useCallback(
        async (id) => {
            if (!props.isSignedIn) {
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
                    dispatch(hideLoadingAction());
                    dispatch(showMessageAction('「行きたい！」に追加しました'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                    getCount(props.id);
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
            if (!props.isSignedIn) {
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
                    dispatch(hideLoadingAction());
                    dispatch(showMessageAction('「行きたい！」から削除しました'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                    getCount(props.id);
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
                <Chip
                    icon={<FavoriteIcon className={classes.icon} />}
                    label={likesCount}
                    variant="outlined"
                    onClick={() => unlikeClickHandler(id)}
                />
            ) : (
                <Chip
                    icon={<FavoriteBorderIcon className={classes.icon} />}
                    label={likesCount}
                    variant="outlined"
                    onClick={() => likesClickHandler(id)}
                />
            )}
        </>
    );
};

export default ShowLikes;
