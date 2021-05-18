// コンポーネント内での変更（イベントの発生）後、operationで処理を行い
// Actionsにデータを渡す

import { push } from 'connected-react-router';
import { loginAction, logoutAction } from './actions';
import { hideAlertAction, showAlertAction, showMessageAction } from '../alert/actions';
import { showLoadingAction, hideLoadingAction } from '../loading/actions';

// 認証のチェック(Authコンポーネント)
export const checkAuth = () => {
    return async (dispatch) => {
        const url = 'https://hakodate-slopes.com/api/v1/refresh/';
        const token = localStorage.getItem('access_token');

        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        };

        if (!token) {
            dispatch(showAlertAction('ログインが必要です'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 2000);
            dispatch(push('/login'));
        } else {
            await fetch(url, option)
                .then((response) => {
                    if (!response.ok) {
                        dispatch(showAlertAction('ログインが必要です'));
                        setTimeout(() => {
                            dispatch(hideAlertAction());
                        }, 2000);
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
                                    img: responseJson['img'],
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
        const url = 'https://hakodate-slopes.com/api/v1/refresh/';
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
                                    img: responseJson['img'],
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

export const register = (username, email, password, confirmPassword, file) => {
    return async (dispatch) => {
        //バリデーション
        if (username === '' || email === '' || password === '' || confirmPassword === '') {
            dispatch(showAlertAction('必須項目が未入力です。再度入力してください。'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 2000);
            return false;
        }

        if (password !== confirmPassword) {
            dispatch(showAlertAction('確認用パスワードが一致しません。再度入力してください。'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 2000);
            alert('確認用パスワードが一致しません。再度入力してください。');
            return false;
        }

        const url = 'https://hakodate-slopes.com/api/v1/users/';

        const data = new FormData();
        if (file) {
            data.append('img', file);
        }
        data.append('name', username);
        data.append('email', email);
        data.append('password', password);

        const option = {
            method: 'POST',
            body: data,
        };

        console.log(data);
        console.log(option);

        await fetch(url, option)
            .then((response) => {
                dispatch(showLoadingAction('登録しています・・・'));
                if (!response.ok) {
                    console.log('登録に失敗しました');
                    dispatch(showAlertAction('登録に失敗しました'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                }
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(hideLoadingAction());
                dispatch(push('/login'));
                dispatch(showMessageAction('ユーザー登録が完了しました。ログインしてください。'));
                setTimeout(() => {
                    dispatch(hideAlertAction());
                }, 4000);
            })
            .catch((error) => {
                dispatch(hideLoadingAction());
                console.error(error);
                return null;
            });
    };
};

export const update = (username, file, id) => {
    return async (dispatch) => {
        //バリデーション
        if (username === '') {
            dispatch(showAlertAction('必須項目が未入力です。再度入力してください。'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 2000);
            return false;
        }

        const url = 'https://hakodate-slopes.com/api/v1/users/' + id + '/';
        const token = localStorage.getItem('access_token');

        const data = new FormData();
        if (file) {
            data.append('img', file);
        }
        data.append('name', username);
        data.append('_method', 'put');

        const option = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: data,
        };

        console.log(data);
        console.log(option);
        console.log(...data.entries());

        await fetch(url, option)
            .then((response) => {
                dispatch(showLoadingAction('登録しています・・・'));
                if (!response.ok) {
                    dispatch(showAlertAction('登録に失敗しました'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                }
                return response.json();
            })
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(
                    loginAction({
                        isSignedIn: 'true',
                        uid: responseJson['id'],
                        username: responseJson['name'],
                        img: responseJson['img'],
                    })
                );
                dispatch(hideLoadingAction());
                dispatch(push('/mypage'));
                dispatch(showMessageAction('ユーザー情報を編集しました！'));
                setTimeout(() => {
                    dispatch(hideAlertAction());
                }, 4000);
            })
            .catch((error) => {
                dispatch(hideLoadingAction());
                console.error(error);
                console.log('登録に失敗しました');
                dispatch(showAlertAction('登録に失敗しました'));
                setTimeout(() => {
                    dispatch(hideAlertAction());
                }, 2000);
                return null;
            });
    };
};

export const login = (email, password) => {
    return async (dispatch) => {
        //バリデーション
        if (email === '' || password === '') {
            dispatch(showAlertAction('必須項目が未入力です。再度入力してください。'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 2000);
            return false;
        }

        const url = 'https://hakodate-slopes.com/api/v1/login/';

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
                dispatch(showLoadingAction('ログインしています・・・'));
                if (!response.ok) {
                    dispatch(hideLoadingAction());
                    console.log('認証に失敗しました');
                    dispatch(showAlertAction('ログインに失敗しました。新規登録するか、再度入力してお試しください。'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                } else {
                    return response.json().then((responseJson) => {
                        // 発行されたトークンをローカルストレージに保存
                        const token = responseJson['access_token'];
                        localStorage.setItem('access_token', token);

                        dispatch(
                            loginAction({
                                isSignedIn: 'true',
                                uid: responseJson['uid'],
                                username: responseJson['username'],
                                img: responseJson['img'],
                            })
                        );

                        dispatch(hideLoadingAction());
                        dispatch(push('/'));
                        dispatch(showMessageAction('ログインしました！'));
                        setTimeout(() => {
                            dispatch(hideAlertAction());
                        }, 4000);
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                return null;
            });
    };
};

export const guestLogin = () => {
    return async (dispatch) => {
        const url = 'https://hakodate-slopes.com/api/v1/login';

        const data = {
            email: 'test@test.com',
            password: 'password',
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
                dispatch(showLoadingAction('ログインしています・・・'));
                if (!response.ok) {
                    dispatch(hideLoadingAction());
                    console.log('認証に失敗しました');
                    dispatch(showAlertAction('ログインに失敗しました。お手数ですが再度お試しください。'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                } else {
                    return response.json().then((responseJson) => {
                        // 発行されたトークンをローカルストレージに保存
                        const token = responseJson['access_token'];
                        localStorage.setItem('access_token', token);

                        dispatch(
                            loginAction({
                                isSignedIn: 'true',
                                uid: responseJson['uid'],
                                username: responseJson['username'],
                                img: responseJson['img'],
                            })
                        );

                        dispatch(hideLoadingAction());
                        dispatch(push('/'));
                        dispatch(showMessageAction('ゲストログインしました！'));
                        setTimeout(() => {
                            dispatch(hideAlertAction());
                        }, 4000);
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
        const url = 'https://hakodate-slopes.com/api/v1/logout';
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
            dispatch(push('/'));
            dispatch(showMessageAction('ログアウトしました！'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 4000);
        });
    };
};

export const userDelete = (id) => {
    return async (dispatch) => {
        if (confirm('アカウントを削除しますか？')) {
            const url = 'https://hakodate-slopes.com/api/v1/users/' + id;
            const token = localStorage.getItem('access_token');

            const option = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token,
                },
            };

            await fetch(url, option)
                .then(() => {
                    localStorage.removeItem('access_token');
                    dispatch(logoutAction());
                    dispatch(push('/'));
                    dispatch(showMessageAction('アカウントを削除しました'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 4000);
                })
                .catch((error) => console.error(error));
        } else {
            dispatch(push('/mypage'));
        }
    };
};
