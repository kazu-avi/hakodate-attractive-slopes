import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        width: '95%',
        zIndex: 1,
    },
    media: {
        position: 'absolute',
        objectFit: 'cover',
        objectPosition: 'center',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        zIndex: 10,
        cursor: 'pointer',
    },
});

const CategoryCard = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    return (
        <Card className={classes.root}>
            <div className="image-thumb hover">
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    onClick={() => dispatch(push('/categories/' + props.id))}
                />
                <div className="hover-text-category" onClick={() => dispatch(push('/categories/' + props.id))}>
                    <p>詳しく知る</p>
                </div>
            </div>
            <CardContent>{props.name}</CardContent>
        </Card>
    );
};

export default CategoryCard;
