import SocketService from './SocketService';


class RoomsService extends SocketService {
    constructor() {
        super('/game');
    }

    joinGame(id) {
        return this.sendPromisified('join-game', id);
    }

    leaveGame(id) {
        return this.sendPromisified('leave-game');
    }
    init(id) {
        if (this.ready && !this.connected) {
            this.reconnect();
        }
        if (!this.ready) {
            return this.connect().then(() => {
                return this.joinGame(id);
            })
        } else {
            return this.joinGame(id);
        }
    }

}

export default new RoomsService();