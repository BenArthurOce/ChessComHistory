
import React, { useState } from "react";
import styled from "styled-components";
import { Container, Inner } from "../styles3";

import PopupOverlay from "../Overlay";

import Board from "../moduleMatchHistoryDisplay/Board";
import JsonFileNew2 from '../../data/openingsNew.json';




//
// Component Styles
//


const OpeningDiv = styled.div
`
    display: grid;
    grid-template-columns: 40% 1fr;

    width: 100%;
    border: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #fff;
    grid-gap: 10px;
`
;

const HeaderRow = styled.div
`
    display: flex;
    justify-content: space-between;
    grid-column: 1 / span 2; 
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
`
;

const VariationTitle = styled.span
`
    flex: 1;
    padding-left: 5px;
    word-break: break-word;
    max-width: 70%;
`
;

const WinRate = styled.span
`
    font-weight: bold;
    margin-right: 10px;
`
;

const Row = styled.span
`
    margin-left: 5%;
    max-width: 50%;
    grid-column: 1;
    display: flex;
    justify-content: space-between;

    p { 
        overflow: visible;
    }
`;


const BoardContainer = styled.span
`
    grid-column: 2;
    grid-row: 2 / span 5;
    padding-right: 2px;
`
;

const SingleOpeningLevel3 = (props) => {

    //
    // Props
    //
    const { openingInformation } = props;
    const openingDictionaryNew = JsonFileNew2;


    // Function to filter matchArray by Opening Name
    const searchDictionaryForOpening = (matchArray) => {
        
        const dict = openingDictionaryNew;

        const firstMatch = Object.values(matchArray)[0]

        const variationName = firstMatch.openingDataNew.NAME

        const result = Object.values(dict).filter(entry => entry.NAME === variationName);

        return result[0].FEN

    };


    return (
        <Container>
            <Inner>
            {openingInformation.map((variation, index) => (
                <OpeningDiv>
                    <HeaderRow>
                        <VariationTitle>{variation.variationName}</VariationTitle>
                        <WinRate>{((variation.matchesWon / variation.matchesPlayed) * 100).toFixed(2)}%</WinRate>
                    </HeaderRow>

                    <Row>
                        <b>Played:</b>
                        <p>{variation.matchesPlayed}</p>
                    </Row>

                    <Row>
                        <b>Won:</b>
                        <p>{variation.matchesWon}</p>
                    </Row>

                    <Row>
                        <b>Lost:</b>
                        <p>{variation.matchesLost}</p>
                    </Row>

                    <Row>
                        <b>Drew:</b>
                        <p>{variation.matchesDrew}</p>
                    </Row>

                    
                    {/* Chessboard Display. "Board" is a seperate component in a different file */}
                    <BoardContainer>
                        <Board fen={searchDictionaryForOpening(variation.variationMatches)} userplayed={"White"} site={"-"} />
                    </BoardContainer>

                </OpeningDiv>
            ))}
            </Inner>

        </Container>
    );
  };
  
  export default SingleOpeningLevel3;
  