import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {joinGame, leaveGame} from './../../../store/game/game.actions';

const Game = (props) => {
    const {
        gameId,
        joinGame,
        leaveGame,
        joined,
    } = props;


    useEffect(() => {
        if (gameId){
            joinGame(gameId)
        } else {
            joined && leaveGame()
        }
    }, [gameId]);

    return <div>
        game with id {gameId}
    </div>
};

Game.propTypes = {
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
    };
};

const mapActions = dispatch => bindActionCreators({
    joinGame,
    leaveGame,
}, dispatch);

export default connect(mapProps, mapActions)(Game);