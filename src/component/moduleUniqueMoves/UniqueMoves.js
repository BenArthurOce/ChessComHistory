import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./UniqueMoves.css";

import useIsMobile from "../../hooks/useIsMobile";

import useUniqueMovesDataset from "../../hooksSpecific/useUniqueMovesDataset";
import HeatmapTile from "./HeatmapTile";



const UniqueMoves = (props) => {
    const [pieceMoves, setPieceMoves] = useState({
        pawn: [],
        rook: [],
        knight: [],
        bishop: [],
        queen: [],
        king: [],
        castling: []
    });


    const [start, setStart] = useState(0); // Default start value
    const [end, setEnd] = useState(5);   // Default end value
    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team
    const [selectedMove, setSelectedMove] = useState(null); // for Mobile - Displays Bubble if selected


    const [renderFlag, setRenderFlag] = useState(false);

    const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device

    const hookDataSet = useUniqueMovesDataset(props.matchHistory)


    useEffect(() => {
        if (Array.isArray(hookDataSet)) {
            console.log("====hookDataSet====")
            console.log(hookDataSet)
            console.log()

            const endData = filterAndTransformData();
            // setDataToRender(endData);

            setRenderFlag(checkIfAbleToRender(endData));
            // console.log(dataToRender)
            // console.log(pieceMoves)
        } else {
            // setDataToRender(null);
            setRenderFlag(false);
        }
    }, [hookDataSet, start, end, selectedTeam]);


    // Once the UI has been updated, we read the DataSet from the hook, and transform it into stats by each unique move
    const filterAndTransformData = () => {
        const gameData = hookDataSet.filter(obj => (
            obj.team === selectedTeam &&
            obj.turn >= start &&
            obj.turn <= end
        ));

        console.log("====gameData====")
        console.log(gameData)
        console.log()

        function performSecondaryFilterPlayed(moveString, data) {
            return data.filter(entry => (entry.move === moveString))
        };

        function performSecondaryFilterResult(moveString, resultString, data) {
            return data.filter(entry => (entry.move === moveString && entry.result === resultString ))
        };

        const classifyMove = (move) => ({
            R: "Rook",
            N: "Knight",
            B: "Bishop",
            Q: "Queen",
            K: "King",
            O: "Castling"
        })[move[0]] || "Pawn";


        function returnMoveStats(move, data) {
            const test = {
                "move": move
                , "win": performSecondaryFilterResult(move, "win", data).length
                , "lose": performSecondaryFilterResult(move, "lose", data).length
                , "draw": performSecondaryFilterResult(move, "draw", data).length
                , "played": performSecondaryFilterPlayed(move, data).length
                , "piece": classifyMove(move)
                , "nullcount": 0
                , "winpct": 0
            }

            test["winpct"] = (test["win"] / test["played"]) * 100;
            return test
        };



        let uniqueMoves = Array.from(new Set(gameData.map(obj => obj.move)));
        let moveStats = uniqueMoves.map(move => returnMoveStats(move, gameData));

        console.log("====uniqueMoves====")
        console.log(uniqueMoves)
        console.log()

    
        // Sort the moveStats array by the number of games played in descending order
        moveStats.sort((a, b) => b.played - a.played);
    
        const filterMoves = (moves, piece) => moves.filter(move => move.piece === piece);
        const filterPawnMoves = (moves) => moves.filter(move => move.piece === "Pawn");
        const filterCastlingMoves = (moves) => moves.filter(move => move.piece === "Castling");
    
    
        const categorizedMoves = {
            pawn: filterPawnMoves(moveStats),
            rook: filterMoves(moveStats, "Rook"),
            knight: filterMoves(moveStats, "Knight"),
            bishop: filterMoves(moveStats, "Bishop"),
            queen: filterMoves(moveStats, "Queen"),
            king: filterMoves(moveStats, "King"),
            castling: filterCastlingMoves(moveStats)
        };
    
        setPieceMoves(categorizedMoves);
        // console.log(moveStats)

        console.log("====moveStats====")
        console.log(moveStats)
        console.log()

        return moveStats;
    };


    const checkIfAbleToRender = (object) => {
        if (object === null || object === undefined) {return false}
        if (object.length <= 1) {return false}
        return true
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
            setSelectedMove(move);
        }
    };

    const getColorClass = (winPercentage) => {
        if (winPercentage >= 60) return "heatmap-very-high";
        if (winPercentage > 50) return "heatmap-high";
        else if (winPercentage == 50) return "heatmap-medium";
        else if (winPercentage >= 40) return "heatmap-low";
        else return "heatmap-very-low";
    };

    // return (
    //     <div>


    //         {renderFlag && dataToRender && (
    //             <InputBoxes>
    //                 <div>
    //                     <label htmlFor="startInput">Start:</label>
    //                     <input id="startInput" type="number" value={start} onChange={handleStartChange} />
    //                     <label htmlFor="endInput">End:</label>
    //                     <input id="endInput" type="number" value={end} onChange={handleEndChange} />
    //                 </div>
    //                 <div>
    //                     <label htmlFor="teamSelect">Select Team:</label>
    //                     <select id="teamSelect" value={selectedTeam} onChange={handleTeamChange}>
    //                         <option value="white">White</option>
    //                         <option value="black">Black</option>
    //                     </select>
    //                 </div>
    //             </InputBoxes>  
    //         )};




    //         {renderFlag && dataToRender.map((move, index) => (
    //             // <div key={index}>
    //             //     {/* Render move details as needed */}
    //             //     <span>{move.move}</span>
    //             //     {/* Example: Replace with actual move details */}
    //             // </div>

    //             <div className={`move-details-bubble heatmap-item`}>
    //                 <span><p><b>Move:</b></p> <p>{move.move}</p></span>
    //                 {/* <span><p><b>Rate:</b></p> <p>{move.winpct.toFixed(2)}%</p></span> */}
    //                 <br></br>
    //                 {/* <span><p><b>Games:</b></p> <p>{move.played}</p></span> */}
    //                 <span><p><b>Won:</b></p> <p>{move.win}</p></span>
    //                 {/* <span><p><b>Lost:</b></p> <p>{move.lose}</p></span>
    //                 <span><p><b>Draw:</b></p> <p>{move.draw}</p></span>
    //                 <span><p><b>Null:</b></p> <p>{move.nullcount}</p></span>
    //                 <span><p><b>All Games:</b></p> <p>{move.win + move.lose + move.draw + move.nullcount}</p></span> */}
    //             </div>
    //         ))}
    //     </div>
    // );

    // return (
    //     <Container>
    //         <h2>Winning Moves Heatmap</h2>

            // <InputBoxes>
            //     <div>
            //         <label htmlFor="startInput">Start:</label>
            //         <input id="startInput" type="number" value={start} onChange={handleStartChange} />
            //         <label htmlFor="endInput">End:</label>
            //         <input id="endInput" type="number" value={end} onChange={handleEndChange} />
            //     </div>
            //     <div>
            //         <label htmlFor="teamSelect">Select Team:</label>
            //         <select id="teamSelect" value={selectedTeam} onChange={handleTeamChange}>
            //             <option value="white">White</option>
            //             <option value="black">Black</option>
            //         </select>
            //     </div>
            // </InputBoxes>

    //         <HeatmapContainer>
    //             {Object.entries(dataToRender).map(([pieceType, moves]) => (
    //                 <PieceSection key={pieceType}>
    //                     <h3>{pieceType.toUpperCase()} Moves</h3>
    //                     {moves.map((moveObj) => (
    //                         <HeatmapItem
    //                             key={moveObj.move}
    //                             // className={getColorClass(moveObj.winpct)}
    //                             onClick={() => handleMobileClick(moveObj)}
    //                         >
    //                             {isMobile && <span>{moveObj.move}</span>}
    //                             {isMobile && selectedMove === moveObj && (
    //                                 <UniqueMoveTile moveObj={moveObj} top="40px" left="10px" />
    //                             )}
    //                             {!isMobile && (
    //                                 <div>
    //                                     <span>{moveObj.move}</span>
    //                                     <br />
    //                                     <span>Games: {moveObj.played}</span>
    //                                     <br />
    //                                     <span>Win Rate: {moveObj.winpct.toFixed(2)}%</span>
    //                                 </div>
    //                             )}
    //                         </HeatmapItem>
    //                     ))}
    //                 </PieceSection>
    //             ))}
    //         </HeatmapContainer>
            
    //     </Container>
    // );
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

                            {moves.map((moveObj) => (
                                <HeatmapTile tileInformation = {moveObj} >

                                </HeatmapTile>
                            ))}
                    </div>
                ))}
            </div>
        </div>
    )
};

export default UniqueMoves;


            {/* {!loading && data && (
                <section id="matchHistory">
                    {arrayMatches && (
                        <div>
                            {arrayMatches.map((match, index) => (
                                index < matchesToDisplay && <SingleMatch key={index} gameInformation={match} />
                            ))}
                        </div>
                    )}
                </section>
            )} */}
// {!loading && data && (
//     <section id="matchHistory">
//         {arrayMatches && (
//             <div>
//                 {arrayMatches.map((match, index) => (
//                     index < matchesToDisplay && <SingleMatch key={index} gameInformation={match} />
//                 ))}
//             </div>
//         )}
//     </section>
// )}