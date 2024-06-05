import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faInfoCircle, faClock, faChessPawn, faPersonSkiing, faBolt, faGun } from '@fortawesome/free-solid-svg-icons';
import { faFlag, faSkullCrossbones, faDoorOpen, faRepeat, faHourglassEnd, faEquals, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';


// Styled components
const Container = styled.div
`
    margin-right: 10px; 
    display: flex;
    align-items: center;
    justify-content: center;
`
;




const StyledIcon = styled(FontAwesomeIcon)`

    font-size: 30px;
    // height: 2em
`;


const WhitePawn = styled(FontAwesomeIcon)`

    font-size: 30px;
    color: #ffffff;
    background-color: inherit;
    
`;

const BlackPawn = styled(FontAwesomeIcon)`
    font-size: 30px;
    color: black;
    background-color: inherit;
`;

const getIcon = (string, color) => {
    switch (string) {
        case 'rapid':
            return <StyledIcon icon={faPersonSkiing} color={color} />;
        case 'blitz':
            return <StyledIcon icon={faBolt} color={color} />;
        case 'bullet':
            return <StyledIcon icon={faGun} color={color} />;
        case 'resignation':
            return <StyledIcon icon={faFlag} color={color} />;
        case 'checkmate':
            return <StyledIcon icon={faSkullCrossbones} color={color} />;
        case 'abandoned':
            return <StyledIcon icon={faDoorOpen} color={color} />;
        case 'time':
            return <StyledIcon icon={faHourglassEnd} color={color} />;
        case 'repetition':
            return <StyledIcon icon={faRepeat} color={color} />;
        case 'stalemate':
            return <StyledIcon icon={faEquals} color={color} />;
        case 'material':
            return <StyledIcon icon={faEquals} color={color} />;
        case 'agreement':
            return <StyledIcon icon={faHandshake} color={color} />;
        case 'book':
            return <StyledIcon icon={faBook} color={color} />;
        case 'copy':
            return <StyledIcon icon={faCopy} color={color} />;
        case 'whitePawn':
            return <WhitePawn icon={faChessPawn} color={color} />;
        case 'blackPawn':
            return <BlackPawn icon={faChessPawn} color={color} />;
        default:
            return <StyledIcon icon={faClock} color={color} />;
    }
};

function SingleMatchIcon(props) {
    return (
        <Container>
            {getIcon(props.icon, props.color)}
        </Container>
    );
}


export default SingleMatchIcon;

