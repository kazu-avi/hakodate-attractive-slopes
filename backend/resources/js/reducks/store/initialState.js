// Storeで管理するstateの初期状態を定義する

const initialState = {
    users: {
        isSignedIn: false,
        uid: '',
        username: '',
    },
    loading: {
        isBeingLoaded: false,
        text: '',
    },
};

export default initialState;
