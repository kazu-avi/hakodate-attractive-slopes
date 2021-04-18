export const SET_TAGS = 'SET_TAGS';
export const setTags = (list) => {
    return {
        type: 'SET_TAGS',
        payload: {
            list: list,
        },
    };
};
