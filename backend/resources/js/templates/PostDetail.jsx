import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { Card, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { showLoadingAction, hideLoadingAction } from '../reducks/loading/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ShowCategory, ShowComments, ShowTags, InputCommentArea } from '../components/Posts';
import { SharpEdgeButton } from '../components/UIKit';
import { push } from 'connected-react-router';
import { getIsSignedIn } from '../reducks/users/selector';

const useStyles = makeStyles({
    icon: {
        color: '#DA1725',
    },
});

const PostDetail = () => {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [category, setCategory] = useState('');
    const [tagsList, setTagsList] = useState([]);
    const [comments, setComments] = useState([]);

    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSighedIn = getIsSignedIn(selector);
    const param = useParams();
    const id = param.id;

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
                setComments(responseJson.comments);
                dispatch(hideLoadingAction());
            })
            .catch((error) => console.error(error));
    });

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
                    <ShowComments comments={comments} />
                    {isSighedIn ? <InputCommentArea id={id} /> : <p>コメント投稿はログイン後に可能です</p>}
                </div>
            </section>
            <SharpEdgeButton label={'< Back To Home'} onClick={() => dispatch(push('/'))} />
        </div>
    );
};

export default PostDetail;
