import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./UniqueMoves.css";

import useIsMobile from "../../hooks/useIsMobile";

import useUniqueMovesDataset from "../../hooksSpecific/useUniqueMovesDataset";
import HeatmapTile from "./HeatmapTile";

import MatchHistoryDisplay from "../moduleMatchHistoryDisplay/MatchHistoryDisplay";

const HeatmapController = (props) => {
    const [pieceMoves, setPieceMoves] = useState({
        pawn: [],
        rook: [],
        knight: [],
        bishop: [],
        queen: [],
        king: [],
        castling: [],
    });

    // console.log(props)
    const [start, setStart] = useState(0); // Default start value
    const [end, setEnd] = useState(5); // Default end value
    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team

    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const [selectedMatch, setSelectedMatch] = useState(null); // State to hold selected match details

    const [popupMatchHistory, setPopupMatchHistory] = useState(null); // State to hold selected match details

    const [singleTileSelected, setSingleTileSelected] = useState(null); // for Mobile - Displays Bubble if selected

    const [renderFlag, setRenderFlag] = useState(false);

    const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device

    const hookDataSet = useUniqueMovesDataset(props.matchHistory);

    useEffect(() => {
        if (Array.isArray(hookDataSet)) {
            console.log("====hookDataSet====");
            console.log(hookDataSet);
            console.log();

            const endData = filterAndTransformData();
            setRenderFlag(checkIfAbleToRender(endData));
        } else {
            // setDataToRender(null);
            setRenderFlag(false);
        }
    }, [hookDataSet, start, end, selectedTeam]);

    // Once the UI has been updated, we read the DataSet from the hook, and transform it into stats by each unique move
    const filterAndTransformData = () => {
        const gameData = hookDataSet.filter(
            (obj) =>
                obj.team === selectedTeam &&
                obj.turn >= start &&
                obj.turn <= end
        );

        console.log("====gameData====");
        console.log(gameData);
        console.log();

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
                move: move,
                win: performSecondaryFilterResult(move, "win", data).length,
                lose: performSecondaryFilterResult(move, "lose", data).length,
                draw: performSecondaryFilterResult(move, "draw", data).length,
                played: performSecondaryFilterPlayed(move, data).length,
                piece: classifyMove(move),
                nullcount: 0,
                winpct: 0,
                matches: performSecondaryFilterPlayed(move, data),
            };

            test["winpct"] = (test["win"] / test["played"]) * 100;
            return test;
        }

        let uniqueMoves = Array.from(new Set(gameData.map((obj) => obj.move)));
        let moveStats = uniqueMoves.map((move) =>
            returnMoveStats(move, gameData)
        );

        console.log("====uniqueMoves====");
        console.log(uniqueMoves);
        console.log();

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

        setPieceMoves(categorizedMoves);

        // console.log("====moveStats====")
        // console.log(moveStats)
        // console.log()

        return moveStats;
    };

    const checkIfAbleToRender = (object) => {
        if (object === null || object === undefined) {
            return false;
        }
        if (object.length <= 1) {
            return false;
        }
        return true;
    };

    const handleStartChange = (event) => {
        setStart(parseInt(event.target.value));
    };

    const handleEndChange = (event) => {
        setEnd(parseInt(event.target.value));
    };

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };

    // On mobile, small popup if tapped
    const handleMobileClick = (move) => {
        if (hookIsMobile) {
            setSingleTileSelected(move);
        }
    };

    // When Clicking on a Heatmap Tile, you will get the matches where the game happened
    const handleIndividualTileClick = (tile) => {
        const matchHistory = props.matchHistory;
        const arrayMatchId = tile.matches.map((entry) => entry.id);

        function filterMatchHistory(matchHistory, array) {
            return matchHistory.filter((obj) => array.includes(obj.general.id));
        }

        const result = filterMatchHistory(matchHistory, arrayMatchId);
        // console.log(result)

        setPopupMatchHistory(result);
        setShowPopup(true);
    };

    // const handleIndividualTileClick = (tile) => {
    //     // Handle click on heatmap tile to show popup
    //     setSelectedMatch(tile.matches); // Assuming tile.matches holds match details
    //     setShowPopup(true);
    //   };

    return (
        <div className="container">
            <h2>Winning Moves Heatmap</h2>
            <div className="input-boxes">
                <div>
                    <label htmlFor="startInput">Start:</label>
                    <input id="startInput" type="number" value={start} onChange={handleStartChange} />
                    <label htmlFor="endInput">End:</label>
                    <input id="endInput" type="number" value={end} onChange={handleEndChange} />
                </div>
                <div>
                    <label htmlFor="teamSelect">Select Team:</label>
                    <select id="teamSelect" value={selectedTeam} onChange={handleTeamChange}>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                    </select>
                </div>
            </div>
            <div className="heatmap-container">
                {Object.entries(pieceMoves).map(([pieceType, moves]) => (
                    <div key={pieceType} className="piece-section">
                        <h3>{pieceType.toUpperCase()} Moves</h3>

                        {/* {moves.map((moveObj) => (
                            <div
                                key={moveObj.move}
                                className={`heatmap-item ${getColorClass(moveObj.winpct)}`}
                                onClick={() => handleMobileClick(moveObj)}
                            > */}

                            {/* {moves.map((moveObj) => (
                                <div onClick={() => handleMobileClick(moveObj)}>
                                    <HeatmapTile tileInformation={moveObj} isClicked={singleTileSelected===moveObj} >

                                    </HeatmapTile>
                                </div>
                            ))} */}

                            {moves.map((moveObj) => (
                            <div key={moveObj.move}>
                                <HeatmapTile
                                tileInformation={moveObj}
                                isClicked={singleTileSelected === moveObj}
                                handleTileClick={handleIndividualTileClick} // Pass the handler here
                                />
                            </div>
                            ))}
                    </div>
                ))}
            </div>

            
      {/* Conditionally render MatchHistoryDisplay as popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <button className="close-button" onClick={() => setShowPopup(false)}>
              Close
            </button>
            <MatchHistoryDisplay matchHistory={popupMatchHistory} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeatmapController;