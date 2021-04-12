import React, { useCallback, useState } from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone';
import ImagePreview from './ImagePreview';
import noimage from '../../../../public/img/noimage.jpeg';

const useStyles = makeStyles({
    icon: {
        width: 48,
        height: 48,
    },
});

const ImageArea = (props) => {
    const [previewFile, setPreviewFile] = useState('');
    const classes = useStyles();

    // 投稿画像のプレビュー表示
    const inputPreviewFile = useCallback(() => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            setPreviewFile(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        } else {
            // 画像の選択が解除された場合、stateを空にする
            setPreviewFile('');
        }
    }, [inputPreviewFile]);

    return (
        <>
            <div className="text-right">
                <span>画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddAPhotoTwoToneIcon />
                        <input
                            accept="image/*"
                            className="display-none"
                            type="file"
                            onChange={(event) => {
                                props.select(event.target.files);
                                inputPreviewFile();
                            }}
                        />
                    </label>
                </IconButton>
            </div>
            {previewFile ? (
                <ImagePreview previewFile={previewFile} />
            ) : (
                <img className="w100" alt="noimage" src={noimage} />
            )}
        </>
    );
};

export default ImageArea;
