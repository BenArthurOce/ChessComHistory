import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    padding: 20px;

    @media (max-width: 768px) {
        padding: 10px;
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

    input[type="number"], select {
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
        align-items: flex-start;
        gap: 5px;

        input[type="number"], select {
            width: 100%;
        }
    }
`;

const HeatmapContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
`;

const HeatmapItem = styled.div`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;

    &.heatmap-high {
        background-color: #7CFC00; /* Light Green */
    }

    &.heatmap-medium {
        background-color: #FFFF00; /* Yellow */
    }

    &.heatmap-low {
        background-color: #FFA500; /* Orange */
    }

    &.heatmap-very-low {
        background-color: #FF6347; /* Tomato */
    }

    @media (max-width: 768px) {
        padding: 8px;
    }
`;

const PieceSection = styled.div`
    margin-bottom: 20px;

    h3 {
        margin-bottom: 10px;
    }

    @media (max-width: 768px) {
        h3 {
            font-size: 1.2em;
        }
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


    useEffect(() => {
        const uniqueMoves = getUniqueMoves(props.matchHistory, start, end);
        const uniqueMoveStats = calculateWinningMoves(props.matchHistory, uniqueMoves, start, end, selectedTeam);

        const sortedMoves = sortMovesByPlayed(uniqueMoveStats);

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
            const moves = match.moves[team];
            return moves;
        });
    };


    const extractMoves = (movesArrays, start, end) => {
        return movesArrays.map(moves => moves.slice(start, end));
    };


    const calculateWinningMoves = (matchHistory, uniqueMoves, start, end, selectedTeam) => {
        const storedResults = {};      
        uniqueMoves.forEach(move => {
            storedResults[move] = { move, win: 0, lose: 0, draw: 0, nullcount: 0, played: 0, winpct: 0 };

            matchHistory.forEach(match => { 
                const team = match.playerResults.team;
                const outcome = match.playerResults.outcome;
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

    return (
        <Container>
            <h2>Winning Moves Heatmap</h2>
            <InputBoxes>
                <label htmlFor="startInput">Start:</label>
                <input id="startInput" type="number" value={start} onChange={handleStartChange} />
                <label htmlFor="endInput">End:</label>
                <input id="endInput" type="number" value={end} onChange={handleEndChange} />
                <label htmlFor="teamSelect">Select Team:</label>
                <select id="teamSelect" value={selectedTeam} onChange={handleTeamChange}>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                </select>
            </InputBoxes>
            <HeatmapContainer>
                {Object.entries(pieceMoves).map(([pieceType, moves]) => (
                    <PieceSection key={pieceType}>
                        <h3>{pieceType.toUpperCase()} Moves</h3>
                        {moves.map(({ move, win, lose, draw, nullcount, played, winpct }) => (
                            <HeatmapItem key={move} className={getColorClass(winpct)}>
                                <span>{move}</span>
                                <br />
                                <span>Games: {played}</span>
                                <br />
                                <span>Win Rate: {winpct.toFixed(2)}%</span>
                            </HeatmapItem>
                        ))}
                    </PieceSection>
                ))}
            </HeatmapContainer>
        </Container>
    );
};

export default UniqueMoves;
