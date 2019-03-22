import React, {useEffect, useMemo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {joinGame, leaveGame} from './../../../store/game/game.actions';
import Text from './text/Text';
import Players from './players/Players';

const Game = (props) => {
    const {
        gameId,
        roomId,
        joinGame,
        leaveGame,
        joined,
    } = props;


    useEffect(() => {
        if (roomId){
            joinGame(roomId);
        } else {
            joined && leaveGame();
        }
    }, [roomId]);

    const text = useMemo(() => !!gameId && <Text />, [gameId]);
    const players = useMemo(() => !!gameId && <Players />, [gameId]);

    return <div>
        {text}
        {players}
        <h3>game with id {gameId}</h3>
    </div>
};

Game.propTypes = {
    roomId: PropTypes.string.isRequired,
    gameId: PropTypes.string,
    text: PropTypes.string,
    users: PropTypes.array.isRequired,
    joined: PropTypes.bool.isRequired,
    joinGame: PropTypes.func.isRequired,
    leaveGame: PropTypes.func.isRequired,
};

const mapProps = state => {
    const {users, text, gameId} = state.game;
    return {
        users,
        text,
        joined: !!gameId,
        gameId,
    };
};

const mapActions = dispatch => bindActionCreators({
    joinGame,
    leaveGame,
}, dispatch);

export default connect(mapProps, mapActions)(Game);