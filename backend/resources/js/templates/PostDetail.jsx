import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { Card, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { showLoadingAction, hideLoadingAction } from '../reducks/loading/actions';
import { useDispatch } from 'react-redux';
import { ShowCategory, ShowComments, ShowTags } from '../components/Posts';
import { PrimaryButton, TextInput, SharpEdgeButton } from '../components/UIKit';
import { push } from 'connected-react-router';

const useStyles = makeStyles({
    icon: {
        color: '#DA1725',
    },
});

const PostDetail = () => {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [comment, setComment] = useState('');
    const [category, setCategory] = useState('');
    const [tagsList, setTagsList] = useState([]);

    const classes = useStyles();
    const dispatch = useDispatch();
    const param = useParams();
    const id = param.id;
    console.log(comment);

    const getPost = useCallback(async (id) => {
        const url = 'http://localhost:30080/api/v1/posts/' + id;
        dispatch(showLoadingAction());
        await fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                setPost(responseJson);
                setUser(responseJson.user);
                setCategory(responseJson.category);
                setTagsList(responseJson.tags);
                dispatch(hideLoadingAction());
            })
            .catch((error) => console.error(error));
    });

    const inputComment = useCallback(
        (event) => {
            setComment(event.target.value);
        },
        [inputComment]
    );

    useEffect(() => {
        getPost(id);
    }, []);

    return (
        <div className="large-section">
            <section className="large-section-flex">
                <Card className="flex-2cms">
                    <div className="image-thumb">
                        <img src={post.file_path} alt="投稿画像" />
                    </div>
                </Card>
                <div className="flex-2cms">
                    <Chip icon={<FavoriteIcon className={classes.icon} />} label={1} variant="outlined" />
                    <p>Posted By{user.name}</p>
                    <ShowCategory category={category} />
                    <ShowTags tags={tagsList} />
                    <ShowComments />
                    <TextInput
                        fullWidth={true}
                        label={'コメントを入力してね！'}
                        multiline={true}
                        required={false}
                        rows={3}
                        type={'text'}
                        value={comment}
                        onChange={inputComment}
                    />
                    <div className="spacer-small" />
                    <PrimaryButton label={'コメントを送信する'} onClick={() => console.log('clicked!')} />
                </div>
            </section>
            <SharpEdgeButton label={'< Back To Home'} onClick={() => dispatch(push('/'))} />
        </div>
    );
};

export default PostDetail;
