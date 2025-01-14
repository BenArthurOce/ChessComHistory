import StaticChessUtility from './StaticChessUtility.js';
import StaticErrorCheck from './StaticErrorCheck.js';
import {Piece, Pawn, Rook, Knight, Bishop, Queen, King} from "./Piece.js";

class StaticGameLogic {

    // filterBoardByAttribute(code, attributeName, attributeValue) {
    //     const array = this.grid.map(row =>
    //         row.map(square => (square.piece instanceof Piece ? square.piece : null))
    //     ).flat();
    //     return array
    //         .filter(piece => piece && piece.pieceCodeStr === code)
    //         .filter(piece => piece[attributeName] === attributeValue);
    // };

    static filterPieces(board, team, letter) {
        const pieceCode = `${team}${letter}`;
        const array = board.grid.map(row =>
            row.map(square => (square.piece instanceof Piece ? square.piece : null))
        ).flat();
        return array
            .filter(piece => piece && piece.code === pieceCode)
    };



    /**
     * Samples a chess piece and its desired location. 
     * 
     * @param {object} moveInfo Object Key/Value pair regarding the information about a single move
     * @param {Piece} moveInfo The Piece() object that is tested to see if legal move or not
     * @returns {boolean} Returns boolean true if the piece can move to that square.
     * @throws {Error} If the moveInfo or the Piece() object are missing
     */
    static isLegal(piece, moveInfo) {
      
        // Guarding Clause(s)
        if (!piece || !moveInfo) {
            throw new Error(`File: [StaticGameLogic.js] Function: [isLegal]: ${piece} ${moveInfo} was not found.`);
        };

        const letter = moveInfo["pieceCode"];
    
        switch (letter) {
            // Rook
            case "R":
                // Special Case: If player does troll rook move early game
                if (parseInt(moveInfo["turnNumber"]) <= 7) 
                    
                    // 
                    {
                    if (piece["positionArr"][1] === moveInfo["targetArr"][1]) {return true};
                    if (piece["positionArr"][0] === moveInfo["targetArr"][0]) {return true};
                };


                // Check if any of the location row/column has been defined
                if (piece["positionArr"][0] === moveInfo["specialArr"][0]) return true;
                if (piece["positionArr"][1] === moveInfo["specialArr"][1]) return true;

                // Straight line - If the row or column is the same, consider it true
                if (piece["positionArr"][0] === moveInfo["targetArr"][0]) return true;
                if (piece["positionArr"][1] === moveInfo["targetArr"][1]) return true;
                return false;
    
            // Knight
            case "N":

                // If the Notation references a Knight position, use that piece. Otherwise its not that piece
                if (moveInfo["specialArr"][0] !== undefined || moveInfo["specialArr"][1] !== undefined) {
                    return (moveInfo["specialArr"][0] === piece["positionArr"][0]   ||   moveInfo["specialArr"][1] === piece["positionArr"][1] )
                };

                // L Shape - Two squares in one direction and then one square perpendicular or one square in one direction and then two squares perpendicular.
                if (Math.abs(piece["positionArr"][0] - moveInfo["targetArr"][0]) === 2 && Math.abs(piece["positionArr"][1] - moveInfo["targetArr"][1]) === 1) return true;
                if (Math.abs(piece["positionArr"][0] - moveInfo["targetArr"][0]) === 1 && Math.abs(piece["positionArr"][1] - moveInfo["targetArr"][1]) === 2) return true;

                return false;
    
            // Bishop
            case "B":
                // Diagonal - The number of rows moved must equal the number of columns moved
                if (Math.abs(piece["positionArr"][0] - moveInfo["targetArr"][0]) === Math.abs(piece["positionArr"][1] - moveInfo["targetArr"][1])) return true;
                return false;
    
            // Queen
            case "Q":
                // Check for any other Queen belonging to same team
                if (piece["positionArr"][0] === moveInfo["targetArr"][0]) return true;
                if (piece["positionArr"][1] === moveInfo["targetArr"][1]) return true;
                // Queen can move in Straight Line
                if (Math.abs(piece["positionArr"][0] - moveInfo["targetArr"][0]) === Math.abs(piece["positionArr"][1] - moveInfo["targetArr"][1])) return true;
                return false;
    
            // King
            case "K":
                // Can only be 1 king per side. If it moves within one square, its legal (not counting for checks)
                if (Math.abs(piece["positionArr"][0] - moveInfo["targetArr"][0]) <= 1 && Math.abs(piece["positionArr"][1] - moveInfo["targetArr"][1]) <= 1) return true;
                return false;
    
            // Pawn
            case "p":
                const positionArr = piece["positionArr"];
                const targetArr = moveInfo["targetArr"];
                const specialArr = moveInfo["specialArr"];
    
                // If its a capture, there will be a location number, match that
                // fuck. What if two pawns are on the same file
                if (moveInfo.isCapture) {
                    if (specialArr[1] === positionArr[1]) return true;
                } else {
                    if (Math.abs(positionArr[0] - targetArr[0]) === 1 && Math.abs(positionArr[1] - targetArr[1]) === 0) return true;
                    if (Math.abs(positionArr[0] - targetArr[0]) === 2 && Math.abs(positionArr[1] - targetArr[1]) === 0) return true;
                }
                return false;
    
            default:
                return false;
        }
    }
    

    /**
     * Loops through all the move instructions found in the Parser() object, and calls "processPlayerMove" on each move instruction
     *
     * @throws {Error} If move instructions for both black and white are non existent for that turn number
     */
    static processAllMoves(boardState, parserObject) {

        for (const [turnNum, [whiteMoveInfo, blackMoveInfo]] of Object.entries(parserObject)) {
            // console.log(whiteMoveInfo)
            // console.log(blackMoveInfo)
            if (whiteMoveInfo) {
                // console.log("WhiteMove")
                StaticGameLogic.processPlayerMove(boardState, 0, whiteMoveInfo);
                
            }
            if (blackMoveInfo) {
                // console.log("BlackMove")
                StaticGameLogic.processPlayerMove(boardState, 1, blackMoveInfo);
            }
            if (!whiteMoveInfo && !blackMoveInfo) {
                throw new Error(`File: [StaticGameLogic.js] Function: [processAllMoves]: a move on turn ${turnNum} was not found.`);
            }
        }

        boardState.printToTerminal()
    };


    /**
     * Process a player's move based on the provided moveInfo.
     *
     * @param {string} teamNum Team Number. 0 = White, 1 = Black
     * @param {object} moveInfo Object Key/Value pair regarding the information about a single move
     * @throws {Error} @throws {Error} If moveInfo is null, not an object, a piece is not found, or an error occurs during the move.
     */
    static processPlayerMove(boardState, teamNum, moveInfo) {

        // console.log(moveInfo)
        // console.log(boardState, teamNum, moveInfo)
        let filtered = StaticGameLogic.filterPieces(boardState, teamNum, moveInfo.pieceCode)
        // console.log(filtered)

        let foundPiece = null
        foundPiece = filtered.find(piece => StaticGameLogic.isLegal(piece, moveInfo));

        // console.log(foundPiece)

            // Check if the moveInfo object contains move information
            if (!moveInfo || typeof moveInfo !== 'object') {
                throw new Error(`File: [StaticGameLogic.js] File: [processPlayerMove] : moveInfo is null`);
            }

            // If there was a castling move, perform it and then leave the function
            if (moveInfo.castlingSide) {
                boardState.performCastling(teamNum, moveInfo.castlingSide);
                // //console.log("Castling Command is Required")
                return;
            }

        if (!foundPiece) {
            console.log(moveInfo)
            boardState.printToTerminal();
            throw new Error(`File: [StaticGameLogic.js] Function: [processPlayerMove]: Piece not found || Turn: ${moveInfo.turnNumber} | MoveNum: ${moveInfo.teamNumber} | Notation: ${moveInfo.notation}`);
        }

        boardState.movePiece(foundPiece, moveInfo.targetSquare);

        return



        // let found = false;
        // while (found === false) {

        //     found = StaticGameLogic.isLegal(pawn, moveInfo)
        // }




        // if (moveInfo.pieceCode === "p") {

        //     const allPawns = StaticGameLogic.filterPieces(boardState, teamNum, "p")
        //     // //console.log(moveInfo.turnNumber)
        //     // //console.log(allPawns)

        //     allPawns.forEach(pawn => {
        //         //console.log(pawn)
        //         const isLegal = StaticGameLogic.isLegal(pawn, moveInfo)
        //         //console.log(isLegal)
        //     });

            



        // }



            // Check if the moveInfo object contains move information
            if (!moveInfo || typeof moveInfo !== 'object') {
                throw new Error('processPlayerMove: moveInfo is null');
            }

            // If there was a castling move, perform it and then leave the function
            if (moveInfo.castlingSide) {
                boardState.performCastling(teamNum, moveInfo.castlingSide);
                // //console.log("Castling Command is Required")
                return;
            }

            // Find the location of the piece as a 2 character string. If nothing found, return an error
            const pieceLocated = StaticGameLogic.findLocation(boardState, teamNum, moveInfo);
            if (!pieceLocated) {
                throw new Error(`Piece not found || Turn: ${moveInfo.turnNumber} | MoveNum: ${moveInfo.teamNumber} | Notation: ${moveInfo.notation}`);
            }

            // Using "pieceLocated" and the move instructions, run the command to update the location of the Piece() object
            boardState.movePiece(pieceLocated, moveInfo.targetSquare);
    };


    /**
     * Finds the location of a chess piece based on the data within the "moveInfo" variable
     *
     * @param {object} moveInfo Object Key/Value pair regarding the information about a single move
     * @returns {Piece|null} The Piece() object that needs to be moved according to the moveInfo variable.
     * @throws {Error} If there is an issue with finding the piece or if it's not a valid chess piece.
     */
    static findLocation(boardState, teamNum, moveInfo) {




        // //console.log(moveInfo)
        let foundPiece = null   // If this remains null, an error will be triggered

        // Check that the code letter represents an actual Piece() object
        const searchItem = StaticChessUtility.codeToPieceObject(moveInfo.pieceCode);
        if (!searchItem) {
            // throw new Error(`Piece not found for letter: ${moveInfo.pieceCode}`, StaticLogic.parser.printToTerminal(moveInfo));
        };

        // Get a list of all the Piece() objects that match the team number, and its single character code letter (ie: K, Q, R, p)
        const possiblePieces = boardState.filterBoardByAttribute(moveInfo.pieceCode, 'team', moveInfo.teamNumber);

        // Loop through the Piece() objects and find their valid moves.
        // Determine if the valid moves for a single Piece() object matches the destination in the moveInfo variable
        foundPiece = possiblePieces.find(piece => piece.isValidMove(moveInfo.targetArr, moveInfo));

        // If no Piece() object that could move to the destination square was found, return an error
        if (!foundPiece) {
            moveInfo.printToTerminal()
            boardState.printToTerminal()

            throw new Error(`[Gamelogic - findLocation]  Piece not found || Turn: ${moveInfo.turnNumber} | TeamNum: ${moveInfo.teamNumber} | Notation: ${moveInfo.notation}`);
            
        }
        return foundPiece;
    };


    handleError(error, moveInfo) {
        console.error('Error:', error.message);
        console.error('Move Instruction Details:', moveInfo.printToTerminal());
        // console.error('Game Board Details:', this.gameBoard.printToTerminal());
        throw error;
    };
};

export default StaticGameLogic;