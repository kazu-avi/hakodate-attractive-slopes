import React, { useCallback, useState } from 'react';
import { TextInput, PrimaryButton, OutlinedButton } from '../components/UIKit';

const Login = () => {
    const [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

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

    return (
        <div className={'small-container'}>
            <h2 className={'center'}>ログイン</h2>
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
            <div className={'spacer-medium'}></div>
            <div className="center">
                <OutlinedButton label={'キャンセル'} onClick={console.log('clicked!')} />
                <span className={'margin-20'}></span>
                <PrimaryButton label={'ログインする'} onClick={console.log('clicked!')} />
            </div>
        </div>
    );
};

export default Login;