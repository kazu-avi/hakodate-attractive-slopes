import React, { useCallback, useState } from 'react';
import { TextInput, PrimaryButton, OutlinedButton } from '../components/UIKit';

const Register = () => {
    const [username, setUsername] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [confirmPassword, setconfirmPassword] = useState('');

    console.log(username);

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
            setconfirmPassword(event.target.value);
        },
        [inputConfirmPassword]
    );
    return (
        <div className={'small-container'}>
            <h2 className={'center'}>新規登録</h2>
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
            <div className="center">
                <OutlinedButton label={'キャンセル'} onClick={console.log('clicked!')} />
                <span className={'margin-20'}></span>
                <PrimaryButton label={'登録する'} onClick={console.log('clicked!')} />
            </div>
        </div>
    );
};

export default Register;
