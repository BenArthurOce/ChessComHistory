class Test {
    #element;           // This DOM element
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
        this.#className = "Piece"
        this.#element = null
        this.#team = team;
        this.#row = -1
        this.#col = -1
        this.#fileRef = '';
        this.#rankRef = -1; 
        this.#positionRef = '';
        this.#positionArr = [-1, -1];
        this.#fen = null;
    };
    get element() {
        return this.#element;
    };
    set element(value) {
        this.#element = value;
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
};

export default Test