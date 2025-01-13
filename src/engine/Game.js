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
    #className;         // Name of this class
    #classSubName;      // Name of this subclass
    #information;       // Data object obtained from Dictionary().
    #parser;            // Parser() object that lists the details of each move in that opening
    #board;             // Board() object that exists in the Game() class

    // constructor(information, idNumber) {
        constructor(pgn) {
        const information = null
        // console.log(`\tFunc: START constructor (Game)`);

        // StaticErrorCheck.validateOpeningObjectLogic(information)
        this.#pgn = pgn;
        this.#information = information;
        this.#className = "Game"
        this.#classSubName = "";
        this.#board = new Board;
        this.#parser = null;
        this.init();

        // console.log(`\tFunc: END constructor (Game)`);  
    };
    get pgn() {
        return this.#pgn
    };
    get className() {
        return this.#className
    };
    get classSubName() {
        return this.#classSubName;
    };
    get gameInformation() {
        return this.#information;
    };
    set gameInformation(value) {
        this.#information = value;
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
        this.gameInformation = info
        this.parser = info.PGN
    };

    setParser() {
        // console.log(this.pgn)
        // StaticErrorCheck.validatePGNExistence(this.gameInformation.PGN);
        StaticErrorCheck.validatePGNExistence(this.pgn);
        // this.#parser = new StaticParser(this.gameInformation.PGN).parsedMoves;
        console.log(this.pgn)
        this.#parser = new StaticParser(this.pgn).parsedMoves;
    };

    runGameWithParserObject() {
        // complete error checks first

        // console.log(this.parser);
        
        StaticErrorCheck.validateBoardExistence(this.board)
        StaticErrorCheck.validateParserExistence(this.parser)
        StaticErrorCheck.checkIfBoardIsPopulated(this)
        StaticGameLogic.processAllMoves(this.board, this.parser);

        // console.log(this.pgn)

        this.board.printToTerminal()
    }

    print() {
        // this.returnChessboard().printToTerminal()
    };


    // This is used in the "side" scripts, where we do not want to display games to the DOM
    // createDummyBoard() {
    //     this.board = new BoardDisplay(0, this.element);
    // };
};


export default Game