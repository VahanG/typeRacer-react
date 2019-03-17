import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addRoomAndEnter} from './../../../store/rooms/rooms.actions';

const AddRoom = (props) => {
    const {addRoomAndEnter} = props;
    return <>
        <button onClick={addRoomAndEnter}>Add</button>
    </>
};

AddRoom.propTypes = {
    addRoomAndEnter: PropTypes.func.isRequired,
    addingRoom: PropTypes.bool.isRequired,
};

const mapProps = state => {
    return {
        addingRoom: false,
    }
};

const mapActions = dispatch => bindActionCreators({
    addRoomAndEnter,
},dispatch);

export default connect(mapProps, mapActions)(AddRoom);