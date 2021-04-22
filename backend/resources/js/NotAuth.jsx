// NotAuthコンポーネントの子要素コンポーネントには、未認証ユーザーのみアクセスできるようにする

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSignedIn } from './reducks/users/selector';
import { push } from 'connected-react-router';

const NotAuth = ({ children }) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);

    useEffect(() => {
        if (isSignedIn) {
            dispatch(push('/'));
        }
    }, []);

    if (!isSignedIn) {
        return children;
    } else {
        return <></>;
    }
};

export default NotAuth;
