import { push } from 'connected-react-router';

const postRegister = (uid, category, file, text) => {
    return async (dispatch) => {
        if (uid === '' || category === '' || file === '' || text === '') {
            alert('必須項目が未入力です');
        }

        const url = 'http://localhost:30080/api/v1/posts';
        const token = localStorage.getItem('access_token');

        const data = new FormData();
        data.append('user_id', uid);
        data.append('category_id', category);
        data.append('file', file);
        data.append('text', text);

        const option = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token,
            },
            body: data,
        };

        console.log(option);

        await fetch(url, option)
            .then((response) => {
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
                dispatch(push('/'));
            })
            .catch((error) => {
                console.error(error);
                alert('投稿に失敗しました');
                return null;
            });
    };
};

export default postRegister;
