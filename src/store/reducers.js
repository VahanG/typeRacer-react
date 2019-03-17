import {combineReducers} from 'redux';

import * as types from './types';
import user from './user/user.reducer';

export default combineReducers({
    user
});