import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId, getUsername } from '../reducks/users/selector';
import { OutlinedButton } from '../components/UIKit';
import { push } from 'connected-react-router';

const MyPage = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    console.log(selector);
    const uid = getUserId(selector);
    const username = getUsername(selector);

    return (
        <>
            <h2>マイページ</h2>
            <p>こんにちは{username}さん</p>
            <p>ユーザーID:{uid}</p>
            <OutlinedButton label={'ログイン'} onClick={() => dispatch(push('/login'))} />
            <OutlinedButton label={'新規登録'} onClick={() => dispatch(push('/register'))} />
        </>
    );
};

export default MyPage;
