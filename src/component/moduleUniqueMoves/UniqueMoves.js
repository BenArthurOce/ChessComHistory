import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./UniqueMoves.css";

import useIsMobile from "../../hooks/useIsMobile";

import useUniqueMovesDataset from "../../hooksSpecific/useUniqueMovesDataset";

const UniqueMoveTileStyled = styled.div
// `
//     position: absolute;
//     /* Add additional styles as needed */
//     top: ${(props) => props.top || "0px"};
//     left: ${(props) => props.left || "0px"};
//     background-color: ${(props) => props.bgColor || "white"};
//     padding: ${(props) => props.padding || "10px"};
//     border: ${(props) => props.border || "1px solid #ccc"};
//     border-radius: ${(props) => props.borderRadius || "5px"};
//     z-index: 10;
// `
;


const UniqueMoveTileStyledMobile = styled.div
// `
//     position: absolute;
//     /* Add additional styles as needed */
//     top: ${(props) => props.top || "0px"};
//     left: ${(props) => props.left || "0px"};
//     background-color: ${(props) => props.bgColor || "white"};
//     padding: ${(props) => props.padding || "10px"};
//     border: ${(props) => props.border || "1px solid #ccc"};
//     border-radius: ${(props) => props.borderRadius || "5px"};
//     z-index: 10;
// `
;


// {isMobile && selectedMove === moveObj && (
//     <UniqueMoveTile moveObj={moveObj} top="40px" left="10px" />
// )}


const UniqueMoveTile = (props) => {
    // console.log(props)
    const { moveObj, top, left, bgColor, padding, border, borderRadius } = props;

    return (
        <UniqueMoveTileStyled 
            top={top} 
            left={left} 
            bgColor={bgColor} 
            padding={padding} 
            border={border} 
            borderRadius={borderRadius}
        >
            <span><b>Move:</b> {moveObj.move}</span>
            <span><b>Rate:</b> {moveObj.winpct.toFixed(2)}%</span>
            <br />
            <span><b>Games:</b> {moveObj.played}</span>
            <span><b>Won:</b> {moveObj.win}</span>
            <span><b>Lost:</b> {moveObj.lose}</span>
            <span><b>Draw:</b> {moveObj.draw}</span>
            <span><b>Null:</b> {moveObj.nullcount}</span>
            <span><b>All Games:</b> {moveObj.win + moveObj.lose + moveObj.draw + moveObj.nullcount}</span>
        </UniqueMoveTileStyled>
    );
};


const MoveDetailsBubble = styled.div
`
    position: absolute;
    top: 40px;
    left: 10px;
    border: 5px solid black;
    border-radius: 5px;
    padding: 5px;
    z-index: 10;
    width: 120px;
    white-space: nowrap;

    span {
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin-bottom: 5px;
    }

    &.heatmap-high {
        background-color: #4caf50;
    }

    &.heatmap-medium {
        background-color: #ffeb3b;
    }

    &.heatmap-low {
        background-color: #ff9800;
    }

    &.heatmap-very-low {
        background-color: #f44336;
    }
`
;



const Container = styled.div`
    .container {
        margin-bottom: 20px;
    }
`;

const InputBoxes = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;

    label {
        font-weight: bold;
    }

    input[type="number"],
    select {
        padding: 8px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    input[type="number"] {
        width: 80px;
    }

    select {
        min-width: 120px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        height: 120px;
        position: sticky;
        left: 0;
        top: 0;
        background-color: white;
        padding: 10px;
        z-index: 100;
        align-items: start;
        padding: 10px;
        border: 5px solid #ccc;

        label {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
`;

const HeatmapContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;

    @media (max-width: 768px) {
        display: flex;
        gap: 10px;
    }
`;

const PieceSection = styled.div`
    margin-bottom: 20px;

    h3 {
        font-size: 18px;

        @media (max-width: 768px) {
            font-size: 15px;
        }
    }

    @media (max-width: 768px) {
        width: 12vw;
    }
`;

const HeatmapItem = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    position: relative;
    text-align: center;

    span {
        font-size: 12px;
    }

    &.heatmap-very-high {
        background-color: #4caf50;
    }

    &.heatmap-high {
        background-color: #8dbd4f;
    }

    &.heatmap-medium {
        background-color: #ffeb3b;
    }

    &.heatmap-low {
        background-color: #ff9800;
    }

    &.heatmap-very-low {
        background-color: #f44336;
    }
`;



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

    const [dataToRender, setDataToRender] = useState(null);

    const [start, setStart] = useState(8); // Default start value
    const [end, setEnd] = useState(15);   // Default end value
    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team
    const [selectedMove, setSelectedMove] = useState(null); // for Mobile - Displays Bubble if selected


    const [renderFlag, setRenderFlag] = useState(false);

    const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device

    const hookDataSet = useUniqueMovesDataset(props.matchHistory)


    useEffect(() => {
        if (Array.isArray(hookDataSet)) {
            const endData = filterAndTransformData();
            setDataToRender(endData);
            setRenderFlag(checkIfAbleToRender(endData));
            // console.log(dataToRender)
            // console.log(pieceMoves)
        } else {
            setDataToRender(null);
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

        console.log(gameData)

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
        console.log(uniqueMoves)
        let moveStats = uniqueMoves.map(move => returnMoveStats(move, gameData));
    
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
        console.log(moveStats)
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

                        {/* storedResults[move] = { move, win: 0, lose: 0, draw: 0, nullcount: 0, played: 0, winpct: 0 }; */}
                        {moves.map((moveObj) => (
                            <div
                                key={moveObj.move}
                                className={`heatmap-item ${getColorClass(moveObj.winpct)}`}
                                onClick={() => handleMobileClick(moveObj)}
                            >


                            {/* If viewport is Mobile */}
                            {hookIsMobile && (
                                    <span>{moveObj.move}</span>
                            )}


                            {/* If viewport is Mobile and user clicked */}
                            {hookIsMobile && selectedMove === moveObj && (
                                    <div className={`move-details-bubble heatmap-item ${getColorClass(moveObj.winpct)}`}>
                                        <span><p><b>Move:</b></p> <p>{moveObj.move}</p></span>
                                        <span><p><b>Rate:</b></p> <p>{moveObj.winpct.toFixed(2)}%</p></span>
                                        <br></br>
                                        <span><p><b>Games:</b></p> <p>{moveObj.played}</p></span>
                                        <span><p><b>Won:</b></p> <p>{moveObj.win}</p></span>
                                        <span><p><b>Lost:</b></p> <p>{moveObj.lose}</p></span>
                                        <span><p><b>Draw:</b></p> <p>{moveObj.draw}</p></span>
                                        <span><p><b>Null:</b></p> <p>{moveObj.nullcount}</p></span>
                                        <span><p><b>All Games:</b></p> <p>{moveObj.win + moveObj.lose + moveObj.draw + moveObj.nullcount}</p></span>
                                    </div>
                                )}



                            {/* If viewport is PC */}
                            {!hookIsMobile && (
                                <div>
                                    <span>{moveObj.move}</span>
                                    <br></br>
                                    <span>Games: {moveObj.played}</span>
                                    <br></br>
                                    <span>Win Rate: {moveObj.winpct.toFixed(2)}%</span>

                                        {/* <span><p><b>Move:</b></p> <p>{moveObj.move}</p></span>
                                        <span><p><b>Rate:</b></p> <p>{moveObj.winpct.toFixed(2)}%</p></span>
                                        <br></br>
                                        <span><p><b>Games:</b></p> <p>{moveObj.played}</p></span>
                                        <span><p><b>Won:</b></p> <p>{moveObj.win}</p></span>
                                        <span><p><b>Lost:</b></p> <p>{moveObj.lose}</p></span>
                                        <span><p><b>Draw:</b></p> <p>{moveObj.draw}</p></span>
                                        <span><p><b>Null:</b></p> <p>{moveObj.nullcount}</p></span>
                                        <span><p><b>Review:</b></p> <p>{moveObj.win + moveObj.lose + moveObj.draw + moveObj.nullcount}</p></span> */}
                                </div>
                            )}

                            </div>
                            
                            
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UniqueMoves;

