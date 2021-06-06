import React, { useCallback, useState } from 'react';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddAPhotoTwoToneIcon from '@material-ui/icons/AddAPhotoTwoTone';
import ImagePreview from './ImagePreview';
import TrimDialog from './TrimDialog';
import noimage from '../../../../public/img/noimage.jpeg';

const useStyles = makeStyles({
    icon: {
        width: 48,
        height: 48,
    },
});

const ImageArea = (props) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    // 選択されたファイルをトリミング用のライブラリに渡すためにbase64形式に変換する。
    const inputEncodedFile = useCallback(() => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            props.select(reader.result);
        };

        if (file) {
            props.setFile(file);
            reader.readAsDataURL(file);
        } else {
            // 画像の選択が解除された場合、stateを空にする
            props.select('');
            props.setFile('');
        }
    }, [inputEncodedFile]);

    const toggleDialog = useCallback(
        (open) => {
            setOpen(open);
        },
        [toggleDialog]
    );

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
                                inputEncodedFile(event);
                                toggleDialog(true);
                            }}
                        />
                    </label>
                </IconButton>
            </div>
            {props.previewFile ? (
                <ImagePreview encodedFile={props.previewFile} />
            ) : (
                <img className="w100" alt="noimage" src={noimage} />
            )}
            <TrimDialog
                open={open}
                toggleDialog={toggleDialog}
                encodedFile={props.encodedFile}
                croppedFile={props.croppedFile}
                setCroppedFile={props.setCroppedFile}
                croppedEncodedFile={props.croppedEncodedFile}
                setCroppedEncodedFile={props.setCroppedEncodedFile}
                setPreviewFile={props.setPreviewFile}
            />
        </>
    );
};

export default ImageArea;
