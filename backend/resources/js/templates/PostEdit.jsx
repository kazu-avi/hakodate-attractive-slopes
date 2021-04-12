import React, { useCallback, useState } from 'react';
import { TextInput, SelectBox } from '../components/UIKit';
import { ImageArea } from '../components/Posts';

const PostEdit = () => {
    const [file, setFile] = useState(''),
        [category, setCategory] = useState(''),
        [text, setText] = useState('');

    const inputText = useCallback(
        (event) => {
            setText(event.target.value);
        },
        [inputText]
    );

    const categories = [
        { id: 1, name: '八幡坂' },
        { id: 2, name: '弥生坂' },
    ];

    console.log(file);

    return (
        <div className="small-container">
            <h2 className="center">投稿作成フォーム</h2>
            <ImageArea file={file} select={setFile} />
            <SelectBox
                label={'坂道名を選んでね！（必須）'}
                required={true}
                value={category}
                select={setCategory}
                options={categories}
            />
            <TextInput
                fullWidth={true}
                label={'写真の説明を入力してね！(必須)'}
                multiline={true}
                required={true}
                rows={5}
                type={'text'}
                value={text}
                onChange={inputText}
            />
        </div>
    );
};

export default PostEdit;
