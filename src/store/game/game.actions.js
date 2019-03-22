import * as types from './../types';
import GameService from './../../services/GameService';

export function progressChange(user) {
    console.log(user);
    return (dispatch) => {
        dispatch({
            type: types.SET_USER_DATA,
            progress: user.progress,
            user: user.user,
        })
    }
}

export function joinGame(id) {
    return (dispatch) => {
        GameService.init(id, (data) => {
            dispatch(progressChange(data))
        }).then((game) => {
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