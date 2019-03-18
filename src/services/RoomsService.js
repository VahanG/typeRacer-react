import SocketService from './SocketService';


class RoomsService extends SocketService {
    constructor() {
        super('/rooms');
    }

    addRoom() {
        console.log('oppening room');
        return this.sendPromisified('new-room').then((data) => {
            const { id: roomId } = data;
            return roomId;
        }).catch(e => {
            throw e
        });

    }

    _getRooms() {
        return this.sendPromisified('get-rooms')
    }

    init() {
        if(this.ready && !this.connected){
            this.reconnect();
        }
        if(!this.ready){
            return this.connect().then( () => {
                return this._getRooms();
            })
        }else {
            return this._getRooms();
        }
    }

}

export default new RoomsService();