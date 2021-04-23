import { showLoadingAction, hideLoadingAction } from '../../reducks/loading/actions';
import { push } from 'connected-react-router';

const commentRegister = (id, comment) => {
    return async (dispatch) => {
        console.log(comment.length);
        if (id === '' || comment === '') {
            alert('必須項目が未入力です');
            return false;
        }

        if (comment.length > 300) {
            alert('コメントの文字数は300文字以内で入力してください。');
            return false;
        }

        const url = 'http://localhost:30080/api/v1/posts/' + id + '/comments';
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

        console.log(data);
        console.log(url);
        console.log(option);

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
            .then(() => {
                alert('コメントを投稿しました！');
                dispatch(hideLoadingAction());
                dispatch(push('/posts/' + id));
            })
            .catch((error) => {
                console.error(error);
                dispatch(hideLoadingAction());
                alert('投稿に失敗しました');
                return false;
            });
    };
};

export default commentRegister;
