// import StaticGameLogic from './StaticGameLogic.js';
// import StaticParser from './StaticChessParser.js';
// import StaticChessUtility from './StaticChessUtility.js';
// import  { Board, BoardDisplay, BoardInteractive} from './BoardUsingLogic.js';
// import StaticErrorCheck from './StaticErrorCheck.js';
// import { defaultMethod } from 'react-router-dom/dist/dom.js';

/* 
The Game() class is what holds the information about the chessgame, which has been generated from the Dictionary() object
Game() contains the Board() object, which contains all the Square() and Piece Object()
*/


//
class Game {
    #className;         // Name of this class
    #classSubName;      // Name of this subclass
    #idNumber;          // Id number of the game. Is passed on to the Board() and the DOM
    #information;       // Data object obtained from Dictionary().
    #parser;            // Parser() object that lists the details of each move in that opening
    #board;             // Board() object that exists in the Game() class

    // constructor(information, idNumber) {
        constructor() {
        const information = null
        const idNumber = null
        console.log(`\tFunc: START constructor (Game)`);

        // StaticErrorCheck.validateOpeningObjectLogic(information)
        this.#idNumber = idNumber;
        this.#information = information;
        this.#className = "Game"
        this.#classSubName = "";
        this.#board = null;
        this.#parser = null;
        console.log(`\tFunc: END constructor (Game)`);  
    };
    get className() {
        return this.#className
    };
    get classSubName() {
        return this.#classSubName;
    };
    get idNumber() {
        return this.#idNumber;
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
        // this.#parser = new StaticParser(value)
    };
    get board() {
        return this.#board;
    };
    set board(value) {
        this.#board = value;
    };

    returnChessboard() {
        return this.board;
    };

    updateGameInformation(info) {
        this.gameInformation = info
        this.parser = info.PGN
    };

    setParser() {
        // StaticErrorCheck.validatePGNExistence(this.gameInformation.PGN);
        // this.#parser = new StaticParser(this.gameInformation.PGN).parsedMoves;
    };

    runGameWithParserObject() {
        // complete error checks first

        // console.log(this.parser);
        
        // StaticErrorCheck.validateBoardExistence(this.board)
        // StaticErrorCheck.validateParserExistence(this.parser)
        // StaticErrorCheck.checkIfBoardIsPopulated(this)
        // StaticGameLogic.processAllMoves(this.board, this.parser);
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