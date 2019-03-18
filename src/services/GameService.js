import SocketService from './SocketService';


class RoomsService extends SocketService {
    constructor() {
        super('/game');
    }

    joinGame() {

    }

    getGame(id) {
        return this.sendPromisified('join-game', id);
    }

    init(id) {
        if (this.ready && !this.connected) {
            this.reconnect();
        }
        if (!this.ready) {
            return this.connect().then(() => {
                return this.getGame(id);
            })
        } else {
            return this.getGame(id);
        }
    }

}

export default new RoomsService();