import Request from './Request';


class UserService extends Request {
    constructor() {
        super('user');
    }

    registerUser(username, password, other) {
        const options = {
            method: 'POST',
            body: JSON.stringify({username, password, ...other}),
        };
        return this.send({path: `/`, options,});
    }

    getCurentUser() {
        const options = {
            method: 'GET',
        };
        return this.send({ path: '/current', options })
            .then(({ status, json }) => ({ status, currentUser: json }));
    }

    getUser(id) {
        const options = {
            method: 'GET',
        };
        return this.send({ path: `/${id}`, options })
            .then(({ status, json }) => ({ status, user: json }));
    }


    updatePassword(password) {
        const { oldPassword, newPassword } = password;
        const options = {
            method: 'PUT',
            body: JSON.stringify({ oldPassword, newPassword }),
        };
        return this.send({ path: `/current/password`, options, });
    }

    updateUser(data) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(data)
        };
        return this.send({ path: '/current', options })
            .then(({ status, json }) => ({ status, currentUser: json }));
    }

    searchUser(searchedQuery) {
        const query = {};
        Object.keys(searchedQuery).forEach(k => {
            if (searchedQuery[k] !== '') query[k] = searchedQuery[k];
        });
        const options = {
            method: 'GET',
        };
        return this.send({ path: `?${Request.makeQuery(query)}`, options });
    }

}

export default new UserService();