import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { Card } from '@material-ui/core';
import { showLoadingAction, hideLoadingAction } from '../reducks/loading/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ShowCategory, ShowComments, ShowTags, InputCommentArea, ShowLikes } from '../components/Posts';
import { SharpEdgeButton } from '../components/UIKit';
import { push } from 'connected-react-router';
import { getIsSignedIn } from '../reducks/users/selector';

const PostDetail = () => {
    const [post, setPost] = useState([]);
    const [user, setUser] = useState([]);
    const [category, setCategory] = useState('');
    const [tagsList, setTagsList] = useState([]);
    const [comments, setComments] = useState([]);
    const [isLiked, setIsLiked] = useState('');
    const [likesCount, setLikesCount] = useState('');

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSighedIn = getIsSignedIn(selector);
    const param = useParams();
    const id = param.id;

    const getPost = useCallback(async (id) => {
        const url = 'http://localhost:30080/api/v1/posts/' + id;
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
                setPost(responseJson);
                setUser(responseJson.user);
                setCategory(responseJson.category);
                setTagsList(responseJson.tags);
                setComments(responseJson.comments);
                setIsLiked(responseJson.liked_by_user);
                setLikesCount(responseJson.likes_count);
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
                    <ShowLikes likesCount={likesCount} isLiked={isLiked} id={id} isSignedIn={isSighedIn} />
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
