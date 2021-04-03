import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const OutlinedButton = (props) => {
    return (
        <Button variant="outlined" onClick={() => props.onClick()}>
            {props.label}
        </Button>
    );
};

export default OutlinedButton;
