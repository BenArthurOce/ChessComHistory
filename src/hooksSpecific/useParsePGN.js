import { useState, useEffect, useCallback } from "react";

const useParseFEN = (hookInput) => {
    const [hookOutput, setHookOutput] = useState('')


    useEffect(() => {
        // console.log(`hookInput: ${hookInput}`)
        if (!hookInput || hookInput.length === 0) { return}

        runHook(hookInput)
        // console.log(hookInput)

    }, [hookInput]);


    async function runHook(allGames) {

        const matchObjects = await Promise.all(allGames.map(async (match) => {

        const parsedData = parseSinglePGN(match.pgn);
            return parsedData
        }));

        setHookOutput(matchObjects)
    };


    const parseSinglePGN = (unparsedGameString) => {

        const pgnParseGameRegx = /\[([\w\s]+)\s"([^"]+)"\]/g;
        const parsedGameData = {};
        let match;
    
        while ((match = pgnParseGameRegx.exec(unparsedGameString)) !== null) {
            parsedGameData[match[1]] = match[2];
        };
    
    
        function buildMoveString(input) {
            return input.replace(/\{[^{}]*\}|\[[^\[\]]*\]/g, '')
                        .replace(/\d+\.{3}/g, ' ')
                        .replace(/\s+/g, ' ')
                        .replace(/\s+\./g, '.').replace(/\.\s+/g, '.')
                        .trim();
        };
    
        
        function buildMoveObject(notation) {
            const MOVE_REGEX = /\s*(\d{1,3})\.?\s*((?:(?:O-O(?:-O)?)|(?:[KQNBR][1-8a-h]?x?[a-h]x?[1-8])|(?:[a-h]x?[a-h]?[1-8]\=?[QRNB]?))\+?)(?:\s*\d+\.?\d+?m?s)?\.?\s*((?:(?:O-O(?:-O)?)|(?:[KQNBR][1-8a-h]?x?[a-h]x?[1-8])|(?:[a-h]x?[a-h]?[1-8]\=?[QRNB]?))\+?)?(?:\s*\d+\.?\d+?m?s)?(?:#)?/g;
            let match;
            const allMoves = {};
    
            while ((match = MOVE_REGEX.exec(notation)) !== null) {
                const moveNumber = parseInt(match[1]);
                const whiteMove = match[2];
                const blackMove = match[3] || undefined;
                allMoves[moveNumber] = [whiteMove, blackMove];
            }
            return allMoves;
        };
    
    
        parsedGameData.MoveString = buildMoveString(unparsedGameString.replace(pgnParseGameRegx, '').trim());
        parsedGameData.MoveObject = buildMoveObject(parsedGameData.MoveString);
    
        return parsedGameData;
    
    };

    return hookOutput;
};

export default useParseFEN;
