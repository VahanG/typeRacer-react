import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = (props) => {
    const {progress, user={}} = props;
    return (
        <div>
            {user.name}
            <progress value={progress} max="100"/>
        </div>
    )
};

ProgressBar.propTypes = {};

export default ProgressBar;