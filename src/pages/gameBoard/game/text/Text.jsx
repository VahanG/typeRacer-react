import React, {useState, useCallback, useMemo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const Text = (props) => {
    const {
        text = '',
    } = props;
    const textArr = useMemo(() => text.split(' '), [text]);
    const [userInput, setUserInput] = useState('');
    const [index, changeIndex] = useState(0);
    const currentWord = useMemo(() => textArr[index], [index, text]);
    const changeUserInputCb = (input) => {
        if (input === `${currentWord} `){
            changeIndex(index + 1);
            setUserInput('');
            return;
        }
        console.log(currentWord);
        setUserInput(input);
    };
    const changeUserInput = useCallback( changeUserInputCb, [index, currentWord]); // just using useCallback
    if(!text) return null;
    return (
        <>
            <h1>{text}</h1>
            <input onChange={(e) => changeUserInput(e.target.value)} value={userInput} />
            {!currentWord.includes(userInput) && <div>wrong input</div>}
        </>
    )
};

Text.propTypes = {
    text: PropTypes.string.isRequired,
};

const mapProps = state => {
    const {text, index} = state.game;
    return {
        text,
    };
};

const mapActions = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapProps, mapActions)(Text);