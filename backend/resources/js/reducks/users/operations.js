// コンポーネント内での変更（イベントの発生）後、operationで処理を行い
// Actionsにデータを渡す

import { push } from 'connected-react-router';
import { loginAction } from './actions';

export const register = (username, email, password, confirmPassword) => {
    return async (dispatch) => {
        //バリデーション
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            alert('必須項目が未入力です。再度入力してください。');
            return false;
        }

        if (password !== confirmPassword) {
            alert('確認用パスワードが一致しません。再度入力してください。');
            return false;
        }

        const url = 'http://localhost:30080/api/v1/users';
        const data = {
            name: username,
            email: email,
            password: password,
        };

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        await fetch(url, option)
            .then((response) => {
                if (!response.ok) {
                    console.log('登録に失敗しました');
                }
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(push('/'));
            });
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        //バリデーション
        if (email === '' || password === '') {
            alert('必須項目が未入力です。再度入力してください。');
            return false;
        }

        const url = 'http://localhost:30080/api/v1/login';

        const data = {
            email: email,
            password: password,
        };

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        await fetch(url, option)
            .then((response) => {
                if (!response.ok) {
                    console.log('認証に失敗しました');
                    alert('ログインに失敗しました。新規登録するか、再度入力してお試しください。');
                } else {
                    return response.json().then((responseJson) => {
                        // 発行されたトークンをローカルストレージに保存
                        const token = responseJson['access_token'];
                        localStorage.setItem('access_token', token);
                        console.log(responseJson);

                        dispatch(
                            loginAction({
                                isSignedIn: 'true',
                                uid: responseJson['uid'],
                                username: responseJson['username'],
                            })
                        );

                        dispatch(push('/'));
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
};
