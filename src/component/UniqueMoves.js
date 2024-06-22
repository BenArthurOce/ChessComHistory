import React, { useState, useEffect } from "react";



const UniqueMoves = (props) => {
    

    // const [chessBoard, setChessBoard] = useState(() => parseFEN(props.position));

    useEffect(() => {
        const uniqueMoves = getUniqueMoves(props.matchHistory)
        console.log(uniqueMoves)

        const winningMoves = calculateWinningMoves(props.matchHistory, uniqueMoves)
        console.log(winningMoves)
    }, []);


    // CODE ISSUE!
    // NEED TO ONLY GET MOVES 7 TO 35
    // USE AN ARRAY SLICE
    const getUniqueMoves = (matchHistory) => {

        let allPlayerMoves = []
        matchHistory.forEach(match => {
            const team = match.playerResults.team
            if (team === "white") {
                allPlayerMoves.push(...match["allMoves"]["white"])
            }
            else if (team === "black") {
                allPlayerMoves.push(...match["allMoves"]["black"])
            }           
        });

        const trimmedArray = allPlayerMoves.map(s => s.trim());

        let outputArray = Array.from(new Set(trimmedArray))
        return outputArray
    };

    const calculateWinningMoves = (matchHistory, uniqueMoves) => {

        const storedResults = {};



        
        uniqueMoves.forEach(move => {

            // Add to results dictionary
            storedResults[move] = {"win": 0, "lose": 0, "draw": 0, "null": 0}

            // with each move, loop through the match history
            matchHistory.forEach(match => { 
                const team = match.playerResults.team
                const outcome = match.playerResults.outcome
                const moves = match.allMoves[team]
                const exists = moves.includes(move);
                
                // console.log(exists)
                // console.log(outcome)

                if (exists === false) {
                    storedResults[move]["null"] += 1
                }
                else if (exists === true) {
                    if (outcome === "win")  {storedResults[move]["win"] += 1}
                    if (outcome === "lose") {storedResults[move]["lose"] += 1}
                    if (outcome === "draw") {storedResults[move]["draw"] += 1}
                }
            }); 

            // console.log(storedResults)

        });

        return storedResults


        // for each move in the move array
        // We give it a win and loss, and null counter
        // Then we go through every match history
        // we look in the player moves

        // if its not in there, add to the null counter and move on
        // if its in there:
            // if the gameResult was a win then add it to the "win" counter
            // if the gameResult was a losee then add it to the "loss" counter
    };



    return (
        <div>

        </div>
    );
};

export default UniqueMoves;
