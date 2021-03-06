import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { PostCard } from '../components/Posts';
import { getCategoriesList } from '../reducks/categories/selectors';
import { Card, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { showLoadingAction, hideLoadingAction } from '../reducks/loading/actions';
import { showAlertAction, hideAlertAction } from '../reducks/alert/actions';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryButton, SharpEdgeButton, Pagination, Breadcrumb, Helmet } from '../components/UIKit';
import { push } from 'connected-react-router';
import { DisplayCategoriesArea } from '../components/Posts';
import map from '../../../public/img/map.png';

const useStyles = makeStyles({
    card: {
        padding: 8,
        borderRadius: 0,
        whiteSpace: 'pre-wrap',
        fontSize: '0.875rem',
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

    const categoryClickHandler = useCallback(
        async (page, id) => {
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
                        dispatch(showAlertAction(category.name + '????????????????????????????????????'));
                        setTimeout(() => {
                            dispatch(hideAlertAction());
                        }, 2000);
                    } else {
                        setDisplayCard(true);
                    }
                    dispatch(hideLoadingAction());
                    scrollToPosts();
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                });
        },
        [categoryClickHandler]
    );

    const scrollToPosts = () => {
        const target = document.getElementById('posts');
        const postLength = window.pageYOffset + target.getBoundingClientRect().top;
        try {
            window.scroll({
                top: postLength - 64,
                behavior: 'smooth',
            });
        } catch (error) {
            window.scrollTo(postLength - 64, 0);
        }
    };

    useEffect(() => {
        setPostList([]);
        setDisplayCard(false);
    }, [pathname]);

    return (
        <div className="large-section">
            <Helmet title={category.name + '????????? | HAKODATE ATTRACTIVE SLOPES'} />
            <Breadcrumb text={category.name + '?????????'} />
            <h2>{category.name}</h2>
            <section className="large-section-flex">
                <Card className="flex-2cms">
                    <div className="image-thumb">
                        <img src={category.img} alt="????????????" />
                    </div>
                </Card>
                <div className="flex-2cms">
                    <Card className={classes.card} variant="outlined">
                        <CardContent className={classes.text}>{category.description}</CardContent>
                        <CardContent>?????????????????????????????????????????????????????????????????????</CardContent>
                        <CardContent className="center">
                            <PrimaryButton
                                label={category.name + '??????????????????'}
                                onClick={() => categoryClickHandler(page, id)}
                            />
                        </CardContent>
                    </Card>
                    <div className="spacer-medium" />
                </div>
            </section>
            <div className="center">
                <img alt="???????????????" src={map} width="85%" />
            </div>
            <div className="spacer-medium" />
            {displayCard && <h2 id="posts">??????????????????</h2>}
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
            {(() => {
                if (totalPage === 0 || totalPage === 1) {
                    return <></>;
                } else {
                    return (
                        <Pagination count={totalPage} disabled={false} onChange={categoryClickHandler} page={page} />
                    );
                }
            })()}
            <h2>?????????????????????</h2>
            <DisplayCategoriesArea categories={categories} onClick={() => setDisplayCard(false)} />
            <div className="spacer-medium" />
            <SharpEdgeButton label={'< Back To Home'} onClick={() => dispatch(push('/'))} />
        </div>
    );
};

export default CategoryDetail;
