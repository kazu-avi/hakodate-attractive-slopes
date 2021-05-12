import { setCategoriesAction } from './actions';

export const getAllCategories = () => {
    return async (dispatch) => {
        const url = 'https://localhost:443/api/v1/categories/';

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
