import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Breadcrumbs, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        textAlign: 'left',
        fontSize: '0.875rem',
    },
    link: {
        cursor: 'pointer',
    },
});

const Breadcrumb = (props) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    return (
        <div>
            <Breadcrumbs className={classes.root} separator=">">
                <Link className={classes.link} onClick={() => dispatch(push('/'))}>
                    トップページ
                </Link>
                <p>{props.text}</p>
            </Breadcrumbs>
        </div>
    );
};

export default Breadcrumb;
