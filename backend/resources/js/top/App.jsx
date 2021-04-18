import React from 'react';
import Header from '../components/Header/Header';
import Router from '../Router';
import { Loading } from '../components/UIKit';

const App = () => {
    return (
        <>
            <Header />
            <Loading>
                <main>
                    <Router />
                </main>
            </Loading>
        </>
    );
};

export default App;
