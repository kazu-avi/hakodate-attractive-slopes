import React from 'react';
import { Dialog, DialogTitle, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const AboutDialog = (props) => {
    return (
        <Dialog open={props.open} onClose={() => props.toggleDialog(false)}>
            <DialogTitle>
                About
                <IconButton onClick={() => props.toggleDialog(false)}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
        </Dialog>
    );
};

export default AboutDialog;
