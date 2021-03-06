import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, PrimaryButton, OutlinedButton, Helmet } from '../components/UIKit';
import { push } from 'connected-react-router';
import { update } from '../reducks/users/operations';
import { ImageArea } from '../components/Posts';
import { getUserId } from '../reducks/users/selector';

const UserEdit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);

    const [username, setUsername] = useState(''),
        [file, setFile] = useState(''),
        [encodedFile, setEncodedFile] = useState(''),
        [croppedFile, setCroppedFile] = useState(''),
        [croppedEncodedFile, setCroppedEncodedFile] = useState(''),
        [previewFile, setPreviewFile] = useState('');

    const getInitialState = useCallback(
        async (id) => {
            const url = 'https://hakodate-slopes.com/api/v1/users/' + id;
            await fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    setUsername(responseJson.name);
                    setPreviewFile(responseJson.img);
                })
                .catch((error) => console.error(error));
        },
        [getInitialState]
    );

    useEffect(() => {
        getInitialState(uid);
    }, []);

    const inputUsername = useCallback(
        (event) => {
            setUsername(event.target.value);
        },
        [inputUsername]
    );

    return (
        <div className={'small-section'}>
            <Helmet title={'ユーザー情報編集フォーム | HAKODATE ATTRACTIVE SLOPES'} />
            <h2 className={'center'}>ユーザー情報編集</h2>
            <div className="register-img-area">
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
            </div>
            <TextInput
                fullWidth={true}
                label={'ユーザー名（必須）'}
                multiline={false}
                required={true}
                rows={1}
                type={'text'}
                value={username}
                onChange={inputUsername}
            />
            <div className={'spacer-medium'}></div>
            <div className="center">
                <OutlinedButton label={'キャンセル'} onClick={() => dispatch(push('/mypage'))} />
                <span className={'margin-20'}></span>
                <PrimaryButton label={'登録する'} onClick={() => dispatch(update(username, file, uid))} />
            </div>
        </div>
    );
};

export default UserEdit;
