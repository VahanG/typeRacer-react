import {combineReducers} from 'redux';

import user from './user/user.reducer';
import rooms from './rooms/rooms.reducer';
import game from './game/game.reducer';

export default combineReducers({
    user,
    rooms,
    game,
});