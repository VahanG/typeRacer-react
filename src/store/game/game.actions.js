import * as types from './../types';

import GameService from './../../services/GameService';

export function joinGame(id) {
    return (dispatch) => {
        GameService.init(id).then((game) => {
            dispatch({
                type: types.JOIN_GAME_SUCCESS,
                game,
            });
        })
    }
}

export function leaveGame() {
    return (dispatch, getState) => {
        GameService.leaveGame().then(() => {
            dispatch({
                type: types.LEAVE_GAME,
            })
        });
    }
}

export function changeUserProgress(progress) {
    return (dispatch, getState) => {
        GameService.setProgress(progress);
        dispatch({
            type: types.SET_SELF_PROGRESS,
            progress,
        })
    }
}