import * as types from './../types';

import GameService from './../../services/GameService';

export function joinGame(id) {
    GameService.init(id).then((game) => {
        console.log(game)
    })
}