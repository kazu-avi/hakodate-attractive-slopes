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
    const hash = selector.router.location.hash;

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
            } else if (hash) {
                hashClickHandler(hash, page);
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
            const url = 'https://hakodate-slopes.com/api/v1/tags/' + id + '?page=' + page;
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
            const url = 'https://hakodate-slopes.com/api/v1/posts/r?page=' + page;
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
            const url = 'https://hakodate-slopes.com/api/v1/posts?page=' + page;
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

    const hashClickHandler = useCallback(
        async (hash, page) => {
            dispatch(showLoadingAction());
            dispatch(push('/' + hash));
            const url = 'https://hakodate-slopes.com/api/v1/posts?page=' + page;
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
                    scrollToHash(hash);
                    dispatch(hideLoadingAction());
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                });
        },
        [hashClickHandler]
    );

    const scrollToHash = (hash) => {
        if (hash === '#categories') {
            const target = document.getElementById('categories');
            const length = window.pageYOffset + target.getBoundingClientRect().top;
            try {
                window.scroll({
                    top: length - 64,
                    behavior: 'smooth',
                });
            } catch (error) {
                window.scrollTo(length - 64, 0);
            }
        } else if (hash === '#posts') {
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
        } else {
            return null;
        }
    };

    //  初期値のセット
    useEffect(() => {
        getPostList(page);
        dispatch(getAllTags());
    }, []);

    // ページ内リンク
    useEffect(() => {
        scrollToHash(hash);
    }, [hash]);

    const categoriesList = getCategoriesList(selector);
    const tagsList = getTagsList(selector);
    console.log(postList);

    return (
        <>
            <section id="categories" className="large-section">
                <h2>坂道を知る</h2>
                <DisplayCategoriesArea categories={categoriesList} />
            </section>
            <div className="spacer-medium" />
            <section id="posts" className="small-section">
                <h2>みんなの投稿</h2>
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
                {postList.length === 0 && <p className="center">関連する投稿はまだありません</p>}
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
                            chipClick={() => dispatch(push('/categories/' + post.category_id))}
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
