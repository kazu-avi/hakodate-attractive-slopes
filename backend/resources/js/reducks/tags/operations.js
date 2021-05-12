import { setTags } from './actions';

export const getAllTags = () => {
    return async (dispatch) => {
        const url = 'http://ec2-54-95-156-93.ap-northeast-1.compute.amazonaws.com/api/v1/tags/';

        await fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error();
                }
                return response.json();
            })
            .then((responseJson) => dispatch(setTags(responseJson)))
            .catch((error) => console.error(error));
    };
};
