import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { HeaderDrawer } from './NavBar/index';
import HeaderLogo from '../../../../public/img/header-logo.png';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
    bar: {
        width: '100%',
        color: '#000',
        backgroundColor: '#f2f4fb',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
    },
    tool: {
        maxWidth: '1080px',
        width: '100%',
        margin: '0 auto',
        justifyContent: 'space-between',
    },
    menuButton: {
        marginRight: 20,
    },
});

const NavBar = (props) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        const $bar = document.getElementById('nav-bar');
        window.addEventListener('scroll', () => {
            $bar.classList.toggle('header-scroll', window.scrollY < 330);
        });
    }, []);

    const toggleDrawer = useCallback(
        (open) => {
            setDrawerOpen(open);
        },
        [toggleDrawer]
    );

    return (
        <div id="nav-bar" className="header-scroll">
            <AppBar className={classes.bar}>
                <Toolbar className={classes.tool}>
                    <img src={HeaderLogo} height="40px" onClick={() => dispatch(push('/'))} />
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={() => toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <HeaderDrawer
                    open={drawerOpen}
                    onClose={toggleDrawer}
                    isSignedIn={props.isSignedIn}
                    username={props.username}
                    toggleDialog={props.toggleDialog}
                />
            </AppBar>
        </div>
    );
};

export default NavBar;
