import { hideAlertAction, showAlertAction, showMessageAction } from '../../reducks/alert/actions';
import { showLoadingAction, hideLoadingAction } from '../../reducks/loading/actions';
import { push } from 'connected-react-router';

const commentRegister = (id, comment) => {
    return async (dispatch) => {
        if (id === '' || comment === '') {
            dispatch(showAlertAction('必須項目が未入力です'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 2000);
            return false;
        }

        if (comment.length > 300) {
            dispatch(showAlertAction('コメントの文字数は300文字以内で入力してください。'));
            setTimeout(() => {
                dispatch(hideAlertAction());
            }, 2000);
            return false;
        }

        const url = 'https://hakodate-slopes.com/api/v1/posts/' + id + '/comments';
        const token = localStorage.getItem('access_token');

        const data = {
            comment: comment,
        };

        const option = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        await fetch(url, option)
            .then((response) => {
                dispatch(showLoadingAction('投稿しています・・・'));
                if (!response.ok) {
                    dispatch(showAlertAction('投稿に失敗しました。'));
                    setTimeout(() => {
                        dispatch(hideAlertAction());
                    }, 2000);
                    throw new Error(`${response.status} ${response.statusText}`);
                } else {
                    return response.json();
                }
            })
            .then(() => {
                dispatch(showMessageAction('コメントを投稿しました。'));
                setTimeout(() => {
                    dispatch(hideAlertAction());
                }, 5000);
                dispatch(hideLoadingAction());
                dispatch(push('/posts/' + id));
            })
            .catch((error) => {
                console.error(error);
                dispatch(hideLoadingAction());
                dispatch(showAlertAction('コメント投稿に失敗しました。'));
                setTimeout(() => {
                    dispatch(hideAlertAction());
                }, 2000);
                return false;
            });
    };
};

export default commentRegister;
