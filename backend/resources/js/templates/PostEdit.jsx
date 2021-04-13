import React, { useCallback, useState } from 'react';
import { TextInput, SelectBox } from '../components/UIKit';
import { ImageArea } from '../components/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { OutlinedButton, PrimaryButton } from '../components/UIKit';
import postRegister from '../components/Posts/postRegister';
import { getUserId } from '../reducks/users/selector';

const PostEdit = () => {
    const [file, setFile] = useState(''),
        [encodedFile, setEncodedFile] = useState(''),
        [category, setCategory] = useState(''),
        [text, setText] = useState('');

    console.log(encodedFile);

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);

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

    return (
        <div className="small-container">
            <h2 className="center">投稿作成フォーム</h2>
            <ImageArea encodedFile={encodedFile} select={setEncodedFile} file={file} setFile={setFile} />
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
            <div className="spacer-medium"></div>
            <div className="center">
                <OutlinedButton label={'キャンセル'} onClick={() => dispatch(push('/'))} />
                <span className="margin-20"></span>
                <PrimaryButton label={'投稿する'} onClick={() => dispatch(postRegister(uid, file, text))} />
            </div>
        </div>
    );
};

export default PostEdit;
