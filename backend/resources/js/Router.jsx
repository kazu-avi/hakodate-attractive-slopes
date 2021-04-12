import React from 'react';
import { Switch, Route } from 'react-router';
import { Login, Register, Home, MyPage, PostEdit } from './templates';
import Auth from './Auth';

const Router = () => {
    return (
        <Switch>
            <Route exact path="(/)?" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Auth>
                <Route exact path="/mypage" component={MyPage} />
                <Route exact path="/edit" component={PostEdit} />
            </Auth>
        </Switch>
    );
};

export default Router;
