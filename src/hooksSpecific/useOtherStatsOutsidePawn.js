import { useState, useEffect } from 'react';

const useOtherStatsOutsidePawn = (hookInput) => {
    const [hookOutput, setHookOutput] = useState([])

    useEffect(() => {
        // Array is the list of parsed Match Objects
        if (!hookInput || hookInput.length === 0) { return };
        runHook();
    }, [hookInput]);

    function runHook() {

        // Get Outside Pawn games based on queenside/kingside and which one you did
        const outsidePawnLines = extractOutsidePawnLines(hookInput);

        // Filter non OutsidePawn games. Create Object summarising.
        const outsidePawnTotalObject = makeOutsidePawnTotalObject(outsidePawnLines);

        setHookOutput(outsidePawnTotalObject);
    };


    const extractOutsidePawnLines = (matchHistory) => {

        const extractOutput = [];

        matchHistory.forEach(match => {

            // Get the first 8 moves
            const whiteMoves = match['moves']['white'].slice(0, 8)
            const blackMoves = match['moves']['black'].slice(0, 8)

            // Locate outside pawn moves for White and Black
            let whiteOutsidePawnSide = null
            let blackOutsidePawnSide = null

            if(whiteMoves.includes("h3") || whiteMoves.includes("h4")) {whiteOutsidePawnSide = "Kingside"}
            if(whiteMoves.includes("a3") || whiteMoves.includes("a4")) {whiteOutsidePawnSide = "Queenside"}
            if(
                whiteMoves.includes("h3") || whiteMoves.includes("h4") || 
                whiteMoves.includes("a3") || whiteMoves.includes("a4")
            ) {whiteOutsidePawnSide = "Both"}


            if(blackMoves.includes("a6") || blackMoves.includes("a5")) {blackOutsidePawnSide = "Queenside"}
            if(blackMoves.includes("h3") || blackMoves.includes("h5")) {blackOutsidePawnSide = "Kingside"}
            if(
                blackMoves.includes("a6") || blackMoves.includes("a5") || 
                blackMoves.includes("h3") || blackMoves.includes("h5")
            ) {blackOutsidePawnSide = "Both"}


            // Create outside pawn object for single game. Add to output
            const outsidePawnObject = {
                gameId:         match.general.id,
                userPlayed:     match.results.userPlayed,
                result:         match.results.userResult,
                white:          whiteOutsidePawnSide,
                black:          blackOutsidePawnSide,
                you:            match.playerResults.userPlayed == "white" ? whiteOutsidePawnSide : blackOutsidePawnSide,
                them:           match.playerResults.userPlayed == "white" ? blackOutsidePawnSide : whiteOutsidePawnSide
            };

            extractOutput.push(outsidePawnObject);
        });

        return extractOutput;
    };



    const makeOutsidePawnTotalObject = (outsidePawnObjectArray) => {


        //
        // Function to filter outside pawn games on kingside/queenside
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
        // Remove any games with no outside pawn moves
        //
        const outsidePawnDataFiltered = outsidePawnObjectArray
            .filter(game => game.you !== null || game.them !== null
        );

        //
        // Create object that holds all outside pawn stats
        //
        const stats = [
            // Single-side combinations (null for one side)
            {
                you: "Kingside",
                them: null,
                results: {
                    win: filterData(outsidePawnDataFiltered, "Kingside", null, "win"),
                    lose: filterData(outsidePawnDataFiltered, "Kingside", null, "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Kingside", null, "draw"),
                },
            },
            {
                you: "Queenside",
                them: null,
                results: {
                    win: filterData(outsidePawnDataFiltered, "Queenside", null, "win"),
                    lose: filterData(outsidePawnDataFiltered, "Queenside", null, "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Queenside", null, "draw"),
                },
            },
            {
                you: "Both",
                them: null,
                results: {
                    win: filterData(outsidePawnDataFiltered, "Both", null, "win"),
                    lose: filterData(outsidePawnDataFiltered, "Both", null, "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Both", null, "draw"),
                },
            },
            {
                you: null,
                them: "Kingside",
                results: {
                    win: filterData(outsidePawnDataFiltered, null, "Kingside", "win"),
                    lose: filterData(outsidePawnDataFiltered, null, "Kingside", "lose"),
                    draw: filterData(outsidePawnDataFiltered, null, "Kingside", "draw"),
                },
            },
            {
                you: null,
                them: "Queenside",
                results: {
                    win: filterData(outsidePawnDataFiltered, null, "Queenside", "win"),
                    lose: filterData(outsidePawnDataFiltered, null, "Queenside", "lose"),
                    draw: filterData(outsidePawnDataFiltered, null, "Queenside", "draw"),
                },
            },
            {
                you: null,
                them: "Both",
                results: {
                    win: filterData(outsidePawnDataFiltered, null, "Both", "win"),
                    lose: filterData(outsidePawnDataFiltered, null, "Both", "lose"),
                    draw: filterData(outsidePawnDataFiltered, null, "Both", "draw"),
                },
            },
            // Dual-side combinations
            {
                you: "Kingside",
                them: "Kingside",
                results: {
                    win: filterData(outsidePawnDataFiltered, "Kingside", "Kingside", "win"),
                    lose: filterData(outsidePawnDataFiltered, "Kingside", "Kingside", "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Kingside", "Kingside", "draw"),
                },
            },
            {
                you: "Kingside",
                them: "Queenside",
                results: {
                    win: filterData(outsidePawnDataFiltered, "Kingside", "Queenside", "win"),
                    lose: filterData(outsidePawnDataFiltered, "Kingside", "Queenside", "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Kingside", "Queenside", "draw"),
                },
            },
            {
                you: "Kingside",
                them: "Both",
                results: {
                    win: filterData(outsidePawnDataFiltered, "Kingside", "Both", "win"),
                    lose: filterData(outsidePawnDataFiltered, "Kingside", "Both", "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Kingside", "Both", "draw"),
                },
            },
            {
                you: "Queenside",
                them: "Kingside",
                results: {
                    win: filterData(outsidePawnDataFiltered, "Queenside", "Kingside", "win"),
                    lose: filterData(outsidePawnDataFiltered, "Queenside", "Kingside", "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Queenside", "Kingside", "draw"),
                },
            },
            {
                you: "Queenside",
                them: "Queenside",
                results: {
                    win: filterData(outsidePawnDataFiltered, "Queenside", "Queenside", "win"),
                    lose: filterData(outsidePawnDataFiltered, "Queenside", "Queenside", "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Queenside", "Queenside", "draw"),
                },
            },
            {
                you: "Queenside",
                them: "Both",
                results: {
                    win: filterData(outsidePawnDataFiltered, "Queenside", "Both", "win"),
                    lose: filterData(outsidePawnDataFiltered, "Queenside", "Both", "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Queenside", "Both", "draw"),
                },
            },
            {
                you: "Both",
                them: "Kingside",
                results: {
                    win: filterData(outsidePawnDataFiltered, "Both", "Kingside", "win"),
                    lose: filterData(outsidePawnDataFiltered, "Both", "Kingside", "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Both", "Kingside", "draw"),
                },
            },
            {
                you: "Both",
                them: "Queenside",
                results: {
                    win: filterData(outsidePawnDataFiltered, "Both", "Queenside", "win"),
                    lose: filterData(outsidePawnDataFiltered, "Both", "Queenside", "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Both", "Queenside", "draw"),
                },
            },
            {
                you: "Both",
                them: "Both",
                results: {
                    win: filterData(outsidePawnDataFiltered, "Both", "Both", "win"),
                    lose: filterData(outsidePawnDataFiltered, "Both", "Both", "lose"),
                    draw: filterData(outsidePawnDataFiltered, "Both", "Both", "draw"),
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

export default useOtherStatsOutsidePawn;
