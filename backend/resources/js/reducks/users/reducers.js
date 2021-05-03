//actionから受け取った値の処理
import * as Actions from './actions';
import initialState from '../store/initialState';

//第一引数：現在のstate = 初期状態はinitialState
//第二引数：actionからreturnされた変更値
export const UsersReducer = (state = initialState.users, action) => {
    switch (action.type) {
        case Actions.LOGIN:
            return {
                ...state,
                ...action.payload,
            };
        case Actions.LOGOUT:
            return {
                ...action.payload,
            };
        case Actions.DELETE:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};
