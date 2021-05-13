import { push } from 'connected-react-router';
import { hideAlertAction, showAlertAction, showMessageAction } from '../../reducks/alert/actions';
import { showLoadingAction, hideLoadingAction } from '../../reducks/loading/actions';

export const postRegister = (uid, category, file, text, tags) => {
    return async (dispatch) => {
        if (uid === '' || category === '' || file === '' || text === '') {
            dispatch(showAlertAction('必須項目が未入力です'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 2000);
            return false;
        }

        const url = 'https://hakodate-slopes.com/api/v1/posts/';
        const token = localStorage.getItem('access_token');

        const data = new FormData();
        data.append('user_id', uid);
        data.append('category_id', category);
        data.append('file', file);
        data.append('text', text);
        tags.forEach((tag) => data.append('tags[]', tag));

        const option = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: data,
        };

        console.log(data);

        console.log(...data.entries());

        await fetch(url, option)
            .then((response) => {
                dispatch(showLoadingAction('投稿しています・・・'));
                if (!response.ok) {
                    dispatch(showAlertAction('投稿に失敗しました'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                    throw new Error(`${response.status} ${response.statusText}`);
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(hideLoadingAction());
                dispatch(push('/'));
                dispatch(showMessageAction('写真を投稿しました'));
                setTimeout(() => {
                    dispatch(hideAlertAction());
                }, 5000);
            })
            .catch((error) => {
                console.error(error);
                dispatch(hideLoadingAction());
                dispatch(showAlertAction('投稿に失敗しました'));
                setTimeout(() => {
                    dispatch(hideAlertAction());
                }, 2000);
                return null;
            });
    };
};

export const postEdit = (uid, postId, postedUser, category, file, text, tags) => {
    return async (dispatch) => {
        if (uid === '' || category === '' || text === '') {
            dispatch(showAlertAction('必須項目が未入力です'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 2000);
            return false;
        }

        if (uid !== postedUser) {
            dispatch(showAlertAction('投稿編集は投稿したユーザーのみ可能です'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 2000);
            return false;
        }

        const url = 'https://hakodate-slopes.com/api/v1/posts/' + postId;
        const token = localStorage.getItem('access_token');

        const data = new FormData();
        if (file) {
            data.append('file', file);
        }
        data.append('user_id', uid);
        data.append('category_id', category);
        data.append('text', text);
        data.append('_method', 'put');
        tags.forEach((tag) => data.append('tags[]', tag));

        const option = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: data,
        };

        console.log(data);

        console.log(...data.entries());

        await fetch(url, option)
            .then((response) => {
                dispatch(showLoadingAction('投稿しています・・・'));
                if (!response.ok) {
                    dispatch(showAlertAction('投稿に失敗しました'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                    throw new Error(`${response.status} ${response.statusText}`);
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                console.log(responseJson);
                dispatch(showMessageAction('投稿を編集しました'));
                setTimeout(() => {
                    dispatch(hideAlertAction());
                }, 4000);
                dispatch(hideLoadingAction());
                dispatch(push('/'));
            })
            .catch((error) => {
                console.error(error);
                dispatch(hideLoadingAction());
                dispatch(showAlertAction('投稿に失敗しました'));
                setTimeout(() => {
                    dispatch(hideAlertAction());
                }, 2000);
                return null;
            });
    };
};

export const postDelete = (uid, postId, postedUser) => {
    return async (dispatch) => {
        if (uid !== postedUser) {
            dispatch(showAlertAction('投稿削除は投稿したユーザーのみ可能です'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 2000);
            return false;
        }

        if (confirm('投稿を削除しますか？')) {
            const url = 'https://hakodate-slopes.com/api/v1/posts/' + postId;
            const token = localStorage.getItem('access_token');

            const option = {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            };

            await fetch(url, option)
                .then((response) => {
                    dispatch(showLoadingAction('削除しています・・・'));
                    if (!response.ok) {
                        dispatch(showAlertAction('投稿削除に失敗しました'));
                        setTimeout(() => {
                            dispatch(hideAlertAction());
                        }, 2000);
                        throw new Error(`${response.status} ${response.statusText}`);
                    } else {
                        return response.json();
                    }
                })
                .then((responseJson) => {
                    console.log(responseJson);
                    dispatch(showMessageAction('投稿を削除しました！'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 4000);
                    dispatch(hideLoadingAction());
                    dispatch(push('/mypage'));
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                    dispatch(showAlertAction('投稿削除に失敗しました'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                    return null;
                });
        } else {
            dispatch(push('/mypage'));
        }
    };
};
