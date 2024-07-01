import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MatchHistoryDisplay from './moduleMatchHistoryDisplay/MatchHistoryDisplay';

const Overlay = styled.div
`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);     /* Sets transparent background */
    z-index: 9999;                      /* Must be most front facing forward since its an overlay */ 
    padding: 5px;
`
;

const Inner = styled.div
`
    background: rgba(0, 0, 0, 0.7);     /* Sets transparent background */
    padding: 5px;
    border-radius: 8px;
    position: relative;                 /* Allows the close button to be positioned inside this element */
    width: 100%;
`
;

const CloseButton = styled.button
`
    position: absolute;             /* Position the close button relative to its closest positioned ancestor */
    top: 2px;                       /* Position it in the top-right corner */
    right: 2px;                     /* Position it in the top-right corner */
    cursor: pointer;
    background-color: #ff0000;       /* Red background color */
    color: #fff;                     /* White text color */
    font-size: 20px;
    font-weight: bold;
    padding: 2px 5px;
    border: 3px solid black;
    border-radius: 5px;
    z-index: 9999;                   /* Ensure it's above other elements */
`
;

const PopupOverlay = ({ matchHistory }) => {
    const [showPopup, setShowPopup] = useState(true);

    const handleClose = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        setShowPopup(true);
    }, [matchHistory]);

    return (
        <>
            {showPopup && (
                <Overlay>
                    <Inner>
                        <CloseButton onClick={handleClose}>×</CloseButton>
                        <MatchHistoryDisplay matchHistory={matchHistory} />
                    </Inner>
                </Overlay>
            )}
        </>
    );
};

export default PopupOverlay;