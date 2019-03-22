import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ProgressBar from './ProgressBar';

const Players =
    (props) => {
        const {progress, users} = props;
        return (
            <div>
                <ProgressBar progress={progress} />
                {users.map( user => <ProgressBar progress={10}/>)}
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
    return {
        progress,
        users: users.filter( user => user !== id),
    }
};

export default connect(mapProperties)(Players);