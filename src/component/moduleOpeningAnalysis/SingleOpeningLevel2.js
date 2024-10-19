import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "../styles3";

import Board from "../moduleMatchHistoryDisplay/Board";
import JsonFileNew2 from '../../data/openingsNew.json';

// Components
import SingleOpeningLevel3 from "./SingleOpeningLevel3";


const Inner = styled.div
`
    display: flex;
    flex-wrap: wrap;
    background-color: #e6f7ff;
    border: 1px solid #ddd;
    justify-content: flex-start;
`
;

const VariationDiv = styled.div
`

    /* Adjust width if expanded */

    min-width: ${({ expanded }) => (expanded ? '100%' : '45%')};
    max-width: ${({ expanded }) => (expanded ? '100%' : '45%')};

    background-color: #fff;
    border: 1px solid #ddd;

    border-radius: 8px;
    margin: 2% 2%;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    font-size: 12px;
`
;

const VariationHeading = styled.div
`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-left: 2%;
`
;



const SingleOpeningLevel2 = (props) => {

    //
    // Props
    //
    const { openingInformation } = props;
    const openingDictionaryNew = JsonFileNew2;

    //
    // States
    //
    const [expandedIndex, setExpandedIndex] = useState(null); // Track which variation is expanded
  
    //
    // Handles
    //
    const handleElementClick = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    };

    //
    // Function to filter matchArray by Opening Name
    //
    const searchDictionaryForOpening = (name) => {

        const dict = openingDictionaryNew;

        const openings = Object.values(dict).filter(entry => entry.ECOFAMILY === name);

        return Object.values(openings)[0]['FEN']
    };
  
    return (
        <Container>
            <Inner>
            {openingInformation.map((ecoOpening, index) => (
                <VariationDiv
                    key={index}
                    onClick={() => handleElementClick(index)} // Handle the click to expand
                    expanded={expandedIndex === index}
                >
                    {/* Name of the Heading, and the winrate (appears on top of chessboard) */}
                    <VariationHeading>
                        <p>{ecoOpening.familyECOName} </p>
                        <b>{((ecoOpening.matchesWon / ecoOpening.matchesPlayed) * 100).toFixed(2)}%</b>
                    </VariationHeading>

                    {/* Expands to show more openings if clicked */}
                    {expandedIndex === index && (
                        <SingleOpeningLevel3 openingInformation={ecoOpening.familyECOMatches} />
                    )}

                    {/* ChessBoard */}
                    {expandedIndex === null && (
                        <Board fen={searchDictionaryForOpening(ecoOpening.familyECOName)} userplayed={"White"} site={"-"} />
                    )}

                </VariationDiv>
            ))}
            </Inner>
        </Container>
    );
  };
  
  export default SingleOpeningLevel2;