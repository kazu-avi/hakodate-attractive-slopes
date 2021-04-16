import React, { useEffect, useCallback, useState } from 'react';
import { PostCard } from '../components/Posts';
import { Pagination } from '../components/UIKit';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';

const PostList = () => {
    const [postList, setPostList] = useState([]),
        [page, setPage] = useState(1),
        [totalPage, setTotalPage] = useState(0);

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const query = selector.router.location.search;
    // 取得したクエリが<?category=>の形と一致するか確認し、category_idを取得
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : '';

    const getPostList = useCallback(
        async (page) => {
            if (!category) {
                setPage(page);
                const url = 'http://localhost:30080/api/v1/posts?page=' + page;
                await fetch(url)
                    .then((response) => {
                        return response.json();
                    })
                    .then((responseJson) => {
                        setPostList(responseJson.data);
                        setTotalPage(responseJson.last_page);
                    })
                    .catch((error) => console.error(error));
            } else {
                setPage(page);
                const url = 'http://localhost:30080/api/v1/categories/' + category + '?page=' + page;
                await fetch(url)
                    .then((response) => response.json())
                    .then((responseJson) => {
                        setPostList(responseJson.data);
                        setTotalPage(responseJson.last_page);
                    })
                    .catch((error) => console.error(error));
            }
        },
        [getPostList]
    );

    const chipClickHandler = useCallback(
        async (id) => {
            dispatch(push('/?category=' + id));
            setPage(page);
            const url = 'http://localhost:30080/api/v1/categories/' + id + '?page=' + page;
            await fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    setPostList(responseJson.data);
                    setTotalPage(responseJson.last_page);
                })
                .catch((error) => console.error(error));
        },
        [chipClickHandler]
    );

    //  初期値のセット
    useEffect(() => {
        getPostList(page);
    }, []);

    return (
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
                        chipClick={() => chipClickHandler(post.category_id)}
                    />
                ))}
            </div>
            <Pagination count={totalPage} disabled={false} onChange={getPostList} page={page} />
        </section>
    );
};

export default PostList;
