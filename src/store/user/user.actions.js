import * as types from './../types';

import UserService from './../../services/UsersService';
import AuthService from './../../services/AuthService';


export function login(username, password) {
    return dispatch => {
        dispatch({type: types.LOGIN_REQUEST, username});
        AuthService.login({username, password}).then(({status}) => {
            if (!UserService.isOkStatus(status)) {
                dispatch({type: types.LOGIN_FAIL});
            } else {
                dispatch(getCurrentUser());
            }
        })
    };
}

export function getCurrentUser() {
    return (dispatch) => {
        UserService.getCurentUser().then(({status, currentUser}) => {
            if (UserService.isOkStatus(status)) {
                dispatch({
                    type: types.GET_CURRENT_USER_SUCCESS,
                    currentUser,
                })
            } else {
                dispatch(logout());
            }
        })
    }
}

export function logout() {

}