import { push } from 'connected-react-router';
import { showLoadingAction, hideLoadingAction } from '../../reducks/loading/actions';

export const postRegister = (uid, category, file, text, tags) => {
    return async (dispatch) => {
        if (uid === '' || category === '' || file === '' || text === '') {
            alert('必須項目が未入力です');
            return false;
        }

        const url = 'http://localhost:30080/api/v1/posts';
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
                    alert('投稿に失敗しました');
                    throw new Error(`${response.status} ${response.statusText}`);
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                console.log(responseJson);
                alert('写真を投稿しました！');
                dispatch(hideLoadingAction());
                dispatch(push('/'));
            })
            .catch((error) => {
                console.error(error);
                dispatch(hideLoadingAction());
                alert('投稿に失敗しました');
                return null;
            });
    };
};

export const postEdit = (uid, postId, postedUser, category, file, text, tags) => {
    return async (dispatch) => {
        if (uid === '' || category === '' || text === '') {
            alert('必須項目が未入力です');
            return false;
        }

        if (uid !== postedUser) {
            alert('投稿編集は投稿したユーザーのみ可能です');
            return false;
        }

        const url = 'http://localhost:30080/api/v1/posts/' + postId;
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
                    alert('投稿に失敗しました');
                    throw new Error(`${response.status} ${response.statusText}`);
                } else {
                    return response.json();
                }
            })
            .then((responseJson) => {
                console.log(responseJson);
                alert('投稿を編集しました！');
                dispatch(hideLoadingAction());
                dispatch(push('/'));
            })
            .catch((error) => {
                console.error(error);
                dispatch(hideLoadingAction());
                alert('投稿に失敗しました');
                return null;
            });
    };
};

export const postDelete = (uid, postId, postedUser) => {
    return async (dispatch) => {
        if (uid !== postedUser) {
            alert('投稿削除は投稿したユーザーのみ可能です');
            return false;
        }

        if (confirm('投稿を削除しますか？')) {
            const url = 'http://localhost:30080/api/v1/posts/' + postId;
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
                        alert('投稿削除に失敗しました');
                        throw new Error(`${response.status} ${response.statusText}`);
                    } else {
                        return response.json();
                    }
                })
                .then((responseJson) => {
                    console.log(responseJson);
                    alert('投稿を削除しました！');
                    dispatch(hideLoadingAction());
                    dispatch(push('/mypage'));
                })
                .catch((error) => {
                    console.error(error);
                    dispatch(hideLoadingAction());
                    alert('投稿削除に失敗しました');
                    return null;
                });
        } else {
            dispatch(push('/mypage'));
        }
    };
};
