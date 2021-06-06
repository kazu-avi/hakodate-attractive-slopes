import * as Actions from './actions';
import initialState from '../store/initialState';

export const AlertReducer = (state = initialState.alert, action) => {
    switch (action.type) {
        case Actions.SHOW_ALERT:
            return {
                ...state,
                ...action.payload,
            };
        case Actions.SHOW_MESSAGE:
            return {
                ...state,
                ...action.payload,
            };
        case Actions.HIDE_ALERT:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
