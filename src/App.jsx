import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Game from './pages/gameBoard/GameBoard';
import UserContainer from './pages/user/UserContainer'

const App = () => {
    return <>
        <h2>hola!</h2>
        <Switch>
            <Route path="/user" component={UserContainer} />
            <Route path="/" component={Game} />
        </Switch>
    </>
};

export default App;