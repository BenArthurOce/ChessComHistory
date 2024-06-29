import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

import SingleMatchPC from './SingleMatchPC';
import SingleMatchMobile from './SingleMatchMobile';

import useIsMobile from '../../hooks/useIsMobile';

const MatchHistoryDisplay = (props) => {
    const matchHistory = props.matchHistory
    const [renderFlag, setRenderFlag] = useState(false);
    const [matchesToRender, setMatchesToRender] = useState(0)

    const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device
   
    
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
        <>
            {hookIsMobile ? (
                <>
                    {matchHistory.map((match, index) => (
                        index < matchesToRender && <SingleMatchMobile key={index} gameInformation={match} />
                    ))}
                </>
            ) : (
                <>
                    {matchHistory.map((match, index) => (
                        index < matchesToRender && <SingleMatchPC key={index} gameInformation={match} />
                    ))}
                </>
            )}
        </>
    );
}

export default MatchHistoryDisplay;
