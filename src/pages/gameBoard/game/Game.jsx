import React from 'react';
import {withRouter} from 'react-router-dom';


const Game = (props) => {
    const {
        location: {search}
    } = props;

    let gameId = search.split('gameId=')[1];
    gameId = gameId && gameId.split('&')[0];
    return <div>
        game with id {gameId}
    </div>
};

export default withRouter(Game);