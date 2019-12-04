import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '././components/Home/Home';
import Login from '././components/Login/Login';
import Signup from '././components/Signup/Signup';
import NotFound from '././components/NotFound/NotFound';

const Routes = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/Signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="*" component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Routes;