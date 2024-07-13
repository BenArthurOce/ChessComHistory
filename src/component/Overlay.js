import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';
import useIsMobile from '../hooks/useIsMobile';

//
// Styles
//
const Container = styled.div
`
    height: 100%;
    overflow-y: scroll;
`
;

const InnerOne = styled.div
`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    max-width: 800px;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;

    overflow-y: hidden;
`
;

const InnerTwo = styled.div
`
    background: rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 8px;
    position: relative;
    height: 100%;
    overflow-y: auto;
`
;

const CloseButton = styled.button
`
    position: absolute;
    top: 20px; 
    right: 20px;
    cursor: pointer;
    background-color: #ff0000;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    padding: 5px 10px;
    border: 3px solid black;
    border-radius: 5px;
    z-index: 9999;
`
;

const PopupOverlay = (props) => {
    //
    // Props
    //
    const { matchHistory } = props;
    console.log(matchHistory)

    //
    // States
    //
    const [showPopup, setShowPopup] = useState(true);

    //
    // Hooks
    //
    const hookIsMobile = useIsMobile();

    //
    // Effects
    //
    useEffect(() => {
        setShowPopup(true);
    }, [matchHistory]);

    //
    // Handlers
    //
    const handleClose = () => {
        setShowPopup(false);
    };

    return (
        <Container>
            {showPopup && (
                <InnerOne isMobile={hookIsMobile}>
                    <InnerTwo>
                        <CloseButton onClick={handleClose}>×</CloseButton>
                        <MatchHistoryDisplay matchHistory={matchHistory} />
                    </InnerTwo>
                </InnerOne>
            )}
        </Container>
    );
};

export default PopupOverlay;
