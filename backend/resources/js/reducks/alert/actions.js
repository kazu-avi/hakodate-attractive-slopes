export const SHOW_ALERT = 'SHOW_ALERT';
export const showAlertAction = (text) => {
    return {
        type: 'SHOW_ALERT',
        payload: {
            displayAlert: true,
            displayMessage: false,
            text: text,
        },
    };
};

export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const showMessageAction = (text) => {
    return {
        type: 'SHOW_MESSAGE',
        payload: {
            displayAlert: false,
            displayMessage: true,
            text: text,
        },
    };
};

export const HIDE_ALERT = 'HIDE_ALERT';
export const hideAlertAction = () => {
    return {
        type: 'HIDE_ALERT',
        payload: {
            displayAlert: false,
            displayMessage: false,
            text: '',
        },
    };
};
