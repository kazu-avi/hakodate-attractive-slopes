import React from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone';

const useStyles = makeStyles({
    icon: {
        width: 48,
        height: 48,
    },
});

const ImageArea = (props) => {
    const classes = useStyles();

    return (
        <div className="text-right">
            <span>画像を登録する</span>
            <IconButton className={classes.icon}>
                <label>
                    <AddAPhotoTwoToneIcon />
                    <input
                        className="display-none"
                        type="file"
                        onChange={(event) => props.select(event.target.files)}
                    />
                </label>
            </IconButton>
        </div>
    );
};

export default ImageArea;
