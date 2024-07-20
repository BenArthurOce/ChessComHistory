import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Container, Title } from "../styles3";

// Components
import SingleMatchPC from './SingleMatchPC';
import SingleMatchMobile from './SingleMatchMobile';

// Custom Hooks
import useIsMobile from '../../hooks/useIsMobile';


const MatchHistoryDisplay = (props) => {

    //
    // Props
    //
    const matchHistory = props.matchHistory

    //
    // States
    //
    const [matchesToRender, setMatchesToRender] = useState(0)

    //
    // Hooks
    //
    const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device
   
    //
    // Effects
    //
    useEffect(() => {
        setMatchesToRender(30) 
    }, [matchHistory]);


    return (
        <Container>
            <Title>Match History</Title>
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
        </Container>
    );
}

export default MatchHistoryDisplay;
