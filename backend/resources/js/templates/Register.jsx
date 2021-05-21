import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, PrimaryButton, OutlinedButton, Helmet } from '../components/UIKit';
import { push } from 'connected-react-router';
import { register, guestLogin } from '../reducks/users/operations';
import { ImageArea } from '../components/Posts';

const Register = () => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [confirmPassword, setConfirmPassword] = useState(''),
        [file, setFile] = useState(''),
        [encodedFile, setEncodedFile] = useState('');

    const inputUsername = useCallback(
        (event) => {
            setUsername(event.target.value);
        },
        [inputUsername]
    );

    const inputEmail = useCallback(
        (event) => {
            setEmail(event.target.value);
        },
        [inputEmail]
    );

    const inputPassword = useCallback(
        (event) => {
            setPassword(event.target.value);
        },
        [inputPassword]
    );

    const inputConfirmPassword = useCallback(
        (event) => {
            setConfirmPassword(event.target.value);
        },
        [inputConfirmPassword]
    );

    console.log(file);
    return (
        <div className={'small-section'}>
            <Helmet title={'新規登録フォーム | HAKODATE ATTRACTIVE SLOPES'} />
            <h2 className={'center'}>新規登録</h2>
            <div className="register-img-area">
                <ImageArea encodedFile={encodedFile} select={setEncodedFile} file={file} setFile={setFile} />
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
            <TextInput
                fullWidth={true}
                label={'メールアドレス（必須）'}
                multiline={false}
                required={true}
                rows={1}
                type={'email'}
                value={email}
                onChange={inputEmail}
            />
            <TextInput
                fullWidth={true}
                label={'パスワード（必須）'}
                multiline={false}
                required={true}
                rows={1}
                type={'password'}
                value={password}
                onChange={inputPassword}
            />
            <TextInput
                fullWidth={true}
                label={'確認用パスワード（必須）'}
                multiline={false}
                required={true}
                rows={1}
                type={'password'}
                value={confirmPassword}
                onChange={inputConfirmPassword}
            />
            <div className={'spacer-medium'}></div>
            <div className="center br-label">
                <OutlinedButton label={'キャンセル'} onClick={() => dispatch(push('/'))} />
                <span className={'margin-20'}></span>
                <PrimaryButton
                    label={'登録する'}
                    onClick={() => dispatch(register(username, email, password, confirmPassword, file))}
                />
                <div className={'spacer-medium'}></div>
                <PrimaryButton
                    label={'ゲストユーザーとしてログインする \n（メールアドレス・パスワード不要）'}
                    onClick={() => dispatch(guestLogin())}
                />
            </div>
        </div>
    );
};

export default Register;
