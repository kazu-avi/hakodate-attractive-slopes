// Reducerに状態（データだけ）を渡して処理してもらう
export const LOGIN = 'LOGIN';

export const loginAction = (userState) => {
    return {
        type: 'LOGIN',
        payload: {
            isSignedIn: true,
            uid: userState.uid,
            username: userState.username,
            img: userState.img,
        },
    };
};

export const LOGOUT = 'LOGOUT';

export const logoutAction = () => {
    return {
        type: 'LOGIN',
        payload: {
            isSignedIn: false,
            uid: '',
            username: '',
            img: '',
        },
    };
};

export const DELETE = 'DELETE';

export const deleteAction = () => {
    return {
        type: 'DELETE',
        payload: {
            isSignedIn: false,
            uid: '',
            username: '',
            img: '',
        },
    };
};
