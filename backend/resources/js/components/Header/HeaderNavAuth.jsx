import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const HeaderNavAuth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <Button onClick={() => dispatch(push('/'))}>Top</Button>
            <Button onClick={() => dispatch(push('/about'))}>About</Button>
            <Button onClick={() => dispatch(push('/edit'))}>投稿する</Button>
            <Button onClick={() => dispatch(logout())}>ログアウト</Button>
        </div>
    );
};

export default HeaderNavAuth;
