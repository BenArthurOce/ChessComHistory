import { useState, useEffect } from 'react';

const useHeatMasterData = (hookInput) => {
    const [hookOutput, setHookOutput] = useState([])

    useEffect(() => {
        // Array is the list of parsed Match Objects
        if (!hookInput || hookInput.length === 0) { return};
        runHook();
    }, [hookInput]);

    function runHook() {
        // First, acquire an Array of Objects
        // structure: {firstMove, id, isCapture, piece, result, team, turn}
        const dataLineObjects = createMoveHistoryArray(hookInput)

        // Now we need to group them into white/black, and turn number, AND unique move
        const sortedMoveData = groupDataByFirstMoveAndTurn(dataLineObjects)
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
    const groupDataByFirstMoveAndTurn = (moveData) => {

        const getTurnNumberArray = (moveData) => {
            const turnNumbers = (moveData.map((line) => line.turn)).sort()
            return new Set(turnNumbers)
        };

        const filterByTurnNum = (array, turnNum) => {
            return array.filter((line) => line.turn === turnNum);
        };

        const filterByMove = (array, move) => {
            return array.filter((line) => line.move === move);
        };

        const filterByFirstMove = (array, firstMove) => {
            return array.filter((line) => line.firstMove === firstMove);
        };

        const getUniqueMoveArray = (moveData) => {
            const allMoves = (moveData.map((line) => line.move)).sort()
            return new Set(allMoves)
        };

        // This is what is going to the hook output
        const results = {"white": {}, "black": {}}

        // The type of moves to categorize:
        const firstMoves = ["1.e4", "1.d4", "other"]

        // Separate the entire data into black moves and white moves
        const whiteGames = moveData.filter((line) => line.team === "white");
        const blackGames = moveData.filter((line) => line.team === "black");

        firstMoves.forEach(firstMove => {
            const whiteMovesByFirst = filterByFirstMove(whiteGames, firstMove);
            const blackMovesByFirst = filterByFirstMove(blackGames, firstMove);

            const categorizedWhiteMoves = {};
            const categorizedBlackMoves = {};

            // We're going to loop through each turn number, so get every turn number in numerical order
            const turnNumberSet = getTurnNumberArray(moveData);

            // Loop through each turn number
            turnNumberSet.forEach(turnNumber => {
                // Get moves player performed on that turn
                const whiteResultOnTurn = filterByTurnNum(whiteMovesByFirst, turnNumber);
                const blackResultOnTurn = filterByTurnNum(blackMovesByFirst, turnNumber);

                // Get array of unique moves that player performed on that turn
                const whiteUniqueMovesOnTurn = getUniqueMoveArray(whiteResultOnTurn);
                const blackUniqueMovesOnTurn = getUniqueMoveArray(blackResultOnTurn);

                // For white, loop through each unique move, get its data lines and add it to an object
                const eachMoveWhite = {};
                whiteUniqueMovesOnTurn.forEach(move => {
                    eachMoveWhite[`${move}`] = filterByMove(whiteResultOnTurn, move);
                });

                // For black, loop through each unique move, get its data lines and add it to an object
                const eachMoveBlack = {};
                blackUniqueMovesOnTurn.forEach(move => {
                    eachMoveBlack[`${move}`] = filterByMove(blackResultOnTurn, move);
                });

                // Add these to the categorized results
                categorizedWhiteMoves[turnNumber] = eachMoveWhite;
                categorizedBlackMoves[turnNumber] = eachMoveBlack;
            });

            // Add these to the final Object
            results["white"][firstMove] = categorizedWhiteMoves;
            results["black"][firstMove] = categorizedBlackMoves;
        });

        return results
    };

    return hookOutput;
};

export default useHeatMasterData;
