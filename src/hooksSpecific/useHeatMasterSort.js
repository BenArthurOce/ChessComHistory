import { useState, useEffect } from 'react';

const useHeatMasterSort = (hookInput, selectedTeam, firstMove, startTurn, endTurn) => {
    const [hookOutput, setHookOutput] = useState([]);

    useEffect(() => {
        if (!hookInput || hookInput.length === 0) return;
        if (!selectedTeam || selectedTeam.length === 0) return;
        if (!firstMove || firstMove.length === 0) return;

        runHook();
    }, [hookInput, selectedTeam, firstMove, startTurn, endTurn]);

    const runHook = () => {
        if (!hookInput[selectedTeam] || !hookInput[selectedTeam][firstMove]) return;

        const dataToUse = hookInput[selectedTeam][firstMove];
        const filteredData = Object.values(dataToUse)
            .flatMap(value => Object.values(value))
            .map(matches => filterMatchesByTurn(matches, startTurn, endTurn))
            .map(summarizeMatchData)
            .filter(summary => summary !== null); // Filter out null summaries

        setHookOutput(filteredData);
    };

    const filterMatchesByTurn = (matches, start, end) => {
        return matches.filter(match => {
            const turn = match.turn;
            const withinStart = start !== undefined ? turn >= start : true;
            const withinEnd = end !== undefined ? turn <= end : true;
            return withinStart && withinEnd;
        });
    };

    const summarizeMatchData = (matches) => {

        // matches = an array of matches which has been filtered by firstMove and startTurn 
        // Each match contains the firstmove, team, result, piece type and piece type
        if (matches.length === 0) return null;

        // console.log(matches);

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
        summary.winpct = summary.wins / matches.length;
        summary.winrate = summary.wins / matches.length * 100;
        summary.score = summary.winrate * summary.played;
        summary.isPositive = summary.winrate >= 50;

        // console.log(summary)

        // "summary" is an object which contents all the data required to make a heatmap tile, including a "score" and if the winrate is over 50%
        // It is an aggregation of all the matches within the parameter "matches"
        return summary;
    };

    return hookOutput;
};

export default useHeatMasterSort;
