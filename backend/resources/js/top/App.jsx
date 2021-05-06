import React from 'react';
import Header from '../components/Header/Header';
import { NavBar } from '../components/Header';
import Router from '../Router';
import { Loading, ScrollToTop } from '../components/UIKit';

const App = () => {
    return (
        <>
            <ScrollToTop />
            <NavBar />
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
