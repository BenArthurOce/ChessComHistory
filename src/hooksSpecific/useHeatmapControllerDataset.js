//useUniqueMovesDataset

// This hook returns an array to the user, with all the moves that the player did within the last x games


import { useState, useEffect } from 'react';

const useHeatmapControllerDataset = (array) => {
    // Array is the list of parsed Match Objects
    const [dataSet, setDataSet] = useState({})

    useEffect(() => {
        if (array.length === 0) {return}
        const sortedMovesArray = createMoveHistoryArray(array)
        setDataSet(sortedMovesArray);
    }, []);

    const createMoveHistoryArray = (matchHistory) => {
        const uniqueMoves = [];
    
        // Helper functions to classify moves
        const classifyMove = (move) => {
            if (move.startsWith("R")) {
                return "Rook";
            } else if (move.startsWith("N")) {
                return "Knight";
            } else if (move.startsWith("B")) {
                return "Bishop";
            } else if (move.startsWith("Q")) {
                return "Queen";
            } else if (move.startsWith("K")) {
                return "King";
            } else if (move.startsWith("O")) {
                return "Castling";
            } else {
                return "Pawn";
            }
        };
    
        const hasCapture = (move) => {
            return move.includes("x");
        };
    
        const hasCheck = (move) => {
            return move.includes("+");
        };

        matchHistory.forEach((match, matchIndex) => {
            const id = match.general.id; // Match Id
            const userPlayed = match.playerResults.userPlayed; // White or Black depending on what player played for this match
            const userOutcome = match.playerResults.userResult; // Result for the user (win/lose/draw)
            const userMoves = match.playerResults.userMoves; // Array of moves
    
            userMoves.forEach((move, moveIndex) => {
                const pieceType = classifyMove(move);
                const isCapture = hasCapture(move);
                const isCheck = hasCheck(move);
                const dict = {
                      "move": move
                    , "turn": moveIndex
                    , "id": id
                    , "team": userPlayed
                    , "result": userOutcome
                    , "piece": pieceType
                    , "isCapture": isCapture
                    , "isCheck": isCheck
                };
            
                // Push the dict object into the array
                uniqueMoves.push(dict);
            });

        });
        return uniqueMoves;
    };

    return dataSet;

};

export default useHeatmapControllerDataset;
