import React from 'react';
import { Switch, Route } from 'react-router';
import { Login, Register, Home, MyPage, PostEdit, PostDetail } from './templates';
import Auth from './Auth';

const Router = () => {
    return (
        <Switch>
            <Route exact path="(/)?" component={Home} />
            <Route path="/posts/?tags=" component={Home} />
            <Route path="/posts/?categories=" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="/posts/:id" component={PostDetail} />
            <Auth>
                <Switch>
                    <Route exact path="/mypage" component={MyPage} />
                    <Route exact path="/edit" component={PostEdit} />
                </Switch>
            </Auth>
        </Switch>
    );
};

export default Router;
