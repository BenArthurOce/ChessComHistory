import { useState, useEffect } from 'react';

const useOtherStatsFianchetto = (hookInput) => {
    const [hookOutput, setHookOutput] = useState([])

    useEffect(() => {
        // Array is the list of parsed Match Objects
        if (!hookInput || hookInput.length === 0) { return };
        runHook();
    }, [hookInput]);

    function runHook() {

        // Get Fianchetto games based on queenside/kingside and which one you did
        const fianchettoLines = extractFianchettoLines(hookInput);

        // Filter non Fianchetto games. Create Object summarising.
        const fianchettoTotalObject = makeFianchettoTotalObject(fianchettoLines);

        setHookOutput(fianchettoTotalObject);
    };


    const extractFianchettoLines = (matchHistory) => {

        const extractOutput = [];

        matchHistory.forEach(match => {

            // Get the first 8 moves
            const whiteMoves = match['moves']['white'].slice(0, 8)
            const blackMoves = match['moves']['black'].slice(0, 8)

            // Locate fianchetto moves for White and Black
            let whiteFianchettoSide = null
            let blackFianchettoSide = null

            if(whiteMoves.includes("Bg2")) {whiteFianchettoSide = "Kingside"}
            if(whiteMoves.includes("Bb2")) {whiteFianchettoSide = "Queenside"}
            if(whiteMoves.includes("Bg2") && whiteMoves.includes("Bb2")) {whiteFianchettoSide = "Both"}

            if(blackMoves.includes("Bg7")) {blackFianchettoSide = "Kingside"}
            if(blackMoves.includes("Bb7")) {blackFianchettoSide = "Queenside"}
            if(whiteMoves.includes("Bg7") && whiteMoves.includes("Bb7")) {blackFianchettoSide = "Both"}

            // Create fianchetto object for single game. Add to output
            const fianchettoObject = {
                gameId:         match.general.id,
                userPlayed:     match.results.userPlayed,
                result:         match.results.userResult,
                white:          whiteFianchettoSide,
                black:          blackFianchettoSide,
                you:            match.playerResults.userPlayed == "white" ? whiteFianchettoSide : blackFianchettoSide,
                them:           match.playerResults.userPlayed == "white" ? blackFianchettoSide : whiteFianchettoSide
            };

            extractOutput.push(fianchettoObject);
        });

        return extractOutput;
    };



    const makeFianchettoTotalObject = (fianchettoObjectArray) => {


        //
        // Function to filter fianchetto games on kingside/queenside
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
        // Remove any games with no fianchetto moves
        //
        const fianchettoDataFiltered = fianchettoObjectArray
            .filter(game => game.you !== null || game.them !== null
        );

        //
        // Create object that holds all fianchetto stats
        //
        const stats = [
            // Single-side combinations (null for one side)
            {
                you: "Kingside",
                them: null,
                results: {
                    win: filterData(fianchettoDataFiltered, "Kingside", null, "win"),
                    lose: filterData(fianchettoDataFiltered, "Kingside", null, "lose"),
                    draw: filterData(fianchettoDataFiltered, "Kingside", null, "draw"),
                },
            },
            {
                you: "Queenside",
                them: null,
                results: {
                    win: filterData(fianchettoDataFiltered, "Queenside", null, "win"),
                    lose: filterData(fianchettoDataFiltered, "Queenside", null, "lose"),
                    draw: filterData(fianchettoDataFiltered, "Queenside", null, "draw"),
                },
            },
            {
                you: "Both",
                them: null,
                results: {
                    win: filterData(fianchettoDataFiltered, "Both", null, "win"),
                    lose: filterData(fianchettoDataFiltered, "Both", null, "lose"),
                    draw: filterData(fianchettoDataFiltered, "Both", null, "draw"),
                },
            },
            {
                you: null,
                them: "Kingside",
                results: {
                    win: filterData(fianchettoDataFiltered, null, "Kingside", "win"),
                    lose: filterData(fianchettoDataFiltered, null, "Kingside", "lose"),
                    draw: filterData(fianchettoDataFiltered, null, "Kingside", "draw"),
                },
            },
            {
                you: null,
                them: "Queenside",
                results: {
                    win: filterData(fianchettoDataFiltered, null, "Queenside", "win"),
                    lose: filterData(fianchettoDataFiltered, null, "Queenside", "lose"),
                    draw: filterData(fianchettoDataFiltered, null, "Queenside", "draw"),
                },
            },
            {
                you: null,
                them: "Both",
                results: {
                    win: filterData(fianchettoDataFiltered, null, "Both", "win"),
                    lose: filterData(fianchettoDataFiltered, null, "Both", "lose"),
                    draw: filterData(fianchettoDataFiltered, null, "Both", "draw"),
                },
            },
            // Dual-side combinations
            {
                you: "Kingside",
                them: "Kingside",
                results: {
                    win: filterData(fianchettoDataFiltered, "Kingside", "Kingside", "win"),
                    lose: filterData(fianchettoDataFiltered, "Kingside", "Kingside", "lose"),
                    draw: filterData(fianchettoDataFiltered, "Kingside", "Kingside", "draw"),
                },
            },
            {
                you: "Kingside",
                them: "Queenside",
                results: {
                    win: filterData(fianchettoDataFiltered, "Kingside", "Queenside", "win"),
                    lose: filterData(fianchettoDataFiltered, "Kingside", "Queenside", "lose"),
                    draw: filterData(fianchettoDataFiltered, "Kingside", "Queenside", "draw"),
                },
            },
            {
                you: "Kingside",
                them: "Both",
                results: {
                    win: filterData(fianchettoDataFiltered, "Kingside", "Both", "win"),
                    lose: filterData(fianchettoDataFiltered, "Kingside", "Both", "lose"),
                    draw: filterData(fianchettoDataFiltered, "Kingside", "Both", "draw"),
                },
            },
            {
                you: "Queenside",
                them: "Kingside",
                results: {
                    win: filterData(fianchettoDataFiltered, "Queenside", "Kingside", "win"),
                    lose: filterData(fianchettoDataFiltered, "Queenside", "Kingside", "lose"),
                    draw: filterData(fianchettoDataFiltered, "Queenside", "Kingside", "draw"),
                },
            },
            {
                you: "Queenside",
                them: "Queenside",
                results: {
                    win: filterData(fianchettoDataFiltered, "Queenside", "Queenside", "win"),
                    lose: filterData(fianchettoDataFiltered, "Queenside", "Queenside", "lose"),
                    draw: filterData(fianchettoDataFiltered, "Queenside", "Queenside", "draw"),
                },
            },
            {
                you: "Queenside",
                them: "Both",
                results: {
                    win: filterData(fianchettoDataFiltered, "Queenside", "Both", "win"),
                    lose: filterData(fianchettoDataFiltered, "Queenside", "Both", "lose"),
                    draw: filterData(fianchettoDataFiltered, "Queenside", "Both", "draw"),
                },
            },
            {
                you: "Both",
                them: "Kingside",
                results: {
                    win: filterData(fianchettoDataFiltered, "Both", "Kingside", "win"),
                    lose: filterData(fianchettoDataFiltered, "Both", "Kingside", "lose"),
                    draw: filterData(fianchettoDataFiltered, "Both", "Kingside", "draw"),
                },
            },
            {
                you: "Both",
                them: "Queenside",
                results: {
                    win: filterData(fianchettoDataFiltered, "Both", "Queenside", "win"),
                    lose: filterData(fianchettoDataFiltered, "Both", "Queenside", "lose"),
                    draw: filterData(fianchettoDataFiltered, "Both", "Queenside", "draw"),
                },
            },
            {
                you: "Both",
                them: "Both",
                results: {
                    win: filterData(fianchettoDataFiltered, "Both", "Both", "win"),
                    lose: filterData(fianchettoDataFiltered, "Both", "Both", "lose"),
                    draw: filterData(fianchettoDataFiltered, "Both", "Both", "draw"),
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

export default useOtherStatsFianchetto;
