import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faInfoCircle, faClock, faChessPawn, faPersonSkiing, faBolt, faGun } from '@fortawesome/free-solid-svg-icons';
import { faFlag, faSkullCrossbones, faDoorOpen, faRepeat, faHourglassEnd, faEquals, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

import Piece from '../board/Piece';

const StyledIcon = styled(FontAwesomeIcon)
`
    margin-right: 10px; 
    font-size: 20px;
`
;

const WhitePawn = styled(FontAwesomeIcon)
`
    margin-right: 10px; 
    font-size: 20px;
    color: white;
    background-color: inherit;
`
;

const BlackPawn = styled(FontAwesomeIcon)
`
    margin-right: 10px; 
    font-size: 20px;
    color: purple;
    background-color: inherit;
`
;



const getIcon = (string) => {
    switch (string) {
        case 'rapid':
            return <StyledIcon icon={faPersonSkiing} />;
        case 'blitz':
            return <StyledIcon icon={faBolt} />;
        case 'bullet':
            return <StyledIcon icon={faGun} />;
        case 'resignation':
            return <StyledIcon icon={faFlag} />;
        case 'checkmate':
            return <StyledIcon icon={faSkullCrossbones} />;
        case 'abandoned':
            return <StyledIcon icon={faDoorOpen} />;
        case 'time':
            return <StyledIcon icon={faHourglassEnd} />;
        case 'repetition':
            return <StyledIcon icon={faRepeat} />;
        case 'stalemate':
            return <StyledIcon icon={faEquals} />;
        case 'material':
            return <StyledIcon icon={faEquals} />;
        case 'agreement':
            return <StyledIcon icon={faHandshake} />;
        case 'book':
            return <StyledIcon icon={faBook} />;
        case 'copy':
            return <StyledIcon icon={faCopy} />;
        case 'whitePawn':
            return <WhitePawn icon={faChessPawn} />;
        case 'blackPawn':
            return <BlackPawn icon={faChessPawn} />;
        default:
            return <StyledIcon icon={faClock} />;
    }
};

function SingleMatchIcon(props) {
    return (
        <div>
            {getIcon(props.icon)}
        </div>
    );
}

export default SingleMatchIcon;
