import React from 'react';
import { AuthList, NotAuthList } from './index';
import logo from '../../../../../public/img/logo.png';
import { makeStyles } from '@material-ui/styles';
import { Drawer, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
    drawer: {
        width: 256,
    },
    icon: {
        width: 48,
        height: 48,
        margin: '8px 5px 0 auto',
    },
    logo: {
        margin: '0 auto',
    },
});

const HeaderDrawer = (props) => {
    const classes = useStyles();

    return (
        <nav className={classes.drawer}>
            <Drawer anchor={'right'} open={props.open} onClose={() => props.onClose(false)}>
                <IconButton className={classes.icon} onClick={() => props.onClose(false)}>
                    <CloseIcon />
                </IconButton>
                <div className={classes.drawer} onClick={() => props.onClose(false)}>
                    {props.isSignedIn ? (
                        <AuthList toggleDialog={props.toggleDialog} />
                    ) : (
                        <NotAuthList toggleDialog={props.toggleDialog} />
                    )}
                </div>
                <img className={classes.logo} alt="logo" src={logo} width="150px" />
            </Drawer>
        </nav>
    );
};

export default HeaderDrawer;
