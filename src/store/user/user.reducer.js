import * as types from './../types';

const initialState = {
    currentUser: null,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.currentUser
            };
        case types.LOG_OUT:
            return {
                ...state,
                currentUser: null,
            };
        default:
            return state
    }
}