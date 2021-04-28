import React from 'react';
import { useSelector } from 'react-redux';
import { getIsSignedIn } from '../../reducks/users/selector';
import { HeaderNavAuth, HeaderNavNotAuth } from './index';

const HeaderNav = () => {
    const selector = useSelector((state) => state);
    const isSignedIn = getIsSignedIn(selector);
    return <>{isSignedIn ? <HeaderNavAuth /> : <HeaderNavNotAuth />}</>;
};

export default HeaderNav;
