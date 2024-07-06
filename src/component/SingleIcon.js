import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faInfoCircle, faClock, faSun, faPersonSkiing, faBolt, faGun } from '@fortawesome/free-solid-svg-icons';
import { faFlag, faSkullCrossbones, faDoorOpen, faRepeat, faHourglassEnd, faEquals, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faTrophy, faCalendar, faExchange } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faChessPawn, faChessRook, faChessKnight, faChessBishop, faChessQueen, faChessKing } from '@fortawesome/free-solid-svg-icons';


//
// Styles
//
const Container = styled.div
`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: inherit;
`
;

const StyledIcon = styled(FontAwesomeIcon)`

    font-size: ${props => props.size}px;
    color: ${props => props.color};
    background-color: inherit;
    stroke: black; /* Allows white pawns on white backgrounds to be more visual */
    stroke-width: 10px; 

`
;


const getIcon = (string, color, size) => {
    switch (string) {
        case "daily":
            return <StyledIcon icon={faSun} color={color} size={size} />;
        case "rapid":
            return <StyledIcon icon={faPersonSkiing} color={color} size={size} />;
        case "blitz":
            return <StyledIcon icon={faBolt} color={color} size={size} />;
        case "bullet":
            return <StyledIcon icon={faGun} color={color} size={size} />;
        case "resignation":
            return <StyledIcon icon={faFlag} color={color} size={size} />;
        case "checkmate":
            return <StyledIcon icon={faSkullCrossbones} color={color} size={size} />;
        case "abandoned":
            return <StyledIcon icon={faDoorOpen} color={color} size={size} />;
        case "time":
            return <StyledIcon icon={faHourglassEnd} color={color} size={size} />;
        case "repetition":
            return <StyledIcon icon={faRepeat} color={color} size={size} />;
        case "stalemate":
            return <StyledIcon icon={faEquals} color={color} size={size} />;
        case "material":
            return <StyledIcon icon={faEquals} color={color} size={size} />;
        case "agreement":
            return <StyledIcon icon={faHandshake} color={color} size={size} />;
        case "book":
            return <StyledIcon icon={faBook} color={color} size={size} />;
        case "calendar":
            return <StyledIcon icon={faCalendar} color={color} size={size} />;
        case "copy":
            return <StyledIcon icon={faCopy} color={color} size={size} />;
        case "exchange":
            return <StyledIcon icon={faExchange} color={color} size={size} />;
        case "trophy":
            return <StyledIcon icon={faTrophy} color={color} size={size} />;
        case "pawn":
            return <StyledIcon icon={faChessPawn} color={color} size={size} />;
        case "rook":
            return <StyledIcon icon={faChessRook} color={color} size={size} />;
        case "knight":
            return <StyledIcon icon={faChessKnight} color={color} size={size} />;
        case "bishop":
            return <StyledIcon icon={faChessBishop} color={color} size={size} />;
        case "queen":
            return <StyledIcon icon={faChessQueen} color={color} size={size} />;
        case "king":
            return <StyledIcon icon={faChessKing} color={color} size={size} />;
        default:
            return <StyledIcon icon={faQuestionCircle} color={color} size={size} />;
    }
};

function SingleIcon(props) {
    return (
        <Container>{getIcon(props.icon, props.color, props.size)}</Container>
    );
}

export default SingleIcon;
