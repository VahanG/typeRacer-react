import SocketService from './SocketService';


class RoomsService extends SocketService {
    constructor() {
        super('/game');
    }

    joinGame() {

    }

    getGame() {
        return this.sendPromisified('get-game');
    }

    init(id) {
        if(this.ready && !this.connected){
            this.reconnect();
        }
        if(!this.ready){
            return this.connect().then( () => {
                return this.getGame();
            })
        }else {
            return this.getGame();
        }
    }

}

export default new RoomsService();