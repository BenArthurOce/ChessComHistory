import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SingleIcon from "../SingleIcon";
import useParseFEN from "../../hooksSpecific/useParseFEN";

//
// Styles
//
const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
`;

const Square = styled.div`
    flex: 1;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => (props.color === "white" ? '#eeeed2' : '#4e7837')};
`;

const Board = (props) => {

    //
    // Props
    //
    const { fen } = props;

    //
    // States
    //
    const [pieces, setPieces] = useState([]);

    //
    // Hooks
    //
    const hookUseParseFEN = useParseFEN(fen);

    //
    // Effects
    //
    useEffect(() => {
        if (!fen) {
            return;
        }

        const array = hookUseParseFEN.map(row =>
            row.map(piece => translateLetterToPiece(piece))
        );

        setPieces(array);

    }, [fen, hookUseParseFEN]);

    //
    // Helpers
    //
    const translateLetterToPiece = (letter) => {
        if (!letter) return null;
        const pieceMapping = {
              'p': { piece: "pawn", color: 'black' }
            , 'P': { piece: "pawn", color: 'white' }
            , 'r': { piece: "rook", color: 'black' }
            , 'R': { piece: "rook", color: 'white' }
            , 'n': { piece: "knight", color: 'black' }
            , 'N': { piece: "knight", color: 'white' }
            , 'b': { piece: "bishop", color: 'black' }
            , 'B': { piece: "bishop", color: 'white' }
            , 'q': { piece: "queen", color: 'black' }
            , 'Q': { piece: "queen", color: 'white' }
            , 'k': { piece: "king", color: 'black' }
            , 'K': { piece: "king", color: 'white' }
        };
        return pieceMapping[letter];
    };

    return (
        <Container>
            {pieces.map((row, rowIndex) => 
                row.map((piece, colIndex) => (
                    <Square key={`${rowIndex}-${colIndex}`} color={(rowIndex + colIndex) % 2 === 0 ? "white" : "black"}>
                        {piece && <SingleIcon icon={piece.piece} color={piece.color} size={16} />}
                    </Square>
                ))
            )}
        </Container>
    );
};

export default Board;
