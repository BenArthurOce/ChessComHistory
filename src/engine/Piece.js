/**
 * Class representing a chess piece
 * Extended Pieces are: Rook(), Knight(), Bishop(), Queen(), King()
 */
class Piece {
    #className;         // Name of this class
    #team;              // 0 = White, 1 = Black
    #row;               // Base 0 - numerical row position in grid
    #col;               // Base 0 - numerical column position in grid
    #fileRef;           // Base 1 - alphabetical row position in grid
    #rankRef;           // Base 1 - alphabetical column position in grid
    #positionRef;       // Notational string of piece position
    #positionArr;       // Array position of piece
    #fen;               // Letter code of piece for FEN notation
    
    constructor(team) {
        // console.log(`\t\t\tFunc: START constructor (Piece)`);
        this.#className = "Piece"
        this.#team = team;
        this.#row = -1
        this.#col = -1
        this.#fileRef = '';
        this.#rankRef = -1; 
        this.#positionRef = '';
        this.#positionArr = [-1, -1];
        // this.#fen
        // console.log(`\t\t\tFunc: END constructor (Piece)`);
    };
    get className() {
        return this.#className;
    };
    get team() {
        return this.#team;
    };
    set team(value) {
        this.#team = value;
    };
    get row() {
        return this.#row;
    };
    set row(value) {
        this.#row = value;
    };
    get col() {
        return this.#col;
    };
    set col(value) {
        this.#col = value;
    };
    get fileRef() {
        return this.#fileRef;
    };
    set fileRef(value) {
        this.#fileRef = value;
    };
    get rankRef() {
        return this.#rankRef;
    };
    set rankRef(value) {
        this.#rankRef = value;
    };
    get positionRef() {
        return this.#positionRef;
    };
    set positionRef(value) {
        this.#positionRef = value;
    };
    get positionArr() {
        return this.#positionArr;
    };
    set positionArr(value) {
        this.#positionArr = value;
    };
    get fen() {
        return this.#fen;
    };
    set fen(value) {
        this.#fen = value;
    };


    /**
     * Update the information about the Piece() object with information from the Square() object
     * 
     * @param {Square} squareObj The Square() object where the Piece() object is residing
     */
    update(squareObj) {
        this.#row = squareObj.row;
        this.#col = squareObj.col;
        this.#rankRef = squareObj.rankRef;
        this.#fileRef = squareObj.fileRef;
        this.#positionRef = squareObj.positionRef;
        this.#positionArr = squareObj.positionArr
    };


    /**
     * Calculate the difference between ranks and files. Returns a 2 element single digit array
     * 
     * @param {string} destination WIP
     * @param {string} moveInfo WIP
     * @returns {Array<string>} WIP
     */
    getfileRefrankRefDifference(destination, moveInfo) {
        let fileRefDiff = this.positionArr[1] - destination[1];
        let rankRefDiff = this.positionArr[0] - destination[0];
        return [rankRefDiff, fileRefDiff];
    };


    /**
     * Print debugging information about the Piece() object
     */
    printToTerminal() {
        console.log(`------Debug ${this.className} Details------`)
        console.log(`Name: ${this.name} | Team: ${this.team} | positionRef: ${this.positionRef} | positionArr: ${this.positionArr}`)
        console.log(`row: ${this.row} | col: ${this.col} | fileRef: ${this.fileRef} | rankRef: ${this.rankRef}`)
        console.log(`-----------------------`)
    };
};


/**
 * Class representing a Pawn chess piece.
 * @extends Piece
 */
class Pawn extends Piece {
    #name;
    #pieceCodeStr;
    #code
    constructor(team) {
        super(team);
        this.#name = "Pawn";
        this.#pieceCodeStr = "p";
        this.#code = team + this.#pieceCodeStr;
        this.fen = team===0? "P" : "p"
    };
    get code() {
        return this.#code;
    };
    get name() {
        return this.#name;
    };
    get pieceCodeStr() {
        return this.#pieceCodeStr;
    };


    /**
     * isValidMove Pawn - WIP
     * 
     */
    isValidMove(destination, moveInfo) {
        const [rankRefDiff, fileRefDiff] = this.getfileRefrankRefDifference(destination, moveInfo);

        // If the piece rankRef/fileRef location is mentioned in the notation, return matching piece (if true)
        // The difference in ranks also needs to be 1. Otherwise pawns on the same rank will be confused
        if (moveInfo.locationPosX) {
            return this.positionArr[0] === moveInfo.locationRow && Math.abs(rankRefDiff) === 1
        };
        if (moveInfo.locationPosY) {
            return this.positionArr[1] === moveInfo.locationCol && Math.abs(rankRefDiff) === 1
        };
        if (moveInfo.isCapture) {
            return this.fileRef === moveInfo.locationPosY && Math.abs(rankRefDiff) === 1
        };

        // White Pawns
        if (moveInfo.teamNumber === 0) {
            if (fileRefDiff === 0 && rankRefDiff === 1) {
                return true;
            };
            if (this.row === 6 && fileRefDiff === 0 && rankRefDiff === 2) {
                return true;
            };
            // Black Pawns
        } else if (moveInfo.teamNumber === 1) {
            if (fileRefDiff === 0 && rankRefDiff === -1) {
                return true;
            };
            if (this.row === 1 && fileRefDiff === 0 && rankRefDiff === -2) {
                return true;
            };
        };
        return false;
    };
};


/**
 * Class representing a Rook chess piece.
 * @extends Piece
 */
class Rook extends Piece {
    #name;
    #pieceCodeStr;
    #code;
    constructor(team) {
        super(team);
        this.#name = "Rook";
        this.#pieceCodeStr = "R"
        this.#code = team + this.#pieceCodeStr;
        this.fen = team===0? "R" : "r"

    };
    get code() {
        return this.#code;
    };
    get name() {
        return this.#name;
    };
    get pieceCodeStr() {
        return this.#pieceCodeStr;
    };


    /**
     * isValidMove Rook - WIP
     * 
     */
    isValidMove(destination, moveInfo) {
        console.log("isValidMove")
        console.log(destination)
        console.log(moveInfo)
        console.log();
        
        const [fileRefDiff, rankRefDiff] = this.getfileRefrankRefDifference(destination, moveInfo);

        // If the piece rankRef/fileRef location is mentioned in the notation, return matching piece (if true)
        if (moveInfo.locationPosX) {
            return this.positionArr[0] === moveInfo.locationRow
        };
        if (moveInfo.locationPosY) {
            return this.positionArr[1] === moveInfo.locationCol
        };
        return fileRefDiff === 0 || rankRefDiff === 0;
    };
};

/**
 * Class representing a Knight chess piece.
 * @extends Piece
 */
class Knight extends Piece {
    #name;
    #pieceCodeStr;
    #code;
    constructor(team) {
        super(team);
        this.#name = "Knight";
        this.#pieceCodeStr = "N"
        this.#code = team + this.#pieceCodeStr;
        this.fen = team===0? "N" : "n"

    };
    get code() {
        return this.#code;
    };
    get name() {
        return this.#name;
    };
    get pieceCodeStr() {
        return this.#pieceCodeStr;
    };

    /**
     * isValidMove Knight - WIP
     * 
     */
    isValidMove(destination, moveInfo) {
        const [fileRefDiff, rankRefDiff] = this.getfileRefrankRefDifference(destination, moveInfo);

        // If the piece rankRef/fileRef location is mentioned in the notation, return matching piece (if true)
        if (moveInfo.locationPosX) {
            return this.positionArr[0] === moveInfo.locationRow
        };
        if (moveInfo.locationPosY) {
            return this.positionArr[1] === moveInfo.locationCol
        };

        if (this.col !== null && this.row === null) {
            return this.row === fileRefDiff;
        };
        return (Math.abs(fileRefDiff) === 1 && Math.abs(rankRefDiff) === 2) || (Math.abs(fileRefDiff) === 2 && Math.abs(rankRefDiff) === 1);
    };

};

/**
 * Class representing a Bishop chess piece.
 * @extends Piece
 */
class Bishop extends Piece {
    #name;
    #pieceCodeStr;
    #code;
    constructor(team) {
        super(team);
        this.#name = "Bishop";
        this.#pieceCodeStr = "B"
        this.#code = team + this.#pieceCodeStr;
        this.fen = team===0? "B" : "b"

    };
    get code() {
        return this.#code;
    };
    get name() {
        return this.#name;
    };
    get pieceCodeStr() {
        return this.#pieceCodeStr;
    };

    /**
     * isValidMove Bishop - WIP
     * 
     */
    isValidMove(destination, moveInfo) {
        const [fileRefDiff, rankRefDiff] = this.getfileRefrankRefDifference(destination, moveInfo);
        return Math.abs(fileRefDiff) === Math.abs(rankRefDiff);
    };

};


/**
 * Class representing a Queen chess piece.
 * @extends Piece
 */
class Queen extends Piece {
    #name;
    #pieceCodeStr;
    #code;
    constructor(team) {
        super(team);
        this.#name = "Queen";
        this.#pieceCodeStr = "Q";
        this.#code = team + this.#pieceCodeStr;
        this.fen = team===0? "Q" : "q"

    };
    get code() {
        return this.#code;
    };
    get name() {
        return this.#name;
    };
    get pieceCodeStr() {
        return this.#pieceCodeStr;
    };

    /**
     * isValidMove Queen - WIP
     * 
     */
    isValidMove(destination, moveInfo) {
        const [fileRefDiff, rankRefDiff] = this.getfileRefrankRefDifference(destination, moveInfo);
        const diagionalMoves = Math.abs(fileRefDiff) === Math.abs(rankRefDiff);
        const straightMoves = fileRefDiff === 0 || rankRefDiff === 0;

        if (diagionalMoves || straightMoves) {
            return true
        }
    };
};


/**
 * Class representing a King chess piece.
 * @extends Piece
 */
class King extends Piece {
    #name;
    #pieceCodeStr;
    #code
    constructor(team) {
        super(team);
        this.#name = "King";
        this.#pieceCodeStr = "K";
        this.#code = team + this.#pieceCodeStr;
        this.fen = team===0? "K" : "k"

    };
    get code() {
        return this.#code;
    };
    get name() {
        return this.#name;
    };
    get pieceCodeStr() {
        return this.#pieceCodeStr;
    };

    /**
     * isValidMove King - WIP
     * 
     */
    isValidMove(destination, moveInfo) {
        const [fileRefDiff, rankRefDiff] = this.getfileRefrankRefDifference(destination, moveInfo);
        return Math.abs(fileRefDiff) <= 1 && Math.abs(rankRefDiff) <= 1;
    };
};





export {Piece, Pawn, Rook, Knight, Bishop, Queen, King};