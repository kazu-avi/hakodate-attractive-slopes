import React, { useCallback, useState } from 'react';
import { TextInput, SelectBox, InputTags } from '../components/UIKit';
import { ImageArea } from '../components/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { OutlinedButton, PrimaryButton, Helmet } from '../components/UIKit';
import { postRegister } from '../components/Posts/postRegister';
import { getUserId } from '../reducks/users/selector';
import { getCategoriesList } from '../reducks/categories/selectors';

const PostCreate = () => {
    const [file, setFile] = useState(''),
        [encodedFile, setEncodedFile] = useState(''),
        [croppedFile, setCroppedFile] = useState(''),
        [croppedEncodedFile, setCroppedEncodedFile] = useState(''),
        [previewFile, setPreviewFile] = useState(''),
        [category, setCategory] = useState(''),
        [text, setText] = useState(''),
        [tags, setTags] = useState([]);

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const categoriesList = getCategoriesList(selector);

    const inputText = useCallback(
        (event) => {
            setText(event.target.value);
        },
        [inputText]
    );

    const inputTags = useCallback(
        (newTags) => {
            setTags(newTags);
        },
        [inputTags]
    );

    return (
        <div className="small-section">
            <Helmet title={'投稿作成フォーム | HAKODATE ATTRACTIVE SLOPES'} />
            <h2 className="center">投稿作成フォーム</h2>
            <ImageArea
                encodedFile={encodedFile}
                select={setEncodedFile}
                file={file}
                setFile={setFile}
                croppedFile={croppedFile}
                setCroppedFile={setCroppedFile}
                croppedEncodedFile={croppedEncodedFile}
                setCroppedEncodedFile={setCroppedEncodedFile}
                previewFile={previewFile}
                setPreviewFile={setPreviewFile}
            />
            <div className="spacer-small"></div>
            <SelectBox
                label={'坂道名を選んでね！（必須）'}
                required={true}
                value={category}
                select={setCategory}
                options={categoriesList}
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
            <InputTags
                tags={tags}
                editable={true}
                onChange={inputTags}
                placeholder={'タグを入力してね！（入力後、Enterで確定）'}
            />
            <div className="spacer-medium"></div>
            <div className="center">
                <OutlinedButton label={'キャンセル'} onClick={() => dispatch(push('/'))} />
                <span className="margin-20"></span>
                <PrimaryButton
                    label={'投稿する'}
                    onClick={() => dispatch(postRegister(uid, category, croppedFile, text, tags))}
                />
            </div>
        </div>
    );
};

export default PostCreate;
