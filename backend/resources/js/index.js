import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createStore from './reducks/store/store';
import App from './top/App';
import { ConnectedRouter } from 'connected-react-router';
import * as History from 'history';

// History(履歴)の作成
const history = History.createBrowserHistory();

// Storeの作成
export const store = createStore(history);

ReactDOM.render(
    // Appコンポーネントの中でstoreの情報を参照できるようにする
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app')
);
