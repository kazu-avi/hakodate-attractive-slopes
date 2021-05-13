import React from 'react';
import { HeaderNavAuth, HeaderNavNotAuth } from './index';

const HeaderNav = (props) => {
    return (
        <>
            {props.isSignedIn ? (
                <HeaderNavAuth toggleDialog={props.toggleDialog} />
            ) : (
                <HeaderNavNotAuth toggleDialog={props.toggleDialog} />
            )}
        </>
    );
};

export default HeaderNav;
