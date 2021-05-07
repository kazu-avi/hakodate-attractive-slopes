import React from 'react';
import Header from '../components/Header/Header';
import Router from '../Router';
import { Loading, ScrollToTop } from '../components/UIKit';
import { Footer } from '../templates';

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
            <Footer />
        </>
    );
};

export default App;
