import { useState, useEffect } from 'react';

const useHeatmapControllerByTeamStartMove = (hookInput, selectedTeam, firstMove, start, end) => {
    const [hookOutput, setHookOutput] = useState([]);

    useEffect(() => {
        if (Object.values(hookInput).length === 0) return;
        if (!selectedTeam || selectedTeam.length === 0) return;
        if (!firstMove || firstMove.length === 0) return;
        if (!start || start.length === 0) return;
        if (!end || end.length === 0) return;

        runHook();
    }, [hookInput, selectedTeam, firstMove, start, end]);

    const runHook = () => {
        if (!hookInput[selectedTeam] || !hookInput[selectedTeam][firstMove]) return;

        const reletiveMoves = hookInput[selectedTeam][firstMove];
        const filteredByTurnNumber = reletiveMoves.filter((line) => line.turn >= start && line.turn <= end);

        const getUniqueMoveArray = (moveData) => {
            const allMoves = (moveData.map((line) => line.move)).sort();
            return new Set(allMoves);
        };

        const filterByMove = (array, move) => {
            return array.filter((line) => line.move === move);
        };

        // Get array of unique moves that player performed in the range of turns defined by the hook
        const allUniqueMoves = getUniqueMoveArray(filteredByTurnNumber);

        // Loop through each unique move, get its data lines and summarize it
        const summarizedMoves = {};
        allUniqueMoves.forEach(move => {
            const moveMatches = filterByMove(filteredByTurnNumber, move);
            summarizedMoves[move] = summarizeMatchData(moveMatches);
        });

        setHookOutput(summarizedMoves);
    };

    const summarizeMatchData = (matches) => {
        // Summarize the matches for a specific move
        if (matches.length === 0) return null;

        const firstMatch = matches[0];
        const summary = matches.reduce((acc, match) => {
            acc.matchIds.push(match.id);
            if (match.result === 'win') acc.wins += 1;
            if (match.result === 'lose') acc.losses += 1;
            if (match.result === 'draw') acc.draws += 1;
            return acc;
        }, {
            wins: 0,
            losses: 0,
            draws: 0,
            firstMove: firstMatch.firstMove,
            turn: firstMatch.turn,
            team: firstMatch.team,
            move: firstMatch.move,
            piece: firstMatch.piece,
            matchIds: []
        });

        summary.played = matches.length;
        summary.winpct = (summary.wins / matches.length) * 100;
        summary.winrate = summary.wins / matches.length * 100;
        summary.score = summary.winrate * summary.played;
        summary.isPositive = summary.winrate >= 50;

        return summary;
    };

    return hookOutput;
};

export default useHeatmapControllerByTeamStartMove;
