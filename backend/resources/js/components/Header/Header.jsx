import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSignedIn, getUsername } from '../../reducks/users/selector';
import { checkAuthAtHome } from '../../reducks/users/operations';
import { HeaderLogo, HeaderLogin, HeaderNav, NavBar } from './index';

const Header = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
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
            <div className="large-section">
                <HeaderLogin isSignedIn={isSignedIn} username={username} />
                <HeaderLogo />
                <HeaderNav isSignedIn={isSignedIn} />
            </div>
            <NavBar isSignedIn={isSignedIn} username={username} />
        </>
    );
};

export default Header;
