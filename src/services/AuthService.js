import Request from './Request';


class AuthService extends Request {
    constructor() {
        super('auth');
    }

    login({username, password,}) {
        const options = {
            method: 'POST',
            //body: `grant_type=password&username=${username}&password=${password}`
            body: JSON.stringify({username, password})
        };
        return this.send({path: '/login', options});
    }
}

export default new AuthService();