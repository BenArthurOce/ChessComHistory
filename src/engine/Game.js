// import StaticGameLogic from './StaticGameLogic.js';
// import StaticParser from './StaticChessParser.js';
// import StaticChessUtility from './StaticChessUtility.js';
// import  { Board, BoardDisplay, BoardInteractive} from './Board.js';
// import StaticErrorCheck from './StaticErrorCheck.js';
// import { defaultMethod } from 'react-router-dom/dist/dom.js';

import Board from "./Board";
import StaticParser from "./StaticChessParser"; 
import StaticErrorCheck from "./StaticErrorCheck";
import StaticGameLogic from "./StaticGameLogic";
import StaticSingleMoveLogic from "./StaticSingleMoveLogic";

/* 
The Game() class is what holds the information about the chessgame, which has been generated from the Dictionary() object
Game() contains the Board() object, which contains all the Square() and Piece Object()
*/


//
class Game {
    #pgn;               // PGN string
    #fen;               // FEN string
    #className;         // Name of this class
    #classSubName;      // Name of this subclass
    #parser;            // Parser() object that lists the details of each move in that opening
    #board;             // Board() object that exists in the Game() class
    #boardStates;       // Array of FENs from each move

    constructor(pgn) {
        // console.log(`\tFunc: START constructor (Game)`);

        // StaticErrorCheck.validateOpeningObjectLogic(pgn)
        this.#pgn = pgn;
        this.#fen = null;
        this.#className = "Game"
        this.#classSubName = "";
        this.#board = new Board;
        this.#parser = new StaticParser(pgn);
        this.#boardStates = [];
        this.init();    // Invokes Game()

        // this.getFEN()



        // console.log(`\tFunc: END constructor (Game)`);  
    };
    get pgn() {
        return this.#pgn
    };
    get fen() {
        return this.#fen;
    };
    set fen(value) {
        this.#fen = value;
    };
    get className() {
        return this.#className
    };
    get classSubName() {
        return this.#classSubName;
    };
    get parser() {
        return this.#parser;
    };
    // set parser(value) {
    //     this.#parser = new StaticParser(value)
    // };
    set parser(value) {
        this.#parser = value
    };
    get board() {
        return this.#board;
    };
    set board(value) {
        this.#board = value;
    };
    get boardStates() {
        return this.#boardStates;
    };
    set boardStates(value) {
        this.#boardStates = value;
    };

    init() {
        // console.log("=====INIT======")
        this.invokeGame()
    };

    //
    // NEW LOGIC TO RUN GAME
    //
    invokeGame() {
        // console.log("=====INVOKE GAME======");
    
        // Validate game prerequisites
        StaticErrorCheck.validatePGNExistence(this.pgn);
        StaticErrorCheck.validateBoardExistence(this.board);
        StaticErrorCheck.validateParserExistence(this.parser);
        StaticErrorCheck.checkIfBoardIsPopulated(this);
    
        const legalMovesArray = [];
        const fenArray = [];
    
        for (const [index, [whiteMoveInfo, blackMoveInfo]] of Object.entries(this.parser['parsedMoves'])) {
            // console.log(`Processing turn index=${index}`);
    
            // -----------------
            // Process White Move
            // -----------------
            if (whiteMoveInfo) {
                // console.log(`Processing White move: ${whiteMoveInfo.notation}`);
    
                // If there is a castling move, perform it and skip the rest
                if (whiteMoveInfo.castlingSide) {
                    this.board.performCastling(0, whiteMoveInfo.castlingSide);
                } else {
                    // Find possible pieces that could have made the move
                    const whitePiecesFound = StaticSingleMoveLogic.filterPieces(this.board, whiteMoveInfo['fullPieceCode']);
                    if (whitePiecesFound.length === 0) {
                        console.log(whiteMoveInfo);
                        this.board.printToTerminalError();
                        throw new Error(`File: [Game.js] Function: [invokeGame]: Piece not found || Turn: ${whiteMoveInfo.turnNumber} | MoveNum: ${whiteMoveInfo.teamNumber} | Notation: ${whiteMoveInfo.notation}`);
                    }
                    
                    // Test each piece to see if they can legally move
                    whitePiecesFound.forEach(piece => {
                        if (StaticSingleMoveLogic.isLegal(piece, whiteMoveInfo)) {
                            legalMovesArray.push(whiteMoveInfo);
                            // Make the move
                            this.board.movePiece(piece, whiteMoveInfo.targetSquare);
                        }
                    });
                }
            }
    
            // -----------------
            // Process Black Move
            // -----------------
            if (blackMoveInfo) {
                // console.log(`Processing Black move: ${blackMoveInfo.notation}`);
    
                // If there is a castling move, perform it and skip the rest
                if (blackMoveInfo.castlingSide) {
                    this.board.performCastling(1, blackMoveInfo.castlingSide);
                } else {
                    // Find possible pieces that could have made the move
                    const blackPiecesFound = StaticSingleMoveLogic.filterPieces(this.board, blackMoveInfo['fullPieceCode']);
                    if (blackPiecesFound.length === 0) {
                        console.log(blackMoveInfo);
                        this.board.printToTerminalError();
                        throw new Error(`File: [Game.js] Function: [invokeGame]: Piece not found || Turn: ${blackMoveInfo.turnNumber} | MoveNum: ${blackMoveInfo.teamNumber} | Notation: ${blackMoveInfo.notation}`);
                    }
                    
                    // Test each piece to see if they can legally move
                    blackPiecesFound.forEach(piece => {
                        if (StaticSingleMoveLogic.isLegal(piece, blackMoveInfo)) {
                            legalMovesArray.push(blackMoveInfo);
                            // Make the move
                            this.board.movePiece(piece, blackMoveInfo.targetSquare);
                        }
                    });
                }
            }
    
            // Save board state after both moves
            const fen = this.board.constructFEN();
            fenArray.push(fen);
        }
    
        this.board.printToTerminal();
        // console.log(fenArray);
    }

    // Recieves instruction from Logic(), moves Board()
    receiveInstruction(instruction) {

    };

    // Recieves instruction from Logic(), moves Board()
    updateBoard() {
        // this.board.movePiece(foundPiece, moveInfo.targetSquare);
    };



    runGameWithParserObject() {
        // complete error checks first

        console.log(this.parser)
        // StaticErrorCheck.validateBoardExistence(this.board);
        // StaticErrorCheck.validateParserExistence(this.parser);
        // StaticErrorCheck.checkIfBoardIsPopulated(this);
        // StaticGameLogic.processAllMoves(this.board, this.parser);
    };


    getFEN() {
        const a = this.board.constructFEN();
        this.fen = a;
        // console.log(this.fen)
    };


    print() {
        this.board.printToTerminal();
    };

};


export default Game