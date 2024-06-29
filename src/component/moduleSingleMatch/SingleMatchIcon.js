import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faInfoCircle, faClock, faChessPawn, faPersonSkiing, faBolt, faGun } from '@fortawesome/free-solid-svg-icons';
import { faFlag, faSkullCrossbones, faDoorOpen, faRepeat, faHourglassEnd, faEquals, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';


// Styled components
const Container = styled.div
`
    // margin-right: 10px; 
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center; /* Center the icon */
    background-color: inherit;
`
;




const StyledIcon = styled(FontAwesomeIcon)`

    // font-size: 30px;
    color: ${props => props.color};
    font-size: ${props => props.size}px; /* Adjust font size based on size prop */

`;


const WhitePawn = styled(FontAwesomeIcon)`

    font-size: ${props => props.size}px; /* Adjust font size based on size prop */
    color: #ffffff;
    background-color: inherit;
    stroke: black; /* Allows white pawns on white backgrounds to be more visual */
    stroke-width: 10px; 
    
`;

const BlackPawn = styled(FontAwesomeIcon)`
    font-size: ${props => props.size}px; /* Adjust font size based on size prop */
    color: black;
    background-color: inherit;
`;

const getIcon = (string, color, size) => {
    switch (string) {
        case 'rapid':
            return <StyledIcon icon={faPersonSkiing} color={color} size={size} />;
        case 'blitz':
            return <StyledIcon icon={faBolt} color={color} size={size} />;
        case 'bullet':
            return <StyledIcon icon={faGun} color={color} size={size} />;
        case 'resignation':
            return <StyledIcon icon={faFlag} color={color} size={size} />;
        case 'checkmate':
            return <StyledIcon icon={faSkullCrossbones} color={color} size={size} />;
        case 'abandoned':
            return <StyledIcon icon={faDoorOpen} color={color} size={size} />;
        case 'time':
            return <StyledIcon icon={faHourglassEnd} color={color} size={size} />;
        case 'repetition':
            return <StyledIcon icon={faRepeat} color={color} size={size} />;
        case 'stalemate':
            return <StyledIcon icon={faEquals} color={color} size={size} />;
        case 'material':
            return <StyledIcon icon={faEquals} color={color} size={size} />;
        case 'agreement':
            return <StyledIcon icon={faHandshake} color={color} size={size} />;
        case 'book':
            return <StyledIcon icon={faBook} color={color} size={size} />;
        case 'copy':
            return <StyledIcon icon={faCopy} color={color} size={size} />;
        case 'whitePawn':
            return <WhitePawn icon={faChessPawn} color={color} size={size} />;
        case 'blackPawn':
            return <BlackPawn icon={faChessPawn} color={color} size={size} />;
        case 'trophy':
            return <StyledIcon icon={faTrophy} color={color} size={size} />;
        default:
            return <StyledIcon icon={faQuestionCircle} color={color} size={size} />;
    }
};

function SingleMatchIcon(props) {
    return (
        <Container>
            {getIcon(props.icon, props.color, props.size)}
        </Container>
    );
}


export default SingleMatchIcon;

