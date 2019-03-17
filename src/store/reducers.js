import {combineReducers} from 'redux';

import user from './user/user.reducer';
import rooms from './rooms/rooms.reducer';

export default combineReducers({
    user,
    rooms,
});