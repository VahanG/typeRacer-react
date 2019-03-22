import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ProgressBar from './ProgressBar';
const Players =
    (props) => {
        const {progress, users, usersData} = props;
        return (
            <div>
                <ProgressBar progress={progress} />
                {users.map( user => <ProgressBar key={user} user={props[user]} progress={10}/>)}
                <h4>your and other players progress will displayed here</h4>
            </div>
        )
    };

Players.propTypes = {
    progress: PropTypes.number.isRequired,
    users: PropTypes.array.isRequired,
};

const mapProperties = state => {
    const {progress, users} = state.game;
    const {id} = state.user.currentUser;
    const usersData = {};
    users.forEach( d => {usersData[d] = state.game[d]} );
    return {
        progress: 20,
        users: users.filter( user => user !== id),
        ...usersData,
    }
};

export default connect(mapProperties)(Players);