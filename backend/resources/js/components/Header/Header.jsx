import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIsSignedIn, getUsername } from '../../reducks/users/selector';
import { checkAuthAtHome } from '../../reducks/users/operations';
import { HeaderLogo, HeaderLogin, HeaderNav, NavBar, AboutDialog } from './index';

const Header = () => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const username = getUsername(selector);
    const isSignedIn = getIsSignedIn(selector);

    useEffect(() => {
        if (!isSignedIn) {
            dispatch(checkAuthAtHome());
        }
    }, []);

    const toggleDialog = useCallback(
        (open) => {
            setOpen(open);
        },
        [toggleDialog]
    );

    return (
        <>
            <div className="large-section">
                <HeaderLogin isSignedIn={isSignedIn} username={username} />
                <HeaderLogo />
                <HeaderNav isSignedIn={isSignedIn} toggleDialog={toggleDialog} />
            </div>
            <NavBar isSignedIn={isSignedIn} username={username} toggleDialog={toggleDialog} />
            <AboutDialog open={open} toggleDialog={toggleDialog} />
        </>
    );
};

export default Header;
