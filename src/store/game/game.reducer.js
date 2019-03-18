import * as types from './../types';

const initialState = {
    gameId: null,
    started: false,
    finished: false,
    text: '',
    users: [],
    requestingGame: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.JOIN_GAME_REQUEST:
            return {
                ...state,
                requestingGame: true,
            };
        case types.JOIN_GAME_FAIL:
            return {
                ...state,
                requestingGame: false,
                gameId: null,
            };
        case types.JOIN_GAME_SUCCESS:
            return {
                ...state,
                requestingGame: false,
                users: action.game.users,
                gameId: action.game.id,
            };
        case types.LEAVE_GAME:
            return {
                ...state,
                gameId: null,
            };
        default:
            return state
    }
}