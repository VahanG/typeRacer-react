import React, {useMemo} from 'react';
import {withRouter, NavLink} from 'react-router-dom';

import Rooms from './rooms/Rooms';
import Game from './game/Game';

const GameBoard = (props) => {
    const rooms = useMemo(() => <Rooms />, []);
    const game = useMemo(() => <Game />, []);

    return <div>
        the game
        {game}
        {rooms}
    </div>
};

export default GameBoard;