import React, { useEffect, useState } from 'react';
import { PostCard } from '../components/Posts';

const PostList = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const getPostList = async () => {
            const url = 'http://localhost:30080/api/v1/posts/';
            await fetch(url)
                .then((response) => response.json())
                .then((responseJson) => setPostList(responseJson))
                .catch((error) => console.error(error));
        };
        getPostList();
    }, []);

    console.log(postList);

    return (
        <section className="large-section">
            <div className="grid-row">
                {postList.map((post) => (
                    <PostCard
                        key={post.id}
                        image={post.file_path}
                        text={post.text}
                        category={post.category}
                        name={post.user_name}
                        date={post.updated_at}
                    />
                ))}
            </div>
        </section>
    );
};

export default PostList;
