import * as types from './../types';

import RoomsService from './../../services/RoomsService';

export function getRooms() {
    return (dispatch) => {
        RoomsService.init().then((rooms) => {
            console.log(rooms);
            dispatch({
                type: types.GET_ROOMS_SUCCESS,
                rooms,
            })
        })
    }
}

export function addRoomAndEnter() {
    return (dispatch) => {
        RoomsService.addRoom().then((room) => {
            dispatch({
                type: types.ADD_ROOM_SUCCESS,
                room,
            })
        })
    }
}
