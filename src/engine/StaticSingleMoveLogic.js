
import { Piece } from "./Piece";

class StaticSingleMoveLogic {


    // static findMoveInstruction (board, moveInfo) {

    //     // First, 



    // }


    static filterPieces(board, pieceCode) {
        // const pieceCode = `${team}${letter}`;
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
     * @param {boolean} isRedo If the entire logic fails because of a bad rook or knight, rerun the code and avoid that piece
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


    static giveInstruction() {

        // game.receiveInstruction();

        // return;
    };


};

export default StaticSingleMoveLogic;
