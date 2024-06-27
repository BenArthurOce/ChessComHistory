import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useIsMobile from "../hooks/useIsMobile";
import useTestHook from "../hooks/useTestHook";


const UniqueMoveTileStyled = styled.div
`
    position: absolute;
    /* Add additional styles as needed */
    top: ${(props) => props.top || "0px"};
    left: ${(props) => props.left || "0px"};
    background-color: ${(props) => props.bgColor || "white"};
    padding: ${(props) => props.padding || "10px"};
    border: ${(props) => props.border || "1px solid #ccc"};
    border-radius: ${(props) => props.borderRadius || "5px"};
    z-index: 10;
`
;


const UniqueMoveTileStyledMobile = styled.div
`
    position: absolute;
    /* Add additional styles as needed */
    top: ${(props) => props.top || "0px"};
    left: ${(props) => props.left || "0px"};
    background-color: ${(props) => props.bgColor || "white"};
    padding: ${(props) => props.padding || "10px"};
    border: ${(props) => props.border || "1px solid #ccc"};
    border-radius: ${(props) => props.borderRadius || "5px"};
    z-index: 10;
`
;


// {isMobile && selectedMove === moveObj && (
//     <UniqueMoveTile moveObj={moveObj} top="40px" left="10px" />
// )}


const UniqueMoveTile = (props) => {
    console.log(props)
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

    const [start, setStart] = useState(8); // Default start value
    const [end, setEnd] = useState(15);   // Default end value
    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team
    const [selectedMove, setSelectedMove] = useState(null); // for Mobile - Displays Bubble if selected
    const isMobile = useIsMobile(); // Custom hook to test if mobile device

    const myTestHook = useTestHook(); // Custom hook to test if mobile device

    // console.log(props.matchHistory)

    useEffect(() => {

        const a = myTestHook
        console.log(a)
        // Array of objects. Each objects contains details about a single match
        const filteredMatchesByTeam = getFilteredMatches(props.matchHistory, selectedTeam)

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
    }, [props.matchHistory, start, end, selectedTeam]);

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
        else if (winPercentage == 50) return "heatmap-medium";
        else if (winPercentage >= 40) return "heatmap-low";
        else return "heatmap-very-low";
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

    const handleMobileClick = (move) => {
        if (isMobile) {
            setSelectedMove(move);
        }
    };

    return (
        <Container>
            <h2>Winning Moves Heatmap</h2>

            <InputBoxes>
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
            </InputBoxes>

            <HeatmapContainer>
                {Object.entries(pieceMoves).map(([pieceType, moves]) => (
                    <PieceSection key={pieceType}>
                        <h3>{pieceType.toUpperCase()} Moves</h3>
                        {moves.map((moveObj) => (
                            <HeatmapItem
                                key={moveObj.move}
                                className={getColorClass(moveObj.winpct)}
                                onClick={() => handleMobileClick(moveObj)}
                            >
                                {isMobile && <span>{moveObj.move}</span>}
                                {isMobile && selectedMove === moveObj && (
                                    <UniqueMoveTile moveObj={moveObj} top="40px" left="10px" />
                                )}
                                {!isMobile && (
                                    <div>
                                        <span>{moveObj.move}</span>
                                        <br />
                                        <span>Games: {moveObj.played}</span>
                                        <br />
                                        <span>Win Rate: {moveObj.winpct.toFixed(2)}%</span>
                                    </div>
                                )}
                            </HeatmapItem>
                        ))}
                    </PieceSection>
                ))}
            </HeatmapContainer>
            
        </Container>
    );
};

export default UniqueMoves;







// Backup Code

// import React, { useState, useEffect } from "react";
// import "./UniqueMoves.css";
// import useIsMobile from "../hooks/useIsMobile";

// const UniqueMoves = (props) => {
//     const [pieceMoves, setPieceMoves] = useState({
//         pawn: [],
//         rook: [],
//         knight: [],
//         bishop: [],
//         queen: [],
//         king: [],
//         castling: []
//     });


//     const [start, setStart] = useState(8); // Default start value
//     const [end, setEnd] = useState(15);   // Default end value
//     const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team

//     const [selectedMove, setSelectedMove] = useState(null); // for Mobile - Displays Bubble if selected
//     const isMobile = useIsMobile(); // Custom hook to test if mobile device





//     useEffect(() => {

//         // Array of objects. Each objects contains details about a single match
//         const filteredMatchesByTeam = getFilteredMatches(props.matchHistory, selectedTeam)

//         // Every unique move that the player did, based on a range of turns
//         const uniqueSingleMoves = getUniqueMoves(filteredMatchesByTeam, start, end);

//         // Every unique move, compared to match history to determie winrate of each move
//         const winLossPerMove = getWinLossPerMove(filteredMatchesByTeam, uniqueSingleMoves, start, end, selectedTeam);
//         // console.log(winLossPerMove)

//         // Sort uniqueMoveStats by played count in descending order
//         const sortedMoves = sortMovesByPlayed(winLossPerMove);

//         const categorizedMoves = {
//               pawn: filterPawnMoves(sortedMoves)
//             , rook: filterMoves(sortedMoves, "R")
//             , knight: filterMoves(sortedMoves, "N")
//             , bishop: filterMoves(sortedMoves, "B")
//             , queen: filterMoves(sortedMoves, "Q")
//             , king: filterMoves(sortedMoves, "K")
//             , castling: filterCastlingMoves(sortedMoves)
//         };
//         setPieceMoves(categorizedMoves);
//     }, [props.matchHistory, start, end, selectedTeam]);


//     const getFilteredMatches = (matchHistory, userPlayed) => {
//         return matchHistory.filter(({ results }) => {
//             return (
//                 results.userPlayed === userPlayed
//             );
//         });
//     };


//     const getUniqueMoves = (matchHistory, start, end) => {
//         // Function to extract moves between move numbers
//         function extractMoves(movesArray) {
//             return movesArray.slice(start, end); // Slice from index 8 to 15 (16 is exclusive)
//         };

//         // Use map to extract userMoves and filter moves between the start/end move, then flatMap to flatten
//         const filteredUserMoves = matchHistory.map(game => extractMoves(game.playerResults.userMoves)).flatMap(moves => moves);
//         const uniqueMoves = [...new Set(filteredUserMoves)];
//         return uniqueMoves;
//     };



//     const getWinLossPerMove = (matchHistory, uniqueMoves, start, end, selectedTeam) => {
//         const storedResults = {};      
//         uniqueMoves.forEach(move => {

//             storedResults[move] = { move, win: 0, lose: 0, draw: 0, nullcount: 0, played: 0, winpct: 0 };

//             matchHistory.forEach(match => { 

//                 const team = match.playerResults.userPlayed;
//                 const outcome = match.playerResults.userResult;

//                 if (team === selectedTeam) {
//                     const moves = match.moves[team].slice(start, end);
//                     const exists = moves.includes(move);
                    
//                     if (!exists) {
//                         storedResults[move].nullcount += 1;
//                     } else {
//                         if (outcome === "win")  storedResults[move].win += 1;
//                         if (outcome === "lose") storedResults[move].lose += 1;
//                         if (outcome === "draw") storedResults[move].draw += 1;
//                     }
//                 }
//             });  

//             storedResults[move].played = storedResults[move].win + storedResults[move].lose + storedResults[move].draw;
//             storedResults[move].winpct = (storedResults[move].win / storedResults[move].played) * 100;
//         });

//         return storedResults;
//     };

//     const sortMovesByPlayed = (moveStats) => {
//         const sortedMoves = Object.values(moveStats).sort((a, b) => b.played - a.played);
//         return sortedMoves;
//     };

//     const filterMoves = (movestats, code) => {
//         return movestats.filter(({ move }) => move.startsWith(code));
//     };

//     const filterPawnMoves = (movestats) => {
//         return movestats.filter(({ move }) => typeof move === 'string' && /^[a-z]/.test(move));
//     };

//     const filterCastlingMoves = (movestats) => {
//         return movestats.filter(({ move }) => move.startsWith("O"));
//     };

//     const getColorClass = (winPercentage) => {
//         if (winPercentage >= 60) return "heatmap-high";
//         else if (winPercentage >= 50) return "heatmap-medium";
//         else if (winPercentage >= 40) return "heatmap-low";
//         else return "heatmap-very-low";
//     };

//     const handleStartChange = (event) => {
//         setStart(parseInt(event.target.value));
//     };

//     const handleEndChange = (event) => {
//         setEnd(parseInt(event.target.value));
//     };

//     const handleTeamChange = (event) => {
//         setSelectedTeam(event.target.value);
//     };

//     const handleMobileClick = (move) => {
//         if (isMobile) {
//             setSelectedMove(move);
//         }
//     };

//     return (
//         <div className="container">
//             <h2>Winning Moves Heatmap</h2>
//             <div className="input-boxes">
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
//             </div>
//             <div className="heatmap-container">
//                 {Object.entries(pieceMoves).map(([pieceType, moves]) => (
//                     <div key={pieceType} className="piece-section">
//                         <h3>{pieceType.toUpperCase()} Moves</h3>

//                         {/* storedResults[move] = { move, win: 0, lose: 0, draw: 0, nullcount: 0, played: 0, winpct: 0 }; */}
//                         {moves.map((moveObj) => (
//                             <div
//                                 key={moveObj.move}
//                                 className={`heatmap-item ${getColorClass(moveObj.winpct)}`}
//                                 onClick={() => handleMobileClick(moveObj)}
//                             >


//                             {/* If viewport is Mobile */}
//                             {isMobile && (
//                                     <span>{moveObj.move}</span>
//                             )}


//                             {/* If viewport is Mobile and user clicked */}
//                             {isMobile && selectedMove === moveObj && (
//                                     <div className={`move-details-bubble heatmap-item ${getColorClass(moveObj.winpct)}`}>
//                                         <span><p><b>Move:</b></p> <p>{moveObj.move}</p></span>
//                                         <span><p><b>Rate:</b></p> <p>{moveObj.winpct.toFixed(2)}%</p></span>
//                                         <br></br>
//                                         <span><p><b>Games:</b></p> <p>{moveObj.played}</p></span>
//                                         <span><p><b>Won:</b></p> <p>{moveObj.win}</p></span>
//                                         <span><p><b>Lost:</b></p> <p>{moveObj.lose}</p></span>
//                                         <span><p><b>Draw:</b></p> <p>{moveObj.draw}</p></span>
//                                         <span><p><b>Null:</b></p> <p>{moveObj.nullcount}</p></span>
//                                         <span><p><b>All Games:</b></p> <p>{moveObj.win + moveObj.lose + moveObj.draw + moveObj.nullcount}</p></span>
//                                     </div>
//                                 )}



//                             {/* If viewport is PC */}
//                             {!isMobile && (
//                                 <div>
//                                     <span>{moveObj.move}</span>
//                                     <br></br>
//                                     <span>Games: {moveObj.played}</span>
//                                     <br></br>
//                                     <span>Win Rate: {moveObj.winpct.toFixed(2)}%</span>

//                                 </div>
//                             )}

//                             </div>
                            
                            
//                         ))}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default UniqueMoves;


// const MoveDetailsBubble = styled.div
// `
//     position: absolute;
//     top: 40px;
//     left: 10px;
//     border: 5px solid black;
//     border-radius: 5px;
//     padding: 5px;
//     z-index: 10;
//     width: 120px;
//     white-space: nowrap;

//     span {
//         display: flex;
//         justify-content: space-between;
//         align-items: start;
//         margin-bottom: 5px;
//     }

//     &.heatmap-high {
//         background-color: #4caf50;
//     }

//     &.heatmap-medium {
//         background-color: #ffeb3b;
//     }

//     &.heatmap-low {
//         background-color: #ff9800;
//     }

//     &.heatmap-very-low {
//         background-color: #f44336;
//     }
// `
// ;