// コンポーネント内での変更（イベントの発生）後、operationで処理を行い
// Actionsにデータを渡す

import { push } from 'connected-react-router';
import { loginAction, logoutAction } from './actions';

// 認証のチェック(Authコンポーネント)
export const checkAuth = () => {
    return async (dispatch) => {
        const url = 'http://localhost:30080/api/v1/refresh';
        const token = localStorage.getItem('access_token');

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        };

        if (!token) {
            alert('ログインが必要です。');
            dispatch(push('/login'));
        } else {
            await fetch(url, option)
                .then((response) => {
                    if (!response.ok) {
                        alert('ログインが必要です。');
                        dispatch(push('/login'));
                    } else {
                        return response.json().then((responseJson) => {
                            const resToken = responseJson['access_token'];
                            localStorage.setItem('access_token', resToken);
                            console.log(responseJson);

                            dispatch(
                                loginAction({
                                    isSignedIn: 'true',
                                    uid: responseJson['uid'],
                                    username: responseJson['username'],
                                })
                            );
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    return null;
                });
        }
    };
};

// 認証のチェック(Home)
export const checkAuthAtHome = () => {
    return async (dispatch) => {
        const url = 'http://localhost:30080/api/v1/refresh';
        const token = localStorage.getItem('access_token');

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        };

        if (!token) {
            dispatch(push('/'));
        } else {
            await fetch(url, option)
                .then((response) => {
                    if (!response.ok) {
                        dispatch(push('/'));
                    } else {
                        return response.json().then((responseJson) => {
                            const resToken = responseJson['access_token'];
                            localStorage.setItem('access_token', resToken);
                            console.log(responseJson);

                            dispatch(
                                loginAction({
                                    isSignedIn: 'true',
                                    uid: responseJson['uid'],
                                    username: responseJson['username'],
                                })
                            );
                        });
                    }
                })
                .catch((error) => {
                    console.error(error);
                    return null;
                });
        }
    };
};

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
                dispatch(push('/login'));
            })
            .catch((error) => {
                console.error(error);
                return null;
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
                return null;
            });
    };
};

export const logout = () => {
    return async (dispatch) => {
        const url = 'http://localhost:30080/api/v1/logout';
        const token = localStorage.getItem('access_token');

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        };

        await fetch(url, option).then(() => {
            localStorage.removeItem('access_token');
            dispatch(logoutAction());
            alert('ログアウトしました');
            dispatch(push('/'));
        });
    };
};
