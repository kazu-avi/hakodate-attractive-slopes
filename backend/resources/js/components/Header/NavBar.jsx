import React, { useEffect } from 'react';
import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
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

const NavBar = () => {
    const classes = useStyles();

    useEffect(() => {
        const $bar = document.getElementById('nav-bar');
        window.addEventListener('scroll', () => {
            $bar.classList.toggle('header-scroll', window.scrollY < 330);
        });
    }, []);

    return (
        <div id="nav-bar" className="header-scroll">
            <AppBar className={classes.bar}>
                <Toolbar className={classes.tool}>
                    <img src={HeaderLogo} height="40px" />
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
