import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Square from './Square';

const BoardContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    border: 2px solid black;
`;

const parseFEN = (fen) => {
    const isCapitalized = (char) => /[A-Z]/.test(char);
    const fenParts = fen.split(" ");
    const boardLayout = fenParts[0];
    const rows = boardLayout.split("/");
    const result = [];

    rows.forEach((row) => {
        const newRow = [];
        const splitRow = row.split("");

        splitRow.forEach((char) => {
            if (!isNaN(char)) {
                for (let j = 0; j < parseInt(char, 10); j++) {
                    newRow.push(null);
                }
            } else {
                newRow.push(char);
            }
        });
        result.push(newRow);
    });
    return result;
};

const renderSquares = (board) => {
    return board.map((row, rowIndex) => (
        row.map((piece, colIndex) => (
            <Square 
                key = {`${rowIndex}-${colIndex}`} 
                color =  {(rowIndex + colIndex) % 2 === 0 ? "white" : "black"}
                piece = {piece} 
            >
            </Square>
        ))
    ));
};

const Board = (props) => {
    const [chessBoard, setChessBoard] = useState(() => parseFEN(props.position));

    useEffect(() => {
        setChessBoard(parseFEN(props.position));
    }, [props.position]);

    return (
        <BoardContainer className="chessboard">
            {renderSquares(chessBoard)}
        </BoardContainer>
    );
};

export default Board;
