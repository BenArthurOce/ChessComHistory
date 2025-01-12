import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Test from './test';
import Game from './Game';

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

function EngineDebug() {
    const [dataToRender, setDataToRender] = useState(null);

    useEffect(() => {

    }, []);


    const onButton1Click = () => {
        const myTest = new Test()
        console.log(myTest.row)
    };

    const onButton2Click = () => {
        const myGame = new Game()
        console.log(myGame.idNumber)
    };

    const onButton3Click = () => {

    };

    const onButton4Click = () => {


    };

    const onButton5Click = () => {
    };


    const onButton6Click = () => {

    };

    const onButton7Click = () => {

    };

    const onButton8Click = () => {

    };


    return (
        <>
            <h1 style={{ textAlign: "center" }}>Debugging</h1>

            <ButtonContainer>
                <button onClick={() => onButton1Click()}>Button 1</button>

                <button onClick={() => onButton2Click()}>Button 2</button>

                <button onClick={() => onButton3Click()}>Button 3</button>

                <button onClick={() => onButton4Click()}>Button 4</button>

                <button onClick={() => onButton5Click()}>Button 5</button>

                <button onClick={() => onButton6Click()}>Button 6</button>

                <button onClick={() => onButton7Click()}>Button 7</button>

                <button onClick={() => onButton8Click()}>Button 8</button>

            </ButtonContainer>

            <StatContainer>
                <StatBox>

                </StatBox>
            </StatContainer>


        </>
    );
};

export default EngineDebug;