import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {joinGame} from './../../../store/game/game.actions';

const Game = (props) => {
    const {
        gameId,
    } = props;


    useEffect(() => {
        joinGame(gameId)
    }, gameId);

    return <div>
        game with id {gameId}
    </div>
};

Game.propTypes = {
    gameId: PropTypes.string.isRequired,
    text: PropTypes.string,
    joinGame: PropTypes.func.isRequired,
};

const mapProps = state => {
    return {};
};

const mapActions = dispatch => bindActionCreators({
    joinGame,
}, dispatch);

export default connect(mapProps, mapActions)(Game);