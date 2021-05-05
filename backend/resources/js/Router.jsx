import React from 'react';
import { Switch, Route } from 'react-router';
import { Login, Register, MyPage, PostEdit, PostDetail, PostList, UserEdit } from './templates';
import Auth from './Auth';

const Router = () => {
    return (
        <Switch>
            <Route exact path="(/)?" component={PostList} />
            <Route path="/posts/?tags=" component={PostList} />
            <Route path="/posts/?categories=" component={PostList} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route path="/posts/:id" component={PostDetail} />
            <Auth>
                <Switch>
                    <Route exact path="/mypage" component={MyPage} />
                    <Route exact path="/edit" component={PostEdit} />
                    <Route exact path="/useredit" component={UserEdit} />
                </Switch>
            </Auth>
        </Switch>
    );
};

export default Router;
