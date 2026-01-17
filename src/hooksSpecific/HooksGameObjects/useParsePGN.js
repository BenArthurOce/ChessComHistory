import { useState, useEffect } from "react";


//
// Each match object has a "png" attribute that is a single string, that can be further broken up into another object
// Sourced from useBuildMatchesChessCom or useBuildMatchesLichess
// Returns a single object which is further used in useSingleMatchObjects to create the full dataset
//

const useParsePGN = (hookInput, isTriggerParseStage) => {

    const [parsedGames, setParsedGames] = useState([]);
    const [isParsePending, setIsParsePending] = useState(false);
    const [parsedErrors, setParsedErrors] = useState([]);
    const [hookMessage, setHookMessage] = useState(null);



    useEffect(() => {

        if (isTriggerParseStage === 0) {
            console.log("[useParsePGN] Return early on [isTriggerParseStage = 0]");
            return;
        }

        if (!hookInput || hookInput.length === 0) {
            console.log("[useParsePGN] Return early on [hookInput]");
            return;
        }

        console.log("[useParsePGN] - Running hook...")
        runHook();
    }, [hookInput, isTriggerParseStage]);




    async function runHook() {

        // console.log("=== useParsePGN runHook ===");
        setIsParsePending(true);

        const results = [];
        const errors = [];

        try {
            if (!Array.isArray(hookInput)) {
                throw new Error("hookInput is not an array");
            }

            await Promise.all(
                hookInput.map(async (match, index) => {
                    try {
                        // console.log(match)
                        // console.log(`Parsing PGN at index ${index}`);
                        const parsedObject = parseSinglePGN(match.pgn);
                        results.push(parsedObject);
                    } catch (err) {
                        console.error(`PGN parse error at index ${index}`, err);
                        errors.push({
                            index,
                            message: err.message,
                            value: match
                        });
                    }
                })
            );

            // console.log("Parsed results:", results);
            // console.log("Parsing errors:", errors);

            setParsedGames(results);
            setParsedErrors(errors);

        } catch (fatalError) {
            console.error("Fatal useParsePGN error:", fatalError);
        } finally {
            setIsParsePending(false);
        }
    };

    const parseSinglePGN = (unparsedGameString) => {
        // console.log("=== Parsing PGN ===");
        // console.log("Unparsed PGN String:", unparsedGameString);

        const pgnParseGameRegx = /\[([\w\s]+)\s"([^"]+)"\]/g;
        const parsedGameData = {};
        let match;

        // Parse headers (event details like Date, Site, etc.)
        while ((match = pgnParseGameRegx.exec(unparsedGameString)) !== null) {
            const key = match[1].trim(); // Header name (e.g., "Event", "Date")
            const value = match[2].trim(); // Corresponding value (e.g., "Live Chess", "2025.09.11")
            parsedGameData[key] = value;
        }

        // console.log("Parsed PGN headers:", parsedGameData);

        // Function to clean up move strings and remove unnecessary annotations or time markers
        function buildMoveString(input) {
            if (!input) return '';  // Handle empty input
            return input.replace(/\{[^{}]*\}|\[[^\[\]]*\]/g, '') // Remove comments & times
                        .replace(/\d+\.{3}/g, ' ')  // Remove "1..." style move numbers
                        .replace(/\s+/g, ' ')  // Collapse multiple spaces
                        .replace(/\s+\./g, '.') // Normalize space before move numbers
                        .replace(/\.\s+/g, '.') // Normalize space after move numbers
                        .trim();
        }

        // Function to parse individual moves from the game notation
        function buildMoveObject(notation) {
            if (!notation) return {};  // Handle empty notation

            const MOVE_REGEX =
                /\s*(\d{1,3})\.?\s*((?:O-O(?:-O)?|[KQNBR][1-8a-h]?x?[a-h][1-8]|[a-h]x?[a-h]?[1-8]=?[QRNB]?))\+?(?:\s*)((?:O-O(?:-O)?|[KQNBR][1-8a-h]?x?[a-h][1-8]|[a-h]x?[a-h]?[1-8]=?[QRNB]?))?/g;

            let match;
            const allMoves = {};

            while ((match = MOVE_REGEX.exec(notation)) !== null) {
                const moveNumber = parseInt(match[1], 10);
                allMoves[moveNumber] = [match[2], match[3] || undefined];
            }

            return allMoves;
        }

        // Parse the move string (if there is one)
        const moveString = buildMoveString(unparsedGameString.replace(pgnParseGameRegx, '').trim());
        parsedGameData.MoveString = moveString;
        parsedGameData.MoveObject = buildMoveObject(moveString);

        // Check if we parsed any moves; if not, throw an error
        if (Object.keys(parsedGameData.MoveObject).length === 0) {
            throw new Error("No moves parsed from PGN");
        }

        // console.log("Parsed Game Moves:", parsedGameData.MoveObject);

        return parsedGameData;
    };


    // console.log("=== RETURN useParsePGN ===");
    // console.log({
    //     parsedGames,
    //     parsedErrors,
    //     hookMessage
    // });


    // console.log({parsedGames, isParsePending, parsedErrors});
    return {parsedGames, isParsePending, parsedErrors};
};

export default useParsePGN;



