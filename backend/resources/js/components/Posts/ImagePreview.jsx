import React from 'react';

const ImagePreview = (props) => {
    return (
        <div className="image-thumb">
            <img src={props.previewFile} alt="プレビュー画像" />
        </div>
    );
};

export default ImagePreview;
