//useUniqueMovesDataset

// This hook returns an array to the user, with all the moves that the player did within the last x games


import { useState, useEffect } from 'react';

const useHeatmapControllerDatasetNEW = (hookInput) => {
    const [hookOutput, setHookOutput] = useState([])

    useEffect(() => {
        // Array is the list of parsed Match Objects
        if (!hookInput || hookInput.length === 0) { return };
        runHook();
    }, [hookInput]);

    function runHook() {
        // First, acquire an Array of Objects
        // structure: {firstMove, id, isCapture, piece, result, team, turn}
        const dataLineObjects = createMoveHistoryArray(hookInput)

        // Now we need to group them into white/black, and turn number
        const sortedMoveData = groupByTeamAndFirstMove(dataLineObjects)
        setHookOutput(sortedMoveData);
    };

    //
    // HOOK PART ONE OF TWO - GET DATA LINES
    //
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

        const classifyFirstMove = (firstMove) => {
            if (firstMove === "1.e4") {
                return "1.e4";
            } else if (firstMove === "1.d4") {
                return "1.d4";
            } else {
                return "other";
            }
        };

        matchHistory.forEach((match) => {
            const id = match.general.id; // Match Id
            const userPlayed = match.playerResults.userPlayed; // White or Black depending on what player played for this match
            const userOutcome = match.playerResults.userResult; // Result for the user (win/lose/draw)
            const userMoves = match.playerResults.userMoves; // Array of moves    
            const firstMove = classifyFirstMove(match.moves.first); // Classify the first move

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
                    , "firstMove": firstMove // First move that white played
                };
            
                // Push the dict object into the array
                uniqueMoves.push(dict);
            });

        });
        return uniqueMoves;
    };

    //
    // HOOK PART TWO OF TWO - ORGANIZE DATA LINES
    //

    // I think this is incorrect. This should only be grouped by team, not by the first move
    const groupByTeamAndFirstMove = (moveData) => {

        const results = {
            white: {
                "1.e4": moveData.filter((line) => line.team === "white" && line.firstMove === "1.e4"),
                "1.d4": moveData.filter((line) => line.team === "white" && line.firstMove === "1.d4"),
                "other": moveData.filter((line) => line.team === "white" && line.firstMove === "other")
            },
            black: {
                "1.e4": moveData.filter((line) => line.team === "black" && line.firstMove === "1.e4"),
                "1.d4": moveData.filter((line) => line.team === "black" && line.firstMove === "1.d4"),
                "other": moveData.filter((line) => line.team === "black" && line.firstMove === "other")
            }
        };

        return results
    };   

    return hookOutput;
};

export default useHeatmapControllerDatasetNEW;
