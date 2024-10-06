
import React, { useState } from "react";
import styled from "styled-components";

import Board from "../moduleMatchHistoryDisplay/Board";
import JsonFileNew2 from '../../data/openingsNew.json';





//
// Component Styles
//
const Container = styled.div
`
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`
;

const OpeningDiv = styled.div
`
    display: grid;
    grid-template-rows: 2;
    grid-template-columns: 4;

    background-color: ${(props) => (props.expanded ? "#e6f7ff" : "#fff")};
    border: 1px solid ${(props) => (props.expanded ? "#1890ff" : "#ddd")};

    border-radius: 8px;
    margin: 10px 0;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;
`
;

const Heading = styled.div
`
    grid-row: 1;
    grid-column: 1 / span 3;
    margin-bottom: 10px;
    font-weight: bold;
    margin-left: 2%;
`
;

const WinRate = styled.div
`
    grid-row: 1;
    grid-column: 4
    margin-bottom: 10px;
    font-weight: bold;

    text-align: end;
    margin-right: 10%;
`
;

const Cell = styled.div
`
    padding-top: 10px;
    border-top: 1px solid #ddd;
    grid-row: 2;
    text-align: center;
`
;

const VariationDiv = styled.div
`
    display: grid;
    grid-template-rows: 2;
    grid-template-columns: 4;

    background-color: #fff;
    border: 1px solid #ddd;

    border-radius: 8px;
    margin: 10px 0;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;


    font-size: 14px;
`
;

const VariationHeading = styled.div
`
    grid-row: 1;
    grid-column: 1 / span 3;
    margin-bottom: 10px;
    margin-left: 2%;
`
;

const VariationWinRate = styled.div
`
    grid-row: 1;
    grid-column: 4
    margin-bottom: 10px;

    text-align: end;
    margin-right: 10%;
`
;

const SingleOpeningLevel3 = (props) => {

    //
    // Props
    //
    const { openingInformation } = props;
    const openingDictionaryNew = JsonFileNew2;

    //
    // 
    //

    // Function to filter matchArray by Opening Name
    const searchDictionaryForOpening = (matchArray) => {

        const dict = openingDictionaryNew;

        const firstMatch = Object.values(matchArray)[0]

        // console.log(firstMatch)

        const variationName = firstMatch.openingDataNew.NAME

        // console.log(variationName)

        const result = Object.values(dict).filter(entry => entry.NAME === variationName);

        // console.log(result)

        // for now, only getting the fen
        const fen = result[0].FEN

        // console.log(fen)

        return fen;

    };



    return (
        <Container>
            {openingInformation.map((variation, index) => (
                <OpeningDiv>

                    <Heading>{variation.variationName}</Heading>
                    <WinRate>
                        {((variation.matchesWon / variation.matchesPlayed) * 100).toFixed(2)}%
                    </WinRate>
                    <Cell>{`Played: ${variation.matchesPlayed}`}</Cell>
                    <Cell>{`Won: ${variation.matchesWon}`}</Cell>
                    <Cell>{`Lost: ${variation.matchesLost}`}</Cell>
                    <Cell>{`Drew: ${variation.matchesDrew}`}</Cell>


                {/* Chessboard Display. "Board" is a seperate component in a different file */}

                    <Board fen={searchDictionaryForOpening(variation.variationMatches)} userplayed={"White"} site={"-"} />
        
                </OpeningDiv>
            ))}
        </Container>
    );
  };
  
  export default SingleOpeningLevel3;
  