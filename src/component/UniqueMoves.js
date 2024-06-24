import React, { useState, useEffect } from "react";
import "./UniqueMoves.css";
import useIsMobile from "../hooks/useIsMobile";

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





    useEffect(() => {

        // Array of objects. Each objects contains details about a single match
        const filteredMatchesByTeam = getFilteredMatches(props.matchHistory, selectedTeam)

        // Every unique move that the player did, based on a range of turns
        const uniqueSingleMoves = getUniqueMoves(filteredMatchesByTeam, start, end);

        // Every unique move, compared to match history to determie winrate of each move
        const winLossPerMove = getWinLossPerMove(filteredMatchesByTeam, uniqueSingleMoves, start, end, selectedTeam);
        // console.log(winLossPerMove)

        // Sort uniqueMoveStats by played count in descending order
        const sortedMoves = sortMovesByPlayed(winLossPerMove);

        const categorizedMoves = {
              pawn: filterPawnMoves(sortedMoves)
            , rook: filterMoves(sortedMoves, "R")
            , knight: filterMoves(sortedMoves, "N")
            , bishop: filterMoves(sortedMoves, "B")
            , queen: filterMoves(sortedMoves, "Q")
            , king: filterMoves(sortedMoves, "K")
            , castling: filterCastlingMoves(sortedMoves)
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
            return movesArray.slice(start, end); // Slice from index 8 to 15 (16 is exclusive)
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
                        if (outcome === "win")  storedResults[move].win += 1;
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
        if (winPercentage >= 60) return "heatmap-high";
        else if (winPercentage >= 50) return "heatmap-medium";
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
                            {isMobile && (
                                    <span>{moveObj.move}</span>
                            )}


                            {/* If viewport is Mobile and user clicked */}
                            {isMobile && selectedMove === moveObj && (
                                    <div className={`move-details-bubble heatmap-item ${getColorClass(moveObj.winpct)}`}>
                                        <span><p><b>Move:</b></p> <p>{moveObj.move}</p></span>
                                        <span><p><b>Rate:</b></p> <p>{moveObj.winpct.toFixed(2)}%</p></span>
                                        <br></br>
                                        <span><p><b>Games:</b></p> <p>{moveObj.played}</p></span>
                                        <span><p><b>Won:</b></p> <p>{moveObj.win}</p></span>
                                        <span><p><b>Lost:</b></p> <p>{moveObj.lose}</p></span>
                                        <span><p><b>Draw:</b></p> <p>{moveObj.draw}</p></span>
                                        <span><p><b>Null:</b></p> <p>{moveObj.nullcount}</p></span>
                                    </div>
                                )}



                            {/* If viewport is PC */}
                            {!isMobile && (
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
