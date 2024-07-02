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

const Overlay = styled.div
`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;

    padding-left: ${(props) => (props.isMobile ? '0' : '25%')};
    padding-right: ${(props) => (props.isMobile ? '0' : '25%')};
    overflow-y: hidden;
`
;

const Inner = styled.div
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
    position: fixed;
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
`;

const PopupOverlay = (props) => {
    //
    // Props
    //
    const { matchHistory } = props;

    //
    // States
    //
    const [showPopup, setShowPopup] = useState(true);

    //
    // Hooks
    //
    const isMobile = useIsMobile();

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
                <Overlay isMobile={isMobile}>
                    <Inner>
                        <CloseButton onClick={handleClose}>×</CloseButton>
                        <MatchHistoryDisplay matchHistory={matchHistory} />
                    </Inner>
                </Overlay>
            )}
        </Container>
    );
};

export default PopupOverlay;
