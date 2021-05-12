import { setCategoriesAction } from './actions';

export const getAllCategories = () => {
    return async (dispatch) => {
        const url = 'http://ec2-54-95-156-93.ap-northeast-1.compute.amazonaws.com/api/v1/categories/';

        await fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('接続に失敗しました');
                }
                return response;
            })
            .then((response) => response.json())
            .then((responseJson) => dispatch(setCategoriesAction(responseJson)))
            .catch((error) => console.error(error));
    };
};
