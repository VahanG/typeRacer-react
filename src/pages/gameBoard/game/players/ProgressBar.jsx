import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = (props) => {
    const {progress} = props;
    return (
        <progress value={progress} max="100"/>
    )
};

ProgressBar.propTypes = {};

export default ProgressBar;