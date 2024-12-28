import { useState, useEffect } from 'react';

const useOtherStatsCastling = (hookInput) => {
    const [hookOutput, setHookOutput] = useState([])

    useEffect(() => {
        // Array is the list of parsed Match Objects
        if (!hookInput || hookInput.length === 0) { return };
        runHook();
    }, [hookInput]);

    function runHook() {

        // Get Castling games based on queenside/kingside and which one you did
        const castlingLines = extractCastlingLines(hookInput);

        // Filter non Castling games. Create Object summarising.
        const castlingTotalObject = makeCastlingTotalObject(castlingLines);

        setHookOutput(castlingTotalObject);
    };


    const extractCastlingLines = (matchHistory) => {

        const extractOutput = [];

        matchHistory.forEach(match => {

            // Get the first 8 moves
            const whiteMoves = match['moves']['white'].slice(0, 8)
            const blackMoves = match['moves']['black'].slice(0, 8)

            // Locate castling moves for White and Black
            let whiteCastlingSide = null
            let blackCastlingSide = null

            if(whiteMoves.includes("O-O")) {whiteCastlingSide = "Kingside"}
            if(whiteMoves.includes("O-O-O")) {whiteCastlingSide = "Queenside"}

            if(blackMoves.includes("O-O")) {blackCastlingSide = "Kingside"}
            if(blackMoves.includes("O-O-O")) {blackCastlingSide = "Queenside"}

            // Create castling object for single game. Add to output
            const castlingObject = {
                gameId:         match.general.id,
                userPlayed:     match.results.userPlayed,
                result:         match.results.userResult,
                white:          whiteCastlingSide,
                black:          blackCastlingSide,
                you:            match.playerResults.userPlayed == "white" ? whiteCastlingSide : blackCastlingSide,
                them:           match.playerResults.userPlayed == "white" ? blackCastlingSide : whiteCastlingSide
            };

            extractOutput.push(castlingObject);
        });

        return extractOutput;
    };


    const makeCastlingTotalObject = (castlingObjectArray) => {

        //
        // Function to filter castling games on kingside/queenside
        //
        const filterData = (data, youDid, theyDid, winLoseDraw) => {
            return data.filter((line) => {
                return (
                    line.you === youDid &&
                    line.them === theyDid && 
                    line.result === winLoseDraw
                );
            });
        };

        //
        // Remove any games with no castling moves
        //
        const castlingDataFiltered = castlingObjectArray
            .filter(game => game.you !== null || game.them !== null
        );

        //
        // Create object that holds all castling stats
        //
        const stats = [
            // Single-side combinations (null for one side)
            {
                you: "Kingside",
                them: null,
                results: {
                    win: filterData(castlingDataFiltered, "Kingside", null, "win"),
                    lose: filterData(castlingDataFiltered, "Kingside", null, "lose"),
                    draw: filterData(castlingDataFiltered, "Kingside", null, "draw"),
                },
            },
            {
                you: "Queenside",
                them: null,
                results: {
                    win: filterData(castlingDataFiltered, "Queenside", null, "win"),
                    lose: filterData(castlingDataFiltered, "Queenside", null, "lose"),
                    draw: filterData(castlingDataFiltered, "Queenside", null, "draw"),
                },
            },
            {
                you: "Both",
                them: null,
                results: {
                    win: filterData(castlingDataFiltered, "Both", null, "win"),
                    lose: filterData(castlingDataFiltered, "Both", null, "lose"),
                    draw: filterData(castlingDataFiltered, "Both", null, "draw"),
                },
            },
            {
                you: null,
                them: "Kingside",
                results: {
                    win: filterData(castlingDataFiltered, null, "Kingside", "win"),
                    lose: filterData(castlingDataFiltered, null, "Kingside", "lose"),
                    draw: filterData(castlingDataFiltered, null, "Kingside", "draw"),
                },
            },
            {
                you: null,
                them: "Queenside",
                results: {
                    win: filterData(castlingDataFiltered, null, "Queenside", "win"),
                    lose: filterData(castlingDataFiltered, null, "Queenside", "lose"),
                    draw: filterData(castlingDataFiltered, null, "Queenside", "draw"),
                },
            },
            {
                you: null,
                them: "Both",
                results: {
                    win: filterData(castlingDataFiltered, null, "Both", "win"),
                    lose: filterData(castlingDataFiltered, null, "Both", "lose"),
                    draw: filterData(castlingDataFiltered, null, "Both", "draw"),
                },
            },
            // Dual-side combinations
            {
                you: "Kingside",
                them: "Kingside",
                results: {
                    win: filterData(castlingDataFiltered, "Kingside", "Kingside", "win"),
                    lose: filterData(castlingDataFiltered, "Kingside", "Kingside", "lose"),
                    draw: filterData(castlingDataFiltered, "Kingside", "Kingside", "draw"),
                },
            },
            {
                you: "Kingside",
                them: "Queenside",
                results: {
                    win: filterData(castlingDataFiltered, "Kingside", "Queenside", "win"),
                    lose: filterData(castlingDataFiltered, "Kingside", "Queenside", "lose"),
                    draw: filterData(castlingDataFiltered, "Kingside", "Queenside", "draw"),
                },
            },
            {
                you: "Kingside",
                them: "Both",
                results: {
                    win: filterData(castlingDataFiltered, "Kingside", "Both", "win"),
                    lose: filterData(castlingDataFiltered, "Kingside", "Both", "lose"),
                    draw: filterData(castlingDataFiltered, "Kingside", "Both", "draw"),
                },
            },
            {
                you: "Queenside",
                them: "Kingside",
                results: {
                    win: filterData(castlingDataFiltered, "Queenside", "Kingside", "win"),
                    lose: filterData(castlingDataFiltered, "Queenside", "Kingside", "lose"),
                    draw: filterData(castlingDataFiltered, "Queenside", "Kingside", "draw"),
                },
            },
            {
                you: "Queenside",
                them: "Queenside",
                results: {
                    win: filterData(castlingDataFiltered, "Queenside", "Queenside", "win"),
                    lose: filterData(castlingDataFiltered, "Queenside", "Queenside", "lose"),
                    draw: filterData(castlingDataFiltered, "Queenside", "Queenside", "draw"),
                },
            },
            {
                you: "Queenside",
                them: "Both",
                results: {
                    win: filterData(castlingDataFiltered, "Queenside", "Both", "win"),
                    lose: filterData(castlingDataFiltered, "Queenside", "Both", "lose"),
                    draw: filterData(castlingDataFiltered, "Queenside", "Both", "draw"),
                },
            },
            {
                you: "Both",
                them: "Kingside",
                results: {
                    win: filterData(castlingDataFiltered, "Both", "Kingside", "win"),
                    lose: filterData(castlingDataFiltered, "Both", "Kingside", "lose"),
                    draw: filterData(castlingDataFiltered, "Both", "Kingside", "draw"),
                },
            },
            {
                you: "Both",
                them: "Queenside",
                results: {
                    win: filterData(castlingDataFiltered, "Both", "Queenside", "win"),
                    lose: filterData(castlingDataFiltered, "Both", "Queenside", "lose"),
                    draw: filterData(castlingDataFiltered, "Both", "Queenside", "draw"),
                },
            },
            {
                you: "Both",
                them: "Both",
                results: {
                    win: filterData(castlingDataFiltered, "Both", "Both", "win"),
                    lose: filterData(castlingDataFiltered, "Both", "Both", "lose"),
                    draw: filterData(castlingDataFiltered, "Both", "Both", "draw"),
                },
            },
            {
                you: "Totals",
                them: "Totals",
                results: {
                    win: 0,
                    lose: 0,
                    draw: 0,
                },
            }
        ];

        //
        // Add totals to the object before returning
        //
        let totalWins = 0;
        let totalLosses = 0;
        let totalDraws = 0;

        for (let i = 0; i < stats.length - 1; i++) {
            const { results } = stats[i];
        
            totalWins += results.win.length;
            totalLosses += results.lose.length;
            totalDraws += results.draw.length;
        };


        stats[stats.length - 1].results.win = totalWins;
        stats[stats.length - 1].results.lose = totalLosses;
        stats[stats.length - 1].results.draw = totalDraws;        
        
        return stats;
    };

    return hookOutput;
};

export default useOtherStatsCastling;
