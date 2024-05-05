import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faInfoCircle, faClock, faChessPawn, faPersonSkiing, faBolt, faGun, faChessRook, faChessBishop, faChessKnight, faChessQueen, faChessKing } from '@fortawesome/free-solid-svg-icons';
import { faFlag, faSkullCrossbones, faDoorOpen, faRepeat, faHourglassEnd, faEquals, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

// import Piece from '../board/Piece';

const StyledIcon = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
`
;

const WhitePawn = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: white;
    background-color: inherit;
`
;

const BlackPawn = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: black;
    background-color: inherit;
`
;


const WhiteRook = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: white;
    background-color: inherit;
`
;

const BlackRook = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: black;
    background-color: inherit;
`
;

const WhiteKnight = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: white;
    background-color: inherit;
`
;

const BlackKnight = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: black;
    background-color: inherit;
`
;

const WhiteBishop = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: white;
    background-color: inherit;
`
;

const BlackBishop = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: black;
    background-color: inherit;
`
;

const WhiteQueen = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: white;
    background-color: inherit;
`
;

const BlackQueen = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: black;
    background-color: inherit;
`
;

const WhiteKing = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: white;
    background-color: inherit;
`
;

const BlackKing = styled(FontAwesomeIcon)
`
    // margin-right: 10px; 
    font-size: 1.2rem;
    color: black;
    background-color: inherit;
`
;




const getIcon = (string) => {
    switch (string) {
        case 'p':
            return <WhitePawn icon={faChessPawn} />;
        case 'P':
            return <BlackPawn icon={faChessPawn} />;
        case 'r':
            return <WhiteRook icon={faChessRook} />;
        case 'R':
            return <BlackRook icon={faChessRook} />;
        case 'b':
            return <WhiteBishop icon={faChessBishop} />;
        case 'B':
            return <BlackBishop icon={faChessBishop} />;
        case 'n':
            return <WhiteKnight icon={faChessKnight} />;
        case 'N':
            return <BlackKnight icon={faChessKnight} />;
        case 'q':
            return <WhiteQueen icon={faChessQueen} />;
        case 'Q':
            return <BlackQueen icon={faChessQueen} />;
        case 'k':
            return <WhiteKing icon={faChessKing} />;
        case 'K':
            return <BlackKing icon={faChessKing} />;
        default:
            return <StyledIcon icon={faClock} />;
    }
};

function Piece(props) {
    return (
        <div>
            {getIcon(props.piece)}
        </div>
    );
};

export default Piece;
