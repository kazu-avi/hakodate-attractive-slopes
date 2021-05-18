import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

const useStyles = makeStyles({
    icon: {
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 100,
    },
});

const ScrollToTop = () => {
    const selector = useSelector((state) => state);
    const pathname = selector.router.location.pathname;
    const search = selector.router.location.search;
    const classes = useStyles();

    const clickHandler = () => {
        try {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        } catch (error) {
            window.scrollTo(0, 0);
        }
    };

    useEffect(() => {
        clickHandler();
    }, [pathname, search]);

    return (
        <>
            <Fab color="primary" className={classes.icon} onClick={() => clickHandler()}>
                <ArrowUpwardIcon />
            </Fab>
        </>
    );
};

export default ScrollToTop;
