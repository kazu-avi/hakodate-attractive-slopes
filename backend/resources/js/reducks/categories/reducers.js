import * as Actions from './actions';
import initialState from '../store/initialState';

export const CategoriesReducer = (state = initialState.categories, action) => {
    switch (action.type) {
        case Actions.SET_CATEGORIES:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
