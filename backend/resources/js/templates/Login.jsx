import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { TextInput, PrimaryButton, OutlinedButton, Helmet } from '../components/UIKit';
import { login, guestLogin } from '../reducks/users/operations';

const Login = () => {
    const dispatch = useDispatch();

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
            <Helmet title={'ログインフォーム | HAKODATE ATTRACTIVE SLOPES'} />
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
            <div className="center br-label">
                <OutlinedButton label={'キャンセル'} onClick={() => dispatch(push('/'))} />
                <span className={'margin-20'}></span>
                <PrimaryButton label={'ログインする'} onClick={() => dispatch(login(email, password))} />
                <div className={'spacer-medium'}></div>
                <PrimaryButton
                    label={'ゲストユーザーとしてログインする \n（メールアドレス・パスワード不要）'}
                    onClick={() => dispatch(guestLogin())}
                />
            </div>
        </div>
    );
};

export default Login;
