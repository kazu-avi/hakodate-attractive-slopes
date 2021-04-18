import React, { useCallback, useState, useEffect } from 'react';
import { TextInput, SelectBox, InputTags } from '../components/UIKit';
import { ImageArea } from '../components/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { OutlinedButton, PrimaryButton } from '../components/UIKit';
import postRegister from '../components/Posts/postRegister';
import { getUserId } from '../reducks/users/selector';
import { getAllCategories } from '../reducks/categories/operations';
import { getCategoriesList } from '../reducks/categories/selectors';

const PostEdit = () => {
    const [file, setFile] = useState(''),
        [encodedFile, setEncodedFile] = useState(''),
        [category, setCategory] = useState(''),
        [text, setText] = useState(''),
        [tags, setTags] = useState([]);

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const categoriesList = getCategoriesList(selector);
    console.log(selector);
    console.log(categoriesList);

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

    console.log(tags);

    // mount時にDB(API)よりカテゴリー一覧を取得しセット
    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

    return (
        <div className="small-section">
            <h2 className="center">投稿作成フォーム</h2>
            <ImageArea encodedFile={encodedFile} select={setEncodedFile} file={file} setFile={setFile} />
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
            <InputTags tags={tags} editable={true} onChange={inputTags} placeholder={'タグを入力してね！'} />
            <div className="spacer-medium"></div>
            <div className="center">
                <OutlinedButton label={'キャンセル'} onClick={() => dispatch(push('/'))} />
                <span className="margin-20"></span>
                <PrimaryButton
                    label={'投稿する'}
                    onClick={() => dispatch(postRegister(uid, category, file, text, tags))}
                />
            </div>
        </div>
    );
};

export default PostEdit;
