import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { TextInput, SelectBox, InputTags } from '../components/UIKit';
import { ImageArea } from '../components/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { OutlinedButton, PrimaryButton } from '../components/UIKit';
import { postEdit } from '../components/Posts/postRegister';
import { getUserId } from '../reducks/users/selector';
import { getCategoriesList } from '../reducks/categories/selectors';

const PostEdit = () => {
    const [file, setFile] = useState(''),
        [encodedFile, setEncodedFile] = useState(''),
        [category, setCategory] = useState(''),
        [text, setText] = useState(''),
        [tags, setTags] = useState([]),
        [postedUser, setPostedUser] = useState('');

    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const categoriesList = getCategoriesList(selector);
    const param = useParams();
    const postId = param.id;

    const getInitialState = useCallback(
        async (id) => {
            const url = 'https://localhost:443/api/v1/posts/' + id;
            await fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    setPostedUser(responseJson.user_id);
                    setEncodedFile(responseJson.file_path);
                    setCategory(responseJson.category_id);
                    setText(responseJson.text);
                    const initialTags = responseJson.tags.map((tag) => tag.name);
                    setTags(initialTags);
                })
                .catch((error) => console.error(error));
        },
        [getInitialState]
    );

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
        getInitialState(postId);
        return () => {
            getInitialState(postId);
        };
    }, []);

    return (
        <div className="small-section">
            <h2 className="center">投稿編集フォーム</h2>
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
                <OutlinedButton label={'キャンセル'} onClick={() => dispatch(push('/posts/' + postId))} />
                <span className="margin-20"></span>
                <PrimaryButton
                    label={'編集する'}
                    onClick={() => dispatch(postEdit(uid, postId, postedUser, category, file, text, tags))}
                />
            </div>
        </div>
    );
};

export default PostEdit;
