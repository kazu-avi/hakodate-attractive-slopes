import React, { useEffect, useCallback, useState } from 'react';
import { PostCard, PostListTabs, DisplayCategoriesArea } from '../components/Posts';
import { Pagination } from '../components/UIKit';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getCategoriesList } from '../reducks/categories/selectors';
import { getAllTags } from '../reducks/tags/operations';
import { getTagsList } from '../reducks/tags/selectors';
import { showLoadingAction, hideLoadingAction } from '../reducks/loading/actions';

const PostList = () => {
    const [postList, setPostList] = useState([]),
        [page, setPage] = useState(1),
        [totalPage, setTotalPage] = useState(0);

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const query = selector.router.location.search;

    console.log(page);

    // 取得したクエリが<?category=>の形と一致するか確認し、category_idを取得
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : '';
    const tag = /^\?tag=/.test(query) ? query.split('?tag=')[1] : '';
    const random = /^\?random=/.test(query) ? query.split('?random=')[1] : '';

    const getPostList = useCallback(
        async (page) => {
            setPage(page);
            if (tag) {
                tagClickHandler(tag, page);
            } else if (category) {
                categoryClickHandler(category, page);
            } else if (random) {
                randomClickHandler(page);
            } else {
                newestClickHandler(page);
            }
        },
        [getPostList]
    );

    const categoryClickHandler = useCallback(
        async (id, page) => {
            dispatch(showLoadingAction());
            dispatch(push('/?category=' + id));
            // setPage(page);
            const url = 'http://localhost:30080/api/v1/categories/' + id + '?page=' + page;
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
                    dispatch(hideLoadingAction());
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                });
        },
        [categoryClickHandler]
    );

    const tagClickHandler = useCallback(
        async (id, page) => {
            dispatch(showLoadingAction());
            dispatch(push('/?tag=' + id));
            // setPage(page);
            const url = 'http://localhost:30080/api/v1/tags/' + id + '?page=' + page;
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
                    dispatch(hideLoadingAction());
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                });
        },
        [tagClickHandler]
    );

    const randomClickHandler = useCallback(
        async (page) => {
            dispatch(showLoadingAction());
            dispatch(push('/?random=1'));
            // setPage(page);
            const url = 'http://localhost:30080/api/v1/posts/r?page=' + page;
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
                    dispatch(hideLoadingAction());
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                });
        },
        [randomClickHandler]
    );

    const newestClickHandler = useCallback(
        async (page) => {
            dispatch(showLoadingAction());
            dispatch(push('/'));
            // setPage(page);
            const url = 'http://localhost:30080/api/v1/posts?page=' + page;
            const token = localStorage.getItem('access_token');
            const option = {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            };
            await fetch(url, option)
                .then((response) => {
                    return response.json();
                })
                .then((responseJson) => {
                    setPostList(responseJson.data);
                    setTotalPage(responseJson.last_page);
                    dispatch(hideLoadingAction());
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                });
        },
        [newestClickHandler]
    );

    //  初期値のセット
    useEffect(() => {
        console.log('effect');
        getPostList(page);
        dispatch(getAllTags());
    }, []);

    const categoriesList = getCategoriesList(selector);
    const tagsList = getTagsList(selector);

    return (
        <>
            <section className="large-section">
                <h2>坂道を知る</h2>
                <DisplayCategoriesArea categories={categoriesList} />
            </section>
            <section className="small-section">
                <PostListTabs
                    categories={categoriesList}
                    categoriesClick={categoryClickHandler}
                    tags={tagsList}
                    tagsClick={tagClickHandler}
                    randomClick={randomClickHandler}
                    newestClick={newestClickHandler}
                />
            </section>
            <section className="large-section">
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
                            chipClick={() => categoryClickHandler(post.category_id)}
                            tagClick={tagClickHandler}
                            onClick={() => dispatch(push('/posts/' + post.id))}
                        />
                    ))}
                </div>
                {(() => {
                    if (totalPage === 1) {
                        return <></>;
                    } else {
                        return <Pagination count={totalPage} disabled={false} onChange={getPostList} page={page} />;
                    }
                })()}
            </section>
        </>
    );
};

export default PostList;
