import * as types from './../types';

const initialState = {
    rooms: [],
    addingRoom: false,
    gettingRooms: false,
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.rooms,
                gettingRooms: false,
            };
        case types.ADD_ROOM_SUCCESS:
            return {
              ...state,
              rooms: [...state.rooms, action.room],
              gettingRooms: false,
            };
        default:
            return state
    }
}