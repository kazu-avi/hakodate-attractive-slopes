import React from 'react';
import Header from '../components/Header/Header';
import Router from '../Router';
import { Loading, ScrollToTop } from '../components/UIKit';

const App = () => {
    return (
        <>
            <ScrollToTop />
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
