import * as types from './../types';

const initialState = {
    game: null,
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
            };
        case types.JOIN_GAME_SUCCESS:
            return {
                ...state,
                requestingGame: false,
            };
        default:
            return state
    }
}