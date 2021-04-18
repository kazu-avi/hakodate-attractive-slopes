import * as Actions from './actions';
import initialState from '../store/initialState';

export const TagsReducer = (state = initialState.tags, action) => {
    switch (action.type) {
        case Actions.SET_TAGS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
