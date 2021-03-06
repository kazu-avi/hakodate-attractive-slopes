import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import NoImage from '../../../../public/img/noimage.jpeg';

const useStyles = makeStyles({
    img: {
        width: 200,
        height: 200,
        margin: '0 auto',
    },
});

const MyPageAvater = (props) => {
    const classes = useStyles();
    return (
        <>
            {props.img ? (
                <Avatar className={classes.img} alt="ユーザー画像" src={props.img} />
            ) : (
                <Avatar className={classes.img} alt="noimage" src={NoImage} />
            )}
        </>
    );
};

export default MyPageAvater;
