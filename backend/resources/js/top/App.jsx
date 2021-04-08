import React from 'react';
import '../../css/app.css';
import Header from '../components/Header/Header';
import Router from '../Router';

const App = () => {
    return (
        <>
            <Header />
            <main>
                <Router />
            </main>
        </>
    );
};

export default App;
