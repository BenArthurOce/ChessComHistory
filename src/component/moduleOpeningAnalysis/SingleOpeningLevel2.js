import React, { useState } from "react";
import styled from "styled-components";

// Components
import SingleOpeningLevel3 from "./SingleOpeningLevel3";

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


const SingleOpeningLevel2 = (props) => {
    //
    // Props
    //
    const { openingInformation } = props;
  
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
  
    return (
        <Container>
            {openingInformation.map((ecoOpening, index) => (
                <VariationDiv
                    key={index}
                    onClick={() => handleElementClick(index)} // Handle the click to expand
                    expanded={expandedIndex === index}
                >
                <VariationHeading>{ecoOpening.familyECOName}</VariationHeading>
                <VariationWinRate>
                    {((ecoOpening.matchesWon / ecoOpening.matchesPlayed) * 100).toFixed(2)}%
                </VariationWinRate>
    
                {expandedIndex === index && (
                    <SingleOpeningLevel3 openingInformation={ecoOpening.familyECOMatches} />
                )}
            </VariationDiv>
            ))}
        </Container>
    );
  };
  
  export default SingleOpeningLevel2;