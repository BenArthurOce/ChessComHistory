// import { Square, Square, SquareHTML } from './Square.js';
import Square from './Square.js';

import {
    Piece, Pawn, Rook, Knight, Bishop, Queen, King
} from "./Piece.js";

class StaticErrorCheck {

    /**
     * Handles an error by throwing it.
     *
     * @param {string} errorMessage - The error message to be thrown.
     * @throws {Error} Always throws an error with the specified message.
     * @private
     */
    static handleError(errorMessage) {
        throw new Error(errorMessage);
    };


    /**
     * Checks if the Game object has a PGN to send to the Parser.
     *
     * @param {string} pgn The PGN string
     * @param {string} fromClass the class where the error check was invoked
     * @param {string} fromFunction the function where the error check was invoked
     * @throws {Error} If the PGN string is null or undefined
     */
    static validatePGNExistence(pgn, fromClass, fromFunction) {
        if (!pgn) {
            const errorMsg = `[StaticErrorCheck] [validatePGNExistence] [${fromClass}] [${fromFunction}] : No PGN found`
            console.error(errorMsg)
            StaticErrorCheck.handleError(errorMsg);
        };
    };


    /**
     * Checks if the Board object exists
     *
     * @param {string} board The Board object
     * @throws {Error} If the Board object is null or undefined
     */
    static validateBoardExistence(board) {
        if (!board) {
            const errorMsg = `[StaticErrorCheck] [validateBoardExistence] the board object is null`
            console.error(errorMsg)
            StaticErrorCheck.handleError(errorMsg);
        }
    };


    /**
     * Checks if the Parser object exists
     *
     * @param {string} parser The Parser object
     * @throws {Error} If the Parser object is null or undefined
     */
    static validateParserExistence(parser) {
        if (!parser) {
            const errorMsg = `[StaticErrorCheck] [validateParserExistence] the Parser object is null.`
            console.error(errorMsg)
            StaticErrorCheck.handleError(errorMsg);
        };
    };


    /**
     * Checks if the Game object's Board object has populated pieces 
     *
     * @param {Object} game The Game object
     * @throws {Error} If the Game.Board.grid object is empty or not an array
     */
    static checkIfBoardIsPopulated(game) {
        if (!game || !game.board || !Array.isArray(game.board.grid) || game.board.grid.length === 0) {
            const errorMsg = `[StaticErrorCheck] [checkIfBoardIsPopulated] Game.board.grid is empty or not properly populated`
            console.error(errorMsg)
            StaticErrorCheck.handleError(errorMsg);
        };
    };


    /**
     * Checks if the "openings" object has all the required keys.
     *
     * @param {Object} openings The object to validate
     * @throws {Error} If any required key is missing or if the object is null/undefined
     */
    static validateOpeningObjectFEN(openings) {
        const requiredKeys = [
            'ID', 'FEN', 'ECO', 'VOLUME', 'NAME', 'PGN', 
            , 'NUMMOVES', 'NEXTTOMOVE', 'FAMILY'
        ];
        
        if (!openings || typeof openings !== 'object') {
            throw new Error("[StaticErrorCheck] [validateOpeningObjectFEN] The provided openings object is not a valid object.");
        }

        requiredKeys.forEach(key => {
            if (!openings.hasOwnProperty(key)) {
                throw new Error(`[StaticErrorCheck] [validateOpeningObjectFEN] Missing required key: ${key}`);
            }
        });
    };



    /**
     * Checks if the "openings" object has all the required keys.
     *
     * @param {Object} openings The object to validate
     * @throws {Error} If any required key is missing or if the object is null/undefined
     */
    static validateOpeningObjectLogic(openings) {
        const requiredKeys = [
            'ID', 'ECO', 'VOLUME', 'NAME', 'PGN', 
            , 'NUMMOVES', 'NEXTTOMOVE', 'FAMILY'
        ];
        
        if (!openings || typeof openings !== 'object') {
            throw new Error("[StaticErrorCheck] [validateOpeningObjectLogic] The provided openings object is not a valid object.");
        }

        requiredKeys.forEach(key => {
            if (!openings.hasOwnProperty(key)) {
                throw new Error(`[StaticErrorCheck] [validateOpeningObjectLogic] Missing required key: ${key}`);
            }
        });
    };


    /**
     * Checks if team number is correct (Must be a 0 or a 1).
     *
     * @param {number} teamNum The team number. White = 0, Black = 1
     * @throws {Error} If the team number passed does not equal a 0 or a 1
     */
    static validateTeamNumber(teamNum) {
        if (teamNum !== 0 && teamNum !== 1) {
            const errorMsg = `[StaticErrorCheck] [validateTeamNumber] Supplied teamNum of ${teamNum} is invalid.`
            console.error(errorMsg)
            StaticErrorCheck.handleError(errorMsg);
        };
    };


    /**
     * Checks if the castling command is correct (Must be "Kingside" or "Queenside").
     *
     * @param {string} castlingName The string to be checked. Must be "Kingside" or "Queenside"
     * @throws {Error} If the string passed is not either "Kingside" or "Queenside"
     */
    static validateCastlingCommand(castlingName) {
        if (!castlingName === "Kingside" && !castlingName === "Queenside") {
            const errorMsg = `[StaticErrorCheck] [validateCastlingCommand] Supplied castlingName of ${castlingName} is invalid.`
            console.error(errorMsg)
            StaticErrorCheck.handleError(errorMsg);
        };

        // Maybe add more code to validate piece locations?
    };


    /**
     * Checks if a 2 character string is a valid chess position
     *
     * @param {string} position The string position reference of the square ie: "a5".
     * @throws {Error} If the string provided is not a valid chessboard position
     */
    static validateCellRef(position) {
        if (typeof position !== 'string' || position.length !== 2) {
            StaticErrorCheck.handleError('[StaticErrorCheck] [validateCellRef] Invalid input format for position.');
        }

        const [file, rank] = position;
        const validFiles = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const validRanks = ['1', '2', '3', '4', '5', '6', '7', '8'];

        if (!validFiles.includes(file) || !validRanks.includes(rank)) {
            StaticErrorCheck.handleError('[StaticErrorCheck] [validateCellRef] Invalid chess position.');
        }
    };


    /**
     * Checks if a 2-element array represents a valid chess position.
     *
     * @param {number[]} array The 2-element array position [col, row].
     * @throws {Error} If the array does not represent a valid chess position.
     */
    static validateArray(array) {
        const [col, row] = array;
        const isValidCol = col >= 0 && col <= 7;
        const isValidRow = row >= 0 && row <= 7;

        if (!(isValidCol && isValidRow)) {
            const errorMsg = '[StaticErrorCheck] [validateArray] Invalid chess position in array.'
            console.error(errorMsg)
            StaticErrorCheck.handleError(errorMsg);
        }
    };
    

    /**
     * Checks if a Square() object contains a Piece().
     *
     * @param {Square} square The Square() object to validate.
     * @throws {Error} If the Square() does not contain a valid chess piece.
     */
    static validateSquareContainPiece(square) {
        if (!(square instanceof Square && square.piece)) {
            const errorMsg = '[StaticErrorCheck] [validateSquareContainPiece] Invalid Square object or does not contain a valid chess piece.'
            console.error(errorMsg)
            StaticErrorCheck.handleError(errorMsg);
        }
    };


    /**
     * Validates if the contents of a square match a specific chess piece class.
     *
     * @param {Square} squareObj The Square() object to be checked
     * @param {Class} whatClass The required Piece() object that the Square() object needs to contain
     * @throws {Error} If the contents of the Square() object do not match the specified class.
     */
    static validateContents(squareObj, whatClass) {

        if (!(squareObj && squareObj.piece instanceof whatClass)) {
            const errorMsg = `[StaticErrorCheck] [validateContents] Contents of square ${squareObj.positionRef} are not an instance of ${whatClass.name}`
            console.error(errorMsg)
            StaticErrorCheck.handleError(errorMsg);
        };
    };


    /**
     * Checks if a variable is a valid ChessPiece object.
     *
     * @param {Piece} piece The Piece() object to validate.
     * @throws {Error} If the parameter is not a valid Piece() object.
     */
    static validateIsChessPiece(piece) {
        if (!(piece instanceof Piece)) {
            const errorMsg = '[StaticErrorCheck] [validateIsChessPiece] Invalid chess piece object.'
            console.error(errorMsg)
            StaticErrorCheck.handleError(errorMsg);
        }
    };

    /**
     * After reviewing a Parser() move object and Board() for a Piece() that can move, check that at least 1 piece can be moved
     *
     * @param {Array} array The array that contains the Piece() object(s)
     * @throws {Error} If the array parameter is empty
     */

    static checkPiecesFoundArray(array) {
        if (array.length === 0) {
            const errorMsg = '[StaticErrorCheck] [checkPiecesFoundArray] Piece to move not found'
            console.error(errorMsg)
            StaticErrorCheck.handleError(errorMsg);
        }
        // old error that used to exist in game object. Might need to bring in move and board parameters
        // throw new Error(`File: [Game.js] Function: [invokeGame]: Piece not found || Turn: ${whiteMoveInfo.turnNumber} | MoveNum: ${whiteMoveInfo.teamNumber} | Notation: ${whiteMoveInfo.notation}`);
    };


    static validateMoveObject(moveObject) {
        if (typeof moveObject.teamNumber !== 'boolean') {
            throw new Error("[StaticErrorCheck] [validateMoveObject] Invalid team number type. It must be a boolean value.");
        }
    
        if (!(moveObject.teamNumber === false || moveObject.teamNumber === true)) {
            throw new Error("[StaticErrorCheck] [validateMoveObject] Invalid team number value. It must be either false or true.");
        }
    
        if (!(moveObject.notation.length > 0)) {
            throw new Error("[StaticErrorCheck] [validateMoveObject] Invalid notation. It must have a length greater than 0.");
        }
    
        if (!(moveObject.turnNumber > 0)) {
            throw new Error("[StaticErrorCheck] [validateMoveObject] Invalid turn number. It must be greater than 0.");
        }
    
        if (!(moveObject.pieceCode.length === 1)) {
            throw new Error("[StaticErrorCheck] [validateMoveObject] Invalid piece code length. It must be exactly 1 character long.");
        }
    
        if (!(moveObject.targetPosX >= 0)) {
            throw new Error("[StaticErrorCheck] [validateMoveObject] Invalid target position X. It must be greater than or equal to 0.");
        }
    
        if (!(moveObject.targetPosY >= 0)) {
            throw new Error("[StaticErrorCheck] [validateMoveObject] Invalid target position Y. It must be greater than or equal to 0.");
        }
    
        if (!(moveObject.fullPieceCode.length === 2)) {
            throw new Error("[StaticErrorCheck] [validateMoveObject] Invalid full piece code length. It must be exactly 2 characters long.");
        }
    
        if (!(moveObject.targetArr.length === 2)) {
            throw new Error("[StaticErrorCheck] [validateMoveObject] Invalid target array length. It must contain exactly 2 elements.");
        }
    
        if (!(moveObject.targetSquare.length === 2)) {
            throw new Error("[StaticErrorCheck] [validateMoveObject] Invalid target square length. It must be exactly 2 characters long.");
        }
    
        if (!(moveObject.Castling === "Kingside" || moveObject.Castling === "Queenside" || moveObject.Castling === false)) {
            throw new Error("[StaticErrorCheck] [validateMoveObject] Invalid Castling value. It must be either 'Kingside', 'Queenside', or false.");
        }
    };
};

export default StaticErrorCheck;
