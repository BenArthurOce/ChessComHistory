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
    #index;             // Numerical ID
    #pgn;               // PGN string
    #fen;               // FEN string
    #className;         // Name of this class
    #classSubName;      // Name of this subclass
    #parser;            // Parser() object that lists the details of each move in that opening
    #board;             // Board() object that exists in the Game() class
    #boardStates;       // Array of FENs from each move

    constructor(index, pgn) {
        // console.log()
        // console.log(`\tFunc: START constructor (Game)`);
        // console.log(`\t index: ${index} pgn: ${pgn}`)

        StaticErrorCheck.validatePGNExistence(pgn, "Game", "constructor");

        // StaticErrorCheck.validateOpeningObjectLogic(pgn)
        this.#index = index;
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
        // console.log()

    };
    get index() {
        return this.#index
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

        // if (this.pgn == "1.d4 e5 2.dxe5 Nc6 3.Nc3 Qe7 4.Nf3 Nxe5 5.e4 f5 6.Bf4 d6 7.Nd5 Nxf3+ 8.Qxf3 Qxe4+ 9.Qxe4+ fxe4 10.Nxc7+ 1-0") {
        //     console.log("ITS THIS ONE")
        //     console.log(this.index)
        // }
        // console.log(this.index)

        this.invokeGame()
    };

    //
    // NEW LOGIC TO RUN GAME
    //
    invokeGame() {
        // console.log("=====INVOKE GAME======");
    
        // Validate game prerequisites
        // console.log(this.pgn)
        // console.log(this.board)
        // console.log(this.parser)
        StaticErrorCheck.validatePGNExistence(this.pgn, "Game", "invokeGame");
        StaticErrorCheck.validateBoardExistence(this.board);
        StaticErrorCheck.validateParserExistence(this.parser);
        StaticErrorCheck.checkIfBoardIsPopulated(this);
    
        let fen = null;
        const legalMovesArray = [];
        // const fenArray = [];


        try {

            // Method that looks for the relevant pieces for relevant team
            // Checks what is a legal move for every piece, stores that as an array
            const processMove = (moveInfo, team) => {
                if (!moveInfo) return;
        
                if (moveInfo.castlingSide) {
                    this.board.performCastling(team, moveInfo.castlingSide);
                } else {
                    const piecesFound = StaticSingleMoveLogic.filterPieces(this.board, moveInfo.fullPieceCode);
                    StaticErrorCheck.checkPiecesFoundArray(piecesFound);
        
                    piecesFound.forEach(piece => {
                        if (StaticSingleMoveLogic.isLegal(piece, moveInfo)) {
                            legalMovesArray.push(moveInfo);
                            this.board.movePiece(piece, moveInfo.targetSquare);
                        }
                    });
                }
        
                // Maybe this should be lower down
                const fen = this.board.constructFEN();
                this.boardStates.push(fen);
            };

            // Then, once the legal moves have been processed, we can start to move the peices on the board
            for (const [, [whiteMoveInfo, blackMoveInfo]] of Object.entries(this.parser.parsedMoves)) {
                processMove(whiteMoveInfo, 0); // 0 = White
                processMove(blackMoveInfo, 1); // 1 = Black
            }

        } catch (err) {
            // Optional: handle error or log
        }

    
    
        // this.board.printToTerminal();
        // console.log(fenArray);
    }


    // First Cycle, Go through all moves and determine if the board ends up being "legal"
    runFirstBoardCycle() {

    };

    // Second Cycle, If the first cycle resulted in an illegal board, re-run it with alternative moves
    runSecondBoardCycle() {

    };


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