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

        const aa = summarizeMatchData(dataToUse);
        // console.log

        

        console.log("-----")
        // console.log(dataToUse)
        // console.log("-----")
        // const filteredData = Object.values(dataToUse)
        // console.log(filteredData)

        // .filter(match => {
        //     console.log("Match before filtering:", match);
        //     return match && typeof match.firstMove === firstMove;  // Filter out invalid matches
        // })

        // console.log(filteredData)
        // setHookOutput(filteredData);
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

export default useHeatMasterSort;
