import SocketService from './SocketService';


class RoomsService extends SocketService {
    constructor() {
        super('/game');
    }

    getProgressUpdates(cb) {
        this.subscribeOnce('game-progress', cb)
    }

    joinGame(id, progressCb) {
        this.getProgressUpdates(progressCb);
        return this.sendPromisified('join-game', id);
    }

    leaveGame(id) {
        return this.sendPromisified('leave-game');
    }

    setProgress(progress) {
        return this.sendPromisified('game-progress', progress);
    }

    init(id, progressCb) {
        if (this.ready && !this.connected) {
            this.reconnect();
        }
        if (!this.ready) {
            return this.connect().then(() => {
                return this.joinGame(id, progressCb);
            })
        } else {
            return this.joinGame(id, progressCb);
        }
    }
}

export default new RoomsService();