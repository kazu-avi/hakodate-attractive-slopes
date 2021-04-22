import React, { useEffect, useCallback, useState } from 'react';
import { PostCard, PostListTabs } from '../components/Posts';
import { Pagination } from '../components/UIKit';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getAllCategories } from '../reducks/categories/operations';
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

    // 取得したクエリが<?category=>の形と一致するか確認し、category_idを取得
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : '';
    const tag = /^\?tag=/.test(query) ? query.split('?tag=')[1] : '';

    const getPostList = useCallback(
        async (page) => {
            if (tag) {
                dispatch(showLoadingAction());
                setPage(page);
                const url = 'http://localhost:30080/api/v1/tags/' + tag + '?page=' + page;
                await fetch(url)
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
            } else if (category) {
                dispatch(showLoadingAction());
                setPage(page);
                const url = 'http://localhost:30080/api/v1/categories/' + category + '?page=' + page;
                await fetch(url)
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
            } else {
                dispatch(showLoadingAction());
                setPage(page);
                const url = 'http://localhost:30080/api/v1/posts?page=' + page;
                await fetch(url)
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
            }
        },
        [getPostList]
    );

    const categoryClickHandler = useCallback(
        async (id) => {
            dispatch(showLoadingAction());
            dispatch(push('/?category=' + id));
            setPage(page);
            const url = 'http://localhost:30080/api/v1/categories/' + id + '?page=' + page;
            await fetch(url)
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
        async (id) => {
            dispatch(showLoadingAction());
            dispatch(push('/?tag=' + id));
            setPage(page);
            const url = 'http://localhost:30080/api/v1/tags/' + id + '?page=' + page;
            await fetch(url)
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

    //  初期値のセット
    useEffect(() => {
        getPostList(page);
        dispatch(getAllCategories());
        dispatch(getAllTags());
    }, []);

    const categoriesList = getCategoriesList(selector);
    const tagsList = getTagsList(selector);

    return (
        <>
            <section className="small-section">
                <PostListTabs
                    categories={categoriesList}
                    categoriesClick={categoryClickHandler}
                    tags={tagsList}
                    tagsClick={tagClickHandler}
                />
            </section>
            <section className="large-section">
                <div className="grid-row">
                    {postList.map((post) => (
                        <PostCard
                            key={post.id}
                            image={post.file_path}
                            text={post.text}
                            category={post.category.name}
                            name={post.user.name}
                            date={post.updated_at}
                            tags={post.tags}
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
