import React from 'react';
import { Switch, Route } from 'react-router';
import { Login, Register, Home } from './templates';

const Router = () => {
    return (
        <Switch>
            <Route exact path="(/)?" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
        </Switch>
    );
};

export default Router;
