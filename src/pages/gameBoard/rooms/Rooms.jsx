import React from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import AddRoom from './AddRoom';

const Rooms = (props) => {
    return <>
        <AddRoom />
        <NavLink to={`?gameId=7`}>7</NavLink>
    </>
};



export default connect()(Rooms);