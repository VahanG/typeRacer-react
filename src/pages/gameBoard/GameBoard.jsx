import React, {useMemo} from 'react';
import {withRouter, NavLink} from 'react-router-dom';

import Rooms from './rooms/Rooms';
import Game from './game/Game';

const GameBoard = (props) => {
    const {
        location: {search}
    } = props;
    let roomId = search.split('gameId=')[1];
    roomId = roomId && roomId.split('&')[0];

    const rooms = useMemo(() => <Rooms />, []);
    const game = useMemo(() => <Game roomId={roomId} />, [roomId]);

    return <div>
        {game}
        {rooms}
    </div>
};

export default withRouter(GameBoard);