import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import AddRoom from './AddRoom';

const Rooms = (props) => {
    const {rooms} = props;
    return <>
        <h2>select room from existing</h2>
        <div style={{display: 'grid'}}>
            {rooms.map(room => <NavLink key={room.id} to={`?gameId=${room.id}`}>{room.id}</NavLink>)}
        </div>
        <h1>or</h1>
        <AddRoom />

    </>
};

Rooms.propTypes = {
    rooms: PropTypes.array.isRequired,
};

const mapProps = state => {
    const {rooms} = state.rooms;
    return {
        rooms,
    }
};

export default connect(mapProps, null)(Rooms);