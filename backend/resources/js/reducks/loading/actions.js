export const SHOW_LOADING = 'SHOW_LOADING';
export const showLoadingAction = (text = 'Loading...') => {
    return {
        type: 'SHOW_LOADING',
        payload: {
            isBeingLoaded: true,
            text: text,
        },
    };
};

export const HIDE_LOADING = 'HIDE_LOADING';
export const hideLoadingAction = () => {
    return {
        type: 'HIDE_LOADING',
        payload: {
            isBeingLoaded: false,
            text: '',
        },
    };
};
