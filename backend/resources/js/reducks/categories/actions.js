export const SET_CATEGORIES = 'SET_CATEGORIES';
export const setCategoriesAction = (list) => {
    return {
        type: 'SET_CATEGORIES',
        payload: {
            list: list,
        },
    };
};
