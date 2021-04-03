import React from 'react';
import ReactDOM from 'react-dom';
import { Register } from '../templates/index';
import '../../css/app.css';

const App = () => {
    return (
        <>
            <Register />
        </>
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
