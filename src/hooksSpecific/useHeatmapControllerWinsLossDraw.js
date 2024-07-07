// useHeatmapControllerDataset

/* 
This hook intakes an array filled with objects that summarise a move, what turn it was on, and what game it was played in
Object: {"id": 0, "isCapture": bool, "isCheck": bool, "move": 0, "piece": -, "result": -, "team": -, "turn": 0}

this data is created in HeatmapController, by using the useHeatmapControllerDataset hook
*/

/* 
The output is an array of objects with no key. The are each unique move the player has done from the hook input, and categorized/totaled into their winrates
Object: {"draw": 0, "lose": 0, "matches": [], "move": -, "nullcount": 0, "piece": -, "played": 0, "win": 0, "winpct": 0}
*/

import { useState, useEffect } from 'react';

const useHeatmapControllerWinsLossDraw = (hookInput, selectedTeam, firstMove) => {

    const [hookOutput, setHookOutput] = useState({})
    // // // console.log(hookInput)


    useEffect(() => {

        if (Object.values(hookInput).length === 0) {return};


        // Reduce the array of Matches by firstMove
        const filteredByFirstMove = hookInput.filter((obj) => obj.firstMove === firstMove)

        // Reduce the number of Matches by white/black
        const filteredByTeam = filteredByFirstMove.filter((obj) => obj.team === selectedTeam)

        // Filter moves by turn number
        const organizedMoves = organizeMovesByTurn(filteredByTeam)

        // Apply a winRate, score and if over 50% winrate per turn and move (returns an array)
        const arrayOfWinrate = runHook(organizedMoves)

        const topPositiveMoves = getTopPositiveMoves(arrayOfWinrate);
        // // // console.log(topPositiveMoves);
        // // // console.log(finalresult)

        // const organizedData = runHook(filteredByTeam);
        // // // console.log(organizedData)

        // const organizedMoves = organizeMovesByTurn(hookInput);
        setHookOutput(topPositiveMoves)

        
    }, [hookInput, selectedTeam, firstMove]);


    const runHook = (dataSet) => {

        const result = []


        const filterResult = (resultString, dataArray) => {
            const data = dataArray.filter(
                (obj) =>
                    obj.result === resultString
            );
            return data;
        };

        // // // console.log(dataSet)

        for (let key in dataSet) {
            if (dataSet.hasOwnProperty(key)) {
                let value = dataSet[key];

                // // // console.log(key, value);
                // // // console.log(value)

                for (let key2 in value) {
                    let value2 = value[key2];

                    // // // console.log(key2, value2);

                    // // // console.log(key2)
                    // // // console.log(key)

                    const wins = filterResult("win", value2).length;
                    const losses  = filterResult("lose", value2).length;
                    const draws  = filterResult("draw", value2).length;
                    const played = wins + losses + draws;

                    const winpct = (wins / played)
                    const winrate = ((wins / played) * 100)
                    const score = winrate * played  // Tries to get games over 1 played - 100%
                    const isPositive = winrate >= 50

                    const objectSample = {"turn": key, "move": key2, "played": played, "win": wins, "lose": losses, "draw": draws, "winpct": winrate, "score": score, "isPositive": isPositive, "matches": []}

                    result.push(objectSample)

                };
            };   
        }
        return result
    };

    const getTopPositiveMoves = (movesArray) => {
        // Group moves by turn
        const movesByTurn = movesArray.reduce((acc, move) => {
            const turn = move.turn;
            if (!acc[turn]) {
                acc[turn] = [];
            }
            acc[turn].push(move);
            return acc;
        }, {});

        // Filter and sort moves within each turn
        const topMovesPerTurn = Object.keys(movesByTurn).reduce((result, turn) => {
            const moves = movesByTurn[turn];

            // Filter moves where isPositive is true
            const positiveMoves = moves.filter(move => move.isPositive);

            // Filter moves where played is greater than 1
            const moreThanOneMove = positiveMoves.filter(move => move.played > 1);

            // Sort positiveMoves by score in descending order
            moreThanOneMove.sort((a, b) => b.score - a.score);

            // Take top 4 moves for this turn
            result[turn] = moreThanOneMove.slice(0, 4);
            return result;
        }, {});

        return topMovesPerTurn;
    }







    // Filters array of ParsedMoveObjects by Move, Turn Number, Win/Loss/Draw and White/Black
    const filterResult = (resultString, dataArray) => {
        const data = dataArray.filter(
            (obj) =>
                obj.result === resultString
        );
        return data;
    };

    // Filters array of ParsedMoveObjects by Move, Turn Number, Win/Loss/Draw and White/Black
    const filterData = (moveString, moveNumber, resultString, teamString, dataArray) => {
        const data = dataArray.filter(
            (obj) =>
                obj.move === moveString &&
                obj.turn === moveNumber &&
                obj.result === resultString &&
                obj.team === teamString 
        );
        return data;
    };


    const organizeMovesByTurn = (moves) => {
        // // // console.log(moves)
        return moves.reduce((acc, move) => {
            if (!acc[move.turn]) {
                acc[move.turn] = {};
            }
            if (!acc[move.turn][move.move]) {
                acc[move.turn][move.move] = [];
            }
            acc[move.turn][move.move].push(move);
            return acc;
        }, {});
    };

    return hookOutput;

};

export default useHeatmapControllerWinsLossDraw;
