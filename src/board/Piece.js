import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBook, faInfoCircle, faClock, faChessPawn, faChessRook, 
    faChessKnight, faChessBishop, faChessQueen, faChessKing 
} from '@fortawesome/free-solid-svg-icons';

const StyledIcon = styled(FontAwesomeIcon)`
    vertical-align: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 1.0rem;

    @media (max-width: 768px) {
        height: 0.5rem;
    }
`
;

const getIcon = (piece) => {
    const pieceMapping = {
        'p': { icon: faChessPawn, color: 'white' },
        'P': { icon: faChessPawn, color: 'black' },
        'r': { icon: faChessRook, color: 'white' },
        'R': { icon: faChessRook, color: 'black' },
        'n': { icon: faChessKnight, color: 'white' },
        'N': { icon: faChessKnight, color: 'black' },
        'b': { icon: faChessBishop, color: 'white' },
        'B': { icon: faChessBishop, color: 'black' },
        'q': { icon: faChessQueen, color: 'white' },
        'Q': { icon: faChessQueen, color: 'black' },
        'k': { icon: faChessKing, color: 'white' },
        'K': { icon: faChessKing, color: 'black' },
    };

    const pieceInfo = pieceMapping[piece];
    if (pieceInfo) {
        return <StyledIcon icon={pieceInfo.icon} color={pieceInfo.color} />;
    } else {
        return <StyledIcon icon={faClock} />;
    }
};

const Piece = ({ piece }) => getIcon(piece);

export default Piece;