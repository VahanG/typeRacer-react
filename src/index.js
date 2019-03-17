import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './store/reducers';
import PrivateRoute from './PrivateRoute';
import App from './App';
import Auth from './pages/auth/Auth';

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware
    ),
);

render([
    <Provider key={'provider'} store={store}>
        <Router>
            <Switch>
                <Route path="/login" component={Auth}/>
                <PrivateRoute path="/" component={App}/>
            </Switch>
        </Router>
    </Provider>
], document.getElementById('app'));