import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

import SingleMatch from '../moduleSingleMatch/SingleMatch';

const MatchHistoryDisplay = (props) => {
    const matchHistory = props.matchHistory
    const [renderFlag, setRenderFlag] = useState(false);
    const [matchesToRender, setMatchesToRender] = useState(0)
   
    
    useEffect(() => {
        setMatchesToRender(10)
        setRenderFlag(checkIfAbleToRender(matchHistory));
    }, [matchHistory]);


    const checkIfAbleToRender = (array) => {
        if (array === null || array === undefined) {return false}
        if (array <= 1) {return false}
        return true
    };


    return (
        <div>
            <h1>Note: Work in progress</h1>

            <div>
                {matchHistory.map((match, index) => (
                    index < matchesToRender && <SingleMatch key={index} gameInformation={match} />
                ))}
            </div>
        </div>
    );
}

export default MatchHistoryDisplay;
