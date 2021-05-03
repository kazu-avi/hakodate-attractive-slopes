import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSignedIn, getUsername } from '../../reducks/users/selector';
import { checkAuthAtHome } from '../../reducks/users/operations';

const HeaderLogin = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    console.log(selector);
    // const uid = getUserId(selector);
    const username = getUsername(selector);
    const isSignedIn = getIsSignedIn(selector);

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(checkAuthAtHome());
            console.log('headereffect');
        }
    }, []);

    return (
        <>
            {isSignedIn ? (
                <div className="text-right">
                    <p>
                        こんにちは！{username}さん
                        <span>/ログアウト</span>
                    </p>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default HeaderLogin;
