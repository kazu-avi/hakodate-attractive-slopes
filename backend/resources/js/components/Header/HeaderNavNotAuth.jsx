import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const HeaderNavNotAuth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <div className={classes.root}>
            <Button onClick={() => dispatch(push('/'))}>Top</Button>
            <Button onClick={() => dispatch(push('/about'))}>About</Button>
            <Button onClick={() => dispatch(push('/register'))}>新規登録</Button>
            <Button onClick={() => dispatch(push('/login'))}>ログイン</Button>
        </div>
    );
};

export default HeaderNavNotAuth;
