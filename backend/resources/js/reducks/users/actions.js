// Reducerに状態（データだけ）を渡して処理してもらう
export const LOGIN = 'LOGIN';

export const loginAction = (userState) => {
    return {
        type: 'LOGIN',
        payload: {
            isSignedIn: true,
            uid: userState.uid,
            username: userState.username,
        },
    };
};
