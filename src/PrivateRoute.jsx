import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Route, Redirect} from 'react-router-dom';

import {readCookie} from './helpers/cookie';
import {getCurrentUser} from '././store/user/user.actions';

const PrivateRoute = (props) => {
    const {getCurrentUser, location, component: RouteComponent, currentUser, ...rest} = props;
    const hasToken = readCookie('token');
    let Component;
    if (currentUser) {
        Component = props => (
            <RouteComponent {...props}/>
        );
    } else if (hasToken) {
        Component = () => (
            <div>loading user data ...</div>
        );
    } else {
        Component = () => (
            <Redirect to={{
                pathname: '/login',
                state: {from: location}
            }}/>
        );

    }

    if (!currentUser && hasToken) {
        getCurrentUser();
    }

    return (
        <Route {...rest} render={props => Component(props)}/>
    );
};

const mapProps = state => {
    const {currentUser, gettingData} = state.user;
    return {
        currentUser,
        gettingData
    };
};

const mapActions = dispatch => bindActionCreators({
    getCurrentUser,
}, dispatch);

export default connect(mapProps, mapActions)(PrivateRoute);