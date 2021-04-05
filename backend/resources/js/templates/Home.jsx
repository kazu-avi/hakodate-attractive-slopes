import React from 'react';
import { useSelector } from 'react-redux';
import { getUserId, getUsername } from '../reducks/users/selector';

const Home = () => {
    const selector = useSelector((state) => state);
    console.log(selector);
    const uid = getUserId(selector);
    const username = getUsername(selector);

    return (
        <>
            <p>こんにちは{username}さん</p>
            <p>ユーザーID:{uid}</p>
        </>
    );
};

export default Home;
