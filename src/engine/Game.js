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

    constructor(pgn) {
        // console.log(`\tFunc: START constructor (Game)`);

        // StaticErrorCheck.validateOpeningObjectLogic(pgn)
        this.#pgn = pgn;
        this.#fen = null;
        this.#className = "Game"
        this.#classSubName = "";
        this.#board = new Board;
        this.#parser = null;
        this.init();

        this.getFEN()



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
    set parser(value) {
        this.#parser = new StaticParser(value)
    };
    get board() {
        return this.#board;
    };
    set board(value) {
        this.#board = value;
    };

    init() {
        this.setParser();
        this.runGameWithParserObject();
    };

    returnChessboard() {
        return this.board;
    };

    updateGameInformation(info) {
        this.gameInformation = info;
        this.parser = info.PGN;
    };

    setParser() {
        StaticErrorCheck.validatePGNExistence(this.pgn);
        this.#parser = new StaticParser(this.pgn).parsedMoves;
    };

    runGameWithParserObject() {
        // complete error checks first
        StaticErrorCheck.validateBoardExistence(this.board);
        StaticErrorCheck.validateParserExistence(this.parser);
        StaticErrorCheck.checkIfBoardIsPopulated(this);
        StaticGameLogic.processAllMoves(this.board, this.parser);
    };

    print() {
        this.board.printToTerminal();
    };

    getFEN() {
        const a = this.board.constructFEN();
        this.fen = a;
        // console.log(this.fen)
    };

    // This is used in the "side" scripts, where we do not want to display games to the DOM
    // createDummyBoard() {
    //     this.board = new BoardDisplay(0, this.element);
    // };
};


export default Game