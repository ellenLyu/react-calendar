import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '././components/Home/Home';
import Login from '././components/Login/Login';
import Signup from '././components/Signup/Signup';
import NotFound from '././components/NotFound/NotFound';

import Calendar from '././components/Calendar/Calendar';


const Routes = () => (
    <BrowserRouter >
         {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/home" component={Home} />
            <Route path="*" component={NotFound} />
            
        </Switch>
    </BrowserRouter>
);

export default Routes;