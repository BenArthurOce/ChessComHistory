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

const useHeatmapControllerSortData = (hookInput, start, end, selectedTeam, firstMove) => {

    const [hookOutput, setHookOutput] = useState({})


    useEffect(() => {
        if (Object.values(hookInput).length === 0) {return}

        // // // console.log("====hookInput====");
        // // // console.log(hookInput);
        // // // console.log()

        const transformedData = filterAndTransformData(hookInput)
        setHookOutput(transformedData)
        // // console.log(transformedData)
    }, [hookInput, start, end, selectedTeam, firstMove]);


    const filterAndTransformData = (hookInput) => {
        const gameData = hookInput.filter(
            (obj) =>
                obj.team === selectedTeam &&
                obj.turn >= start &&
                obj.turn <= end &&
                obj.firstMove === firstMove

        );

        function performSecondaryFilterPlayed(moveString, data) {
            return data.filter((entry) => entry.move === moveString);
        }

        function performSecondaryFilterResult(moveString, resultString, data) {
            return data.filter(
                (entry) =>
                    entry.move === moveString && entry.result === resultString
            );
        }

        const classifyMove = (move) =>
            ({
                R: "Rook",
                N: "Knight",
                B: "Bishop",
                Q: "Queen",
                K: "King",
                O: "Castling",
            }[move[0]] || "Pawn");

        function returnMoveStats(move, data) {
            const test = {
                  move: move
                , played: performSecondaryFilterPlayed(move, data).length
                , win: performSecondaryFilterResult(move, "win", data).length
                , lose: performSecondaryFilterResult(move, "lose", data).length
                , draw: performSecondaryFilterResult(move, "draw", data).length
                , winpct: 0
                , piece: classifyMove(move)
                , nullcount: 0
                , matches: performSecondaryFilterPlayed(move, data)
            };

            test["winpct"] = (test["win"] / test["played"]) * 100;
            return test;
        }

        let uniqueMoves = Array.from(new Set(gameData.map((obj) => obj.move)));
        let moveStats = uniqueMoves.map((move) =>
            returnMoveStats(move, gameData)
        );

        // // // console.log("====uniqueMoves====");
        // // // console.log(uniqueMoves);
        // // // console.log();

        // Sort the moveStats array by the number of games played in descending order
        moveStats.sort((a, b) => b.played - a.played);

        const filterMoves = (moves, piece) =>
            moves.filter((move) => move.piece === piece);
        const filterPawnMoves = (moves) =>
            moves.filter((move) => move.piece === "Pawn");
        const filterCastlingMoves = (moves) =>
            moves.filter((move) => move.piece === "Castling");

        const categorizedMoves = {
            pawn: filterPawnMoves(moveStats),
            rook: filterMoves(moveStats, "Rook"),
            knight: filterMoves(moveStats, "Knight"),
            bishop: filterMoves(moveStats, "Bishop"),
            queen: filterMoves(moveStats, "Queen"),
            king: filterMoves(moveStats, "King"),
            castling: filterCastlingMoves(moveStats),
        };

        return categorizedMoves;
    };

    return hookOutput;

};

export default useHeatmapControllerSortData;
