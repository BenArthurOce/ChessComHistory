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

const DataComponent = (props) => {
    const [stats, setStats] = useState()

    const {matchHistory} = props




    useEffect(() => {
        const totalMatches = matchHistory.length;
        const wins = matchHistory.filter(match => match.playerResults.userResult === 'win').length;
        const losses = matchHistory.filter(match => match.playerResults.userResult === 'lose').length;
        const draws = matchHistory.filter(match => match.playerResults.userResult === 'draw').length;
        setStats(wins)

    }, [matchHistory]);






    const onButton1Click = () => {
        const sortedArray = matchHistory.sort((a, b) => b.general.id - a.general.id);
        console.log(sortedArray)
        // console.log(matchHistory)
        // console.log("\nbutton 1 clicked\n")
    };

    const onButton2Click = () => {
        console.log("\nbutton 2 clicked\n")
    };

    const onButton3Click = () => {
        console.log("\nbutton 3 clicked\n")
    };

    const onButton4Click = () => {
        console.log("\nbutton 4 clicked\n")
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

export default DataComponent;