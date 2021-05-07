import React from 'react';
import { HeaderNavAuth, HeaderNavNotAuth } from './index';

const HeaderNav = (props) => {
    return <>{props.isSignedIn ? <HeaderNavAuth /> : <HeaderNavNotAuth />}</>;
};

export default HeaderNav;
