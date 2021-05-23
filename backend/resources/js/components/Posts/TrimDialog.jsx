import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { PrimaryButton, OutlinedButton } from '../UIKit';
import { Dialog, DialogContent } from '@material-ui/core';

const TrimDialog = (props) => {
    const [crop, setCrop] = useState({
        aspect: 1 / 1,
        unit: 'px',
        x: 0,
        y: 0,
        width: 200,
        height: 200,
    });
    const [imageRef, setImageRef] = useState('');
    console.log(imageRef);

    const onImageLoaded = (image) => {
        setImageRef(image);
    };

    const trimming = async (image, crop) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');

        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
        );

        const newFile = canvas.toDataURL();
        props.setCroppedEncodedFile(newFile);

        canvas.toBlob((blob) => {
            const imageFile = new File([blob], 'image.jpg');
            props.setCroppedFile(imageFile);
        });
    };

    return (
        <Dialog open={props.open} onClose={() => props.toggleDialog(false)} scroll={'body'}>
            <DialogContent className="center">
                <OutlinedButton
                    label={'キャンセル'}
                    onClick={() => {
                        props.toggleDialog(false);
                        props.setCroppedFile('');
                        props.setCroppedEncodedFile('');
                    }}
                />
                <span className="margin-20"></span>
                <PrimaryButton label={'決定'} onClick={() => props.toggleDialog(false)} />
                <p>投稿する画像の範囲を選択してください。</p>
                <p>（正方形にトリミングされます）</p>
                <ReactCrop
                    src={props.encodedFile}
                    crop={crop}
                    onChange={(newCrop) => setCrop(newCrop)}
                    onImageLoaded={(image) => onImageLoaded(image)}
                    onComplete={() => trimming(imageRef, crop)}
                />
            </DialogContent>
        </Dialog>
    );
};

export default TrimDialog;
