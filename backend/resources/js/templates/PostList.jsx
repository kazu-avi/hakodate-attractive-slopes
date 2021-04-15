import React, { useCallback, useEffect, useState } from 'react';
import { PostCard } from '../components/Posts';
import { Pagination } from '../components/UIKit';

const PostList = () => {
    const [postList, setPostList] = useState([]),
        [page, setPage] = useState(1),
        [totalPage, setTotalPage] = useState(0);

    console.log(page, totalPage);

    // 初期値のセット
    useEffect(() => {
        const getPostList = async () => {
            const url = 'http://localhost:30080/api/v1/posts/';
            await fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    setPostList(responseJson.data);
                    setTotalPage(responseJson.last_page);
                })
                .catch((error) => console.error(error));
        };
        getPostList();
    }, []);

    // ページネーション実行の関数
    const pageSwitched = useCallback(
        async (page) => {
            setPage(page);
            const url = 'http://localhost:30080/api/v1/posts?page=' + page;
            await fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    setPostList(responseJson.data);
                })
                .catch((error) => console.error(error));
        },
        [pageSwitched]
    );

    console.log(postList);

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
                    />
                ))}
            </div>
            <Pagination count={totalPage} disabled={false} onChange={pageSwitched} page={page} />
        </section>
    );
};

export default PostList;
