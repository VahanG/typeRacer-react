import * as types from './../types';

const initialState = {
    gameId: null,
    started: false,
    finished: false,
    text: '',
    users: [],
    requestingGame: false,
    progress: 0,
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
                text: action.game.text,
            };
        case types.LEAVE_GAME:
            return {
                ...state,
                gameId: null,
            };
        case types.SET_SELF_PROGRESS:
            return {
                ...state,
                progress: action.progress,
            };
        case types.SET_USER_PROGRESS:
            return {
                ...state,
                [action.user.id]: {
                    ...state[action.user.id],
                    progress: action.progress
                }
            };
        case types.SET_USER_DATA:
            return {
                ...state,
                [action.user.id]: {
                    ...action.user,
                    ...state[action.user.id],
                    progress: action.progress
                }
            };
        default:
            return state
    }
}