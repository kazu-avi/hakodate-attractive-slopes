import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { UsersReducer } from '../users/reducers';
import thunk from 'redux-thunk';
import { LoadingReducer } from '../loading/reducers';
import { CategoriesReducer } from '../categories/reducers';

//引数：history(pathの履歴の情報を持つ)
const createStore = (history) => {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            users: UsersReducer,
            loading: LoadingReducer,
            categories: CategoriesReducer,
        }),
        applyMiddleware(routerMiddleware(history), thunk)
    );
};

export default createStore;
