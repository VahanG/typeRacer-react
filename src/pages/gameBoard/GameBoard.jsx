import React, {useMemo} from 'react';
import {withRouter, NavLink} from 'react-router-dom';

import Rooms from './rooms/Rooms';
import Game from './game/Game';

const GameBoard = (props) => {
    const {
        location: {search}
    } = props;
    let gameId = search.split('gameId=')[1];
    gameId = gameId && gameId.split('&')[0];

    const rooms = useMemo(() => <Rooms />, []);
    const game = useMemo(() => !!gameId && <Game gameId={gameId} />, [gameId]);

    return <div>
        the game
        {game}
        {rooms}
    </div>
};

export default withRouter(GameBoard);