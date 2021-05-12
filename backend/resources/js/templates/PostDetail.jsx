import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router';
import { Avatar, Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { showLoadingAction, hideLoadingAction } from '../reducks/loading/actions';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton, OutlinedButton } from '../components/UIKit';
import { ShowCategory, ShowComments, ShowTags, InputCommentArea, ShowLikes } from '../components/PostDetail';
import { postDelete } from '../components/Posts/postRegister';
import { SharpEdgeButton } from '../components/UIKit';
import { push } from 'connected-react-router';
import { getIsSignedIn, getUserId } from '../reducks/users/selector';
import noimage from '../../../public/img/noimage.jpeg';

const useStyles = makeStyles({
    card: {
        padding: 8,
        width: 'calc(35% - 1rem)',
        borderRadius: 0,
    },
    actions: {
        padding: 8,
        justifyContent: 'space-between',
        borderBottom: '2px solid #f2f4fb',
    },
    text: {
        whiteSpace: 'pre-wrap',
    },
});

const PostDetail = () => {
    const [post, setPost] = useState([]),
        [user, setUser] = useState([]),
        [text, setText] = useState(''),
        [category, setCategory] = useState(''),
        [tagsList, setTagsList] = useState([]),
        [comments, setComments] = useState([]),
        [isLiked, setIsLiked] = useState(''),
        [likesCount, setLikesCount] = useState(''),
        [postedUser, setPostedUser] = useState('');

    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSighedIn = getIsSignedIn(selector);
    const uid = getUserId(selector);
    const param = useParams();
    const id = param.id;

    const getPost = useCallback(async (id) => {
        const url = 'https://localhost:443/api/v1/posts/' + id;
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
                setText(responseJson.text);
                setPostedUser(responseJson.user_id);
                setCategory(responseJson.category);
                setTagsList(responseJson.tags);
                setComments(responseJson.comments);
                setIsLiked(responseJson.liked_by_user);
                setLikesCount(responseJson.likes_count);
            })
            .catch((error) => console.error(error));
        dispatch(hideLoadingAction());
    });

    useEffect(() => {
        getPost(id);
    }, []);

    return (
        <div className="large-section">
            <section className="large-section-flex">
                <Card className="flex-3cms-big">
                    <div className="image-thumb">
                        <img src={post.file_path} alt="投稿画像" />
                    </div>
                </Card>
                <Card className={classes.card}>
                    <CardActions className={classes.actions}>
                        <CardHeader
                            avatar={
                                user.img ? (
                                    <Avatar alt="ユーザー画像" src={user.img} />
                                ) : (
                                    <Avatar alt="noimage" src={noimage} />
                                )
                            }
                            title={user.name}
                            subheader={post.updated_at}
                        />
                        <ShowLikes likesCount={likesCount} isLiked={isLiked} id={id} isSignedIn={isSighedIn} />
                    </CardActions>
                    <CardContent>
                        {uid === postedUser ? (
                            <div className="center">
                                <PrimaryButton label={'投稿を編集する'} onClick={() => dispatch(push('/edit/' + id))} />
                                <span className="margin-20" />
                                <OutlinedButton
                                    label={'投稿を削除する'}
                                    onClick={() => dispatch(postDelete(uid, id, postedUser))}
                                />
                            </div>
                        ) : (
                            <></>
                        )}
                        <p className={classes.text}>{text}</p>
                        <ShowCategory category={category} />
                        <ShowTags tags={tagsList} />
                    </CardContent>
                </Card>
            </section>
            <div>
                <ShowComments comments={comments} />
                {isSighedIn ? <InputCommentArea id={id} /> : <p>コメント投稿はログイン後に可能です</p>}
            </div>
            <div className="spacer-medium" />
            <SharpEdgeButton label={'< Back To Home'} onClick={() => dispatch(push('/'))} />
        </div>
    );
};

export default PostDetail;
