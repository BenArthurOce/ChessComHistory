import React, { useState, useEffect } from "react";
import "./UniqueMoves.css";

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

    useEffect(() => {
        const uniqueMoves = getUniqueMoves(props.matchHistory, start, end);
        const uniqueMoveStats = calculateWinningMoves(props.matchHistory, uniqueMoves, start, end);

        // Sort uniqueMoveStats by played count in descending order
        const sortedMoves = sortMovesByPlayed(uniqueMoveStats);

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
    }, [props.matchHistory, start, end]);

    const getUniqueMoves = (matchHistory, start, end) => {
        const filteredMoves = filterMatches(matchHistory);
        const extractedMoves = extractMoves(filteredMoves, start, end);
        const flattenedMoves = extractedMoves.flat();
        const uniqueMoves = [...new Set(flattenedMoves)];
        return uniqueMoves;
    };

    const filterMatches = (matchHistory) => {
        return matchHistory.map(match => {
            const team = match.playerResults.team;
            const moves = match.allMoves[team];
            return moves;
        });
    };

    const extractMoves = (allMovesArrays, start, end) => {
        return allMovesArrays.map(moves => moves.slice(start, end));
    };

    const calculateWinningMoves = (matchHistory, uniqueMoves, start, end) => {
        const storedResults = {};      
        uniqueMoves.forEach(move => {
            storedResults[move] = { move, win: 0, lose: 0, draw: 0, nullcount: 0, played: 0, winpct: 0 };

            matchHistory.forEach(match => { 
                const team = match.playerResults.team;
                const outcome = match.playerResults.outcome;
                const moves = match.allMoves[team].slice(start, end);
                const exists = moves.includes(move);
                
                if (!exists) {
                    storedResults[move].nullcount += 1;
                } else {
                    if (outcome === "win")  storedResults[move].win += 1;
                    if (outcome === "lose") storedResults[move].lose += 1;
                    if (outcome === "draw") storedResults[move].draw += 1;
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

    const filterMoves = (allMoveStats, code) => {
        return allMoveStats.filter(({ move }) => move.startsWith(code));
    };

    const filterPawnMoves = (allMoveStats) => {
        return allMoveStats.filter(({ move }) => typeof move === 'string' && /^[a-z]/.test(move));
    };

    const filterCastlingMoves = (allMoveStats) => {
        return allMoveStats.filter(({ move }) => move.startsWith("O"));
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

    return (
        <div>
            <h2>Winning Moves Heatmap</h2>
            <div className="input-boxes">
                <label htmlFor="startInput">Start:</label>
                <input id="startInput" type="number" value={start} onChange={handleStartChange} />
                <label htmlFor="endInput">End:</label>
                <input id="endInput" type="number" value={end} onChange={handleEndChange} />
            </div>
            <div className="heatmap-container">
                {Object.entries(pieceMoves).map(([pieceType, moves]) => (
                    <div key={pieceType} className="piece-section">
                        <h3>{pieceType.toUpperCase()} Moves</h3>
                        {moves.map(({ move, win, lose, draw, nullcount, played, winpct }) => (
                            <div key={move} className={`heatmap-item ${getColorClass(winpct)}`}>
                                <span>{move}</span>
                                <br />
                                <span>Games: {played}</span>
                                <br />
                                <span>Win Rate: {winpct.toFixed(2)}%</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UniqueMoves;
