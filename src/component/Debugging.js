import React, { useState, useEffect } from 'react';
import styled from 'styled-components';



const ButtonContainer = styled.div
`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
`
;

const StatContainer = styled.div
`
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
`
;

const StatBox = styled.div
`
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
`
;

const Debugging = (props) => {
    const [stats, setStats] = useState()

    const {matchHistory, openingDictionary} = props






    useEffect(() => {


    }, [matchHistory]);






    const onButton1Click = () => {
        const sortedArray = matchHistory.sort((a, b) => b.general.id - a.general.id);
        // // console.log(sortedArray)
        // // // console.log(matchHistory)
        // // // console.log("\nbutton 1 clicked\n")
    };

    const onButton2Click = () => {
        const everyOpening = matchHistory.map((match) => match.openingMatch.name);
        console.log(everyOpening);

        // console.log(matchHistory)
        // // console.log("\nbutton 2 clicked\n")
    };

    const onButton3Click = () => {
        const everyTermination = matchHistory.map((match) => match.results.terminationWord);
        const everyUniqueTermination = new Set(everyTermination)
        console.log(everyUniqueTermination);
        // // console.log("\nbutton 3 clicked\n")
    };

    const onButton4Click = () => {

        // matchHistory

        // // console.log("\nbutton 4 clicked\n")
    };


    const findOpeningMatch = (game, openings) => {
        const gameMoves = game.split(' ').slice(0, 15).join(' '); // Consider the first 15 moves
        let bestMatch = null;
        let bestMatchLength = 0;
    
        for (const opening in openings) {
            if (gameMoves.startsWith(opening)) {
                const openingLength = opening.split(' ').length;
                if (openingLength > bestMatchLength) {
                    bestMatch = opening;
                    bestMatchLength = openingLength;
                }
            }
        }
    
        return bestMatch ? openings[bestMatch] : null;
    };


    return (
        <>
            <h1 style={{ textAlign: "center" }}>Debugging</h1>

            <ButtonContainer>
                <button onClick={() => onButton1Click()}>Button 1</button>

                <button onClick={() => onButton2Click()}>Button 2</button>

                <button onClick={() => onButton3Click()}>Button 3</button>

                <button onClick={() => onButton4Click()}>Button 4</button>
            </ButtonContainer>

            <StatContainer>
                <StatBox>
                    <h3>stats</h3>
                    <p>{stats}</p>
                </StatBox>
            </StatContainer>


        </>
    );
};

export default Debugging;