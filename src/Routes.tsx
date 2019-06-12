import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollTop';
import Main from './components/Main';
import Dashboard from "./components/Dashboard";

export default () => (
    <HashRouter>
        <ScrollToTop>
            <Switch>
                <Route exact path='/' component = { Main } />
                <Route exact path='/dashboard' component = { Dashboard } />
                <Route exact path='/signup' component = { Main } />
                <Route exact path='/wizard' component = { Main } />
                <Route exact path='/cards' component = { Main } />
            </Switch>
        </ScrollToTop>
    </HashRouter>
);