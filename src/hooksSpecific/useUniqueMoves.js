import { useState, useEffect } from 'react';

const useUniqueMoves = (array) => {
    const [pieceMoves, setPieceMoves] = useState({})

    useEffect(() => {


        console.log(array)

        const start = 4
        const end = 6
        const selectedTeam = "White"

        // Array of objects. Each objects contains details about a single match
        const filteredMatchesByTeam = getFilteredMatches(array, selectedTeam)

        // Every unique move that the player did, based on a range of turns
        const uniqueSingleMoves = getUniqueMoves(filteredMatchesByTeam, start, end);

        // Every unique move, compared to match history to determine winrate of each move
        const winLossPerMove = getWinLossPerMove(filteredMatchesByTeam, uniqueSingleMoves, start, end, selectedTeam);

        // Sort uniqueMoveStats by played count in descending order
        const sortedMoves = sortMovesByPlayed(winLossPerMove);

        const categorizedMoves = {
            pawn: filterPawnMoves(sortedMoves),
            rook: filterMoves(sortedMoves, "R"),
            knight: filterMoves(sortedMoves, "N"),
            bishop: filterMoves(sortedMoves, "B"),
            queen: filterMoves(sortedMoves, "Q"),
            king: filterMoves(sortedMoves, "K"),
            castling: filterCastlingMoves(sortedMoves)
        };
        setPieceMoves(categorizedMoves);
    }, [array]);

    const getFilteredMatches = (matchHistory, userPlayed) => {
        return matchHistory.filter(({ results }) => {
            return (
                results.userPlayed === userPlayed
            );
        });
    };

    const getUniqueMoves = (matchHistory, start, end) => {
        // Function to extract moves between move numbers
        function extractMoves(movesArray) {
            return movesArray.slice(start, end);
        };

        // Use map to extract userMoves and filter moves between the start/end move, then flatMap to flatten
        const filteredUserMoves = matchHistory.map(game => extractMoves(game.playerResults.userMoves)).flatMap(moves => moves);
        const uniqueMoves = [...new Set(filteredUserMoves)];
        return uniqueMoves;
    };

    const getWinLossPerMove = (matchHistory, uniqueMoves, start, end, selectedTeam) => {
        const storedResults = {};
        uniqueMoves.forEach(move => {
            storedResults[move] = { move, win: 0, lose: 0, draw: 0, nullcount: 0, played: 0, winpct: 0 };

            matchHistory.forEach(match => {
                const team = match.playerResults.userPlayed;
                const outcome = match.playerResults.userResult;

                if (team === selectedTeam) {
                    const moves = match.moves[team].slice(start, end);
                    const exists = moves.includes(move);

                    if (!exists) {
                        storedResults[move].nullcount += 1;
                    } else {
                        if (outcome === "win") storedResults[move].win += 1;
                        if (outcome === "lose") storedResults[move].lose += 1;
                        if (outcome === "draw") storedResults[move].draw += 1;
                    }
                }
            });

            storedResults[move].played = storedResults[move].win + storedResults[move].lose + storedResults[move].draw;
            storedResults[move].winpct = (storedResults[move].win / storedResults[move].played) * 100;
        });

        return storedResults;
    };

    const sortMovesByPlayed = (moveStats) => {
        const sortedMoves = Object.values(moveStats).sort((a, b) => b.played - a.played);
        return sortedMoves;
    };

    const filterMoves = (movestats, code) => {
        return movestats.filter(({ move }) => move.startsWith(code));
    };

    const filterPawnMoves = (movestats) => {
        return movestats.filter(({ move }) => typeof move === 'string' && /^[a-z]/.test(move));
    };

    const filterCastlingMoves = (movestats) => {
        return movestats.filter(({ move }) => move.startsWith("O"));
    };

    const getColorClass = (winPercentage) => {
        if (winPercentage >= 60) return "heatmap-very-high";
        if (winPercentage > 50) return "heatmap-high";
        else if (winPercentage === 50) return "heatmap-medium";
        else if (winPercentage >= 40) return "heatmap-low";
        else return "heatmap-very-low";
    };

    return pieceMoves;
};

export default useUniqueMoves;
