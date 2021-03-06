import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { TextInput, SelectBox, InputTags, Helmet } from '../components/UIKit';
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
        [croppedFile, setCroppedFile] = useState(''),
        [croppedEncodedFile, setCroppedEncodedFile] = useState(''),
        [previewFile, setPreviewFile] = useState(''),
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
            const url = 'https://hakodate-slopes.com/api/v1/posts/' + id;
            await fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    setPostedUser(responseJson.user_id);
                    setPreviewFile(responseJson.file_path);
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

    // mount??????DB(API)????????????????????????????????????????????????
    useEffect(() => {
        getInitialState(postId);
        return () => {
            getInitialState(postId);
        };
    }, []);

    return (
        <div className="small-section">
            <Helmet title={'???????????????????????? | HAKODATE ATTRACTIVE SLOPES'} />
            <h2 className="center">????????????????????????</h2>
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
                label={'???????????????????????????????????????'}
                required={true}
                value={category}
                select={setCategory}
                options={categoriesList}
            />
            <TextInput
                fullWidth={true}
                label={'????????????????????????????????????(??????)'}
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
                placeholder={'??????????????????????????????????????????Enter????????????'}
            />
            <div className="spacer-medium"></div>
            <div className="center">
                <OutlinedButton label={'???????????????'} onClick={() => dispatch(push('/posts/' + postId))} />
                <span className="margin-20"></span>
                <PrimaryButton
                    label={'????????????'}
                    onClick={() => dispatch(postEdit(uid, postId, postedUser, category, croppedFile, text, tags))}
                />
            </div>
        </div>
    );
};

export default PostEdit;
