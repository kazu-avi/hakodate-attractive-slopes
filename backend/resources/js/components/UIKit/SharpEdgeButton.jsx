import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    button: {
        borderRadius: 0,
    },
});

const SharpEdgeButton = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Button className={classes.button} variant="outlined" onClick={() => props.onClick()}>
                {props.label}
            </Button>
        </div>
    );
};

export default SharpEdgeButton;
