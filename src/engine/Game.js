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
        this.setParser();
        // this.runGameWithParserObject();
        this.invokeGame();
    };

    setParser() {
        StaticErrorCheck.validatePGNExistence(this.pgn);

        console.log(this.pgn)
        // this.#parser = new StaticParser(this.pgn).parsedMoves;
    };

    //
    // NEW LOGIC TO RUN GAME
    //
    invokeGame() {
        StaticErrorCheck.validateBoardExistence(this.board);
        StaticErrorCheck.validateParserExistence(this.parser);
        StaticErrorCheck.checkIfBoardIsPopulated(this);


        // New Required Logic:
        // Game is Created:
            // Parser is Created
            // Board is Created


        // For each turn in Parser
            // Game() invokes Logic() to run a single move
                // - StaticSingleMoveLogic

            // Logic() returns instruction to Game() on how to move Board()
                // - receiveInstruction()

            // Game() updates Board()

            // Game() saves the boardstate as a FEN into its class
                // - getFEN()

            // Code runs again


        // StaticGameLogic.processAllMoves(this.board, this.parser);
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