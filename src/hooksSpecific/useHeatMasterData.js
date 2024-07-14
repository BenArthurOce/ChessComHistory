
import { useState, useEffect } from 'react';

const useHeatMasterData = (hookInput) => {
    const [hookOutput, setHookOutput] = useState([])

    useEffect(() => {
        // Array is the list of parsed Match Objects
        if (!hookInput || hookInput.length === 0) { return};
        runHook();
    }, [hookInput]);


    function runHook() {
        // First, aquire an Array of Objects
        // structure: {firstmove, id, iscapture, piece, result, team, turn}
        const dataLineObjects = createMoveHistoryArray(hookInput)

        // Now we need to group them into white/black, and turn number, AND unique move
        const sortedMoveData = groupDataByTeamAndTurn(dataLineObjects)
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
                    , "firstMove": match.moves.first        // First move that white played
                };
            
                // Push the dict object into the array
                uniqueMoves.push(dict);
            });

        });
        return uniqueMoves;
    };




    //
    // HOOK PART ONE OF TWO - ORGANIZE DATA LINES
    //
    const groupDataByTeamAndTurn = (moveData) => {

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

        const getUniqueMoveArray = (moveData) => {
            const allMoves = (moveData.map((line) => line.move)).sort()
            return new Set(allMoves)
        };

        // This is what is going to the hook output
        const results = {"white": {}, "black": {}}

        // We're going to loop through each turn number, so get every turn number in numerical order
        const turnNumberSet = getTurnNumberArray(moveData)

        // Seperate the entire data into black moves and white moves
        const whiteGames = moveData.filter((line) => line.team === "white");
        const blackGames = moveData.filter((line) => line.team === "black");

        /*     
        We want an object that looks like this:
            {"white":
                {
                    1: {a4:[], e4:[], Nc3:[]} 2: {e5:[], d4:[], Nf2:[]}, 3: {etc}
                }

            ,"black":
                {
                    1: {a5:[], e5:[], Nf6:[]} 2: {Bd5:[], d3:[], Qe7:[]}, 3: {etc}
                }
            }
        This is sorted data, by player colour, by turn, by unique move for that particular turn

        
        To achieve this, we:
            Loop through each turn number
            Get all the white/black moves that happened on that particular turn number
            We look at the moves for each turn, and extract all the types of moves for that turn
            We further filter by this. And then combine all the above information to make an Object entry for that turn number
        */


        turnNumberSet.forEach(turnNumber => {

            // Get moves player performed on that turn
            const whiteResultOnTurn = filterByTurnNum(whiteGames, turnNumber)
            const blackResultOnTurn = filterByTurnNum(blackGames, turnNumber)

            // Get array of unique moves that player performed on that turn
            const whiteUniqueMovesOnTurn = getUniqueMoveArray(whiteResultOnTurn)
            const blackUniqueMovesOnTurn = getUniqueMoveArray(blackResultOnTurn)

            // For white, loop through each unique move, get its data lines and add it to an object
            const eachMoveWhite = {}
            whiteUniqueMovesOnTurn.forEach(move => {
                eachMoveWhite[`${move}`] = filterByMove(whiteResultOnTurn, move);
            });

            // For black, loop through each unique move, get its data lines and add it to an object
            const eachMoveBlack = {}
            blackUniqueMovesOnTurn.forEach(move => {
                eachMoveBlack[`${move}`] = filterByMove(blackResultOnTurn, move);
            });

            // Add these to the final Object and then loop for the next turn number
            results["white"][turnNumber] = eachMoveWhite
            results["black"][turnNumber] = eachMoveBlack
        });

        return results
    };

    return hookOutput;
};

export default useHeatMasterData;
