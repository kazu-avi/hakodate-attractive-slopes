import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { PostCard } from '../components/Posts';
import { getCategoriesList } from '../reducks/categories/selectors';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { showLoadingAction, hideLoadingAction } from '../reducks/loading/actions';
import { showAlertAction, hideAlertAction } from '../reducks/alert/actions';
import { useDispatch, useSelector } from 'react-redux';
// import { PrimaryButton, OutlinedButton } from '../components/UIKit';
// import { ShowCategory, ShowComments, ShowTags, InputCommentArea, ShowLikes } from '../components/PostDetail';
// import { postDelete } from '../components/Posts/postRegister';
import { PrimaryButton, SharpEdgeButton } from '../components/UIKit';
import { push } from 'connected-react-router';
import { DisplayCategoriesArea } from '../components/Posts';
// import { getIsSignedIn, getUserId } from '../reducks/users/selector';
import map from '../../../public/img/map.gif';

const useStyles = makeStyles({
    card: {
        padding: 8,
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

const CategoryDetail = () => {
    const [postList, setPostList] = useState([]),
        [page, setPage] = useState(1),
        [totalPage, setTotalPage] = useState(0),
        [displayCard, setDisplayCard] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const param = useParams();
    const id = param.id;
    const selector = useSelector((state) => state);
    const pathname = selector.router.location.pathname;
    const categories = getCategoriesList(selector);
    const category = categories[id - 1];
    console.log(postList);
    console.log(displayCard);

    const categoryClickHandler = useCallback(
        async (id, page) => {
            dispatch(showLoadingAction());
            setPage(page);
            const url = 'https://hakodate-slopes.com/api/v1/categories/' + id + '?page=' + page;
            const token = localStorage.getItem('access_token');
            const option = {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            };
            await fetch(url, option)
                .then((response) => response.json())
                .then((responseJson) => {
                    setPostList(responseJson.data);
                    setTotalPage(responseJson.last_page);
                    if (responseJson.data.length === 0) {
                        setDisplayCard(false);
                        dispatch(showAlertAction(category.name + 'の投稿はまだありません。'));
                        setTimeout(() => {
                            dispatch(hideAlertAction());
                        }, 2000);
                    } else {
                        setDisplayCard(true);
                    }
                    dispatch(hideLoadingAction());
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                });
        },
        [categoryClickHandler]
    );

    useEffect(() => {
        setPostList([]);
        setDisplayCard(false);
    }, [pathname]);

    return (
        <div className="large-section">
            <h2>{category.name}</h2>
            <section className="large-section-flex">
                <Card className="flex-2cms">
                    <div className="image-thumb">
                        <img src={category.img} alt="投稿画像" />
                    </div>
                </Card>
                <div className="flex-2cms">
                    <Card className={classes.card} variant="outlined">
                        <CardContent>{category.description}</CardContent>
                        <CardContent>住所：{category.address}</CardContent>
                    </Card>
                    {/* <div className="large-section-flex">
                        <Card className={classes.card} variant="outlined">
                            投稿数：
                        </Card>
                        <Card className={classes.card} variant="outlined">
                            「行きたい」数：
                        </Card>
                    </div> */}
                    <div className="spacer-medium" />
                    <img alt="坂道マップ" src={map} width="100%" />
                    <div className="spacer-medium" />
                    <PrimaryButton label={'みんなの投稿を見る'} onClick={() => categoryClickHandler(id, page)} />
                </div>
            </section>
            {displayCard && <h2>みんなの投稿</h2>}
            <div className="grid-row">
                {postList.map((post) => (
                    <PostCard
                        key={post.id}
                        postId={post.id}
                        image={post.file_path}
                        text={post.text}
                        category={post.category.name}
                        name={post.user.name}
                        userImg={post.user.img}
                        date={post.updated_at}
                        tags={post.tags}
                        isLiked={post.liked_by_user}
                        onClick={() => dispatch(push('/posts/' + post.id))}
                    />
                ))}
            </div>
            <h2>他の坂道も知る</h2>
            <DisplayCategoriesArea categories={categories} onClick={() => setDisplayCard(false)} />
            <div className="spacer-medium" />
            <SharpEdgeButton label={'< Back To Home'} onClick={() => dispatch(push('/'))} />
        </div>
    );
};

export default CategoryDetail;
