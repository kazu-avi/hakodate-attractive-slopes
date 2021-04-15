import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { TextInput, PrimaryButton, OutlinedButton } from '../components/UIKit';
import { login } from '../reducks/users/operations';

const Login = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    console.log(selector);

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
        <div className="small-section">
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
                <OutlinedButton label={'キャンセル'} onClick={() => dispatch(push('/'))} />
                <span className={'margin-20'}></span>
                <PrimaryButton label={'ログインする'} onClick={() => dispatch(login(email, password))} />
            </div>
        </div>
    );
};

export default Login;
