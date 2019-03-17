import React, {useState} from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {login} from './../../store/user/user.actions';

const Auth = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {loggingIn, login, currentUser, from='/'} = props;
    const submit = (e) => {
        e.preventDefault();
        login(username, password);
    };
    if (currentUser) return <Redirect to={from} />;
    return <div>
        LOGIN
        <form onSubmit={submit}>
            username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
            password <input value={password} onChange={(e) => setPassword(e.target.value)} />
            <button disabled={loggingIn}>Submit</button>
        </form>

    </div>
};

Auth.propTypes = {
    login: PropTypes.func.isRequired,
    loggingIn: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    from: PropTypes.string,
};

const mapProps = state => {
    const {currentUser} = state.user;
    return {
        loggingIn: false,
        currentUser,
    }
};

const mapActions = dispatch => bindActionCreators({
    login,
},dispatch);

export default connect(mapProps, mapActions)(Auth);