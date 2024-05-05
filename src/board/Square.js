import React from 'react';
import styled from 'styled-components';
import Piece from './Piece';

const SquareContainer = styled.div`
    flex: 1;
    aspect-ratio: 1;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) =>
        props.color === "black" ? "#8b6c5c" : "#3d251e"};
`;

function Square( props ) {
    return (
        <SquareContainer color={props.color}>
            {props.piece && <Piece piece={props.piece} />}
        </SquareContainer>
    );
};

export default Square;