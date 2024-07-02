import React, { useState } from "react";
import styled from "styled-components";


//
// Styles
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
    background-color: #f0f8ff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin-top: 10px;
    display: ${(props) => (props.expanded ? "block" : "none")};
`
;

const Table = styled.table
`
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
`
;

const Th = styled.th
`
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
`
;

const Td = styled.td
`
    border: 1px solid #ddd;
    min-width: 50px;
    padding: 8px;
    text-align: center;
`
;


const OpeningAnalysisPC = (props) => {

    //
    // Props
    //
    const { openingInformation, isClicked, handleElementClick } = props;

    return (
        <Container>

            <OpeningDiv onClick={handleElementClick} expanded={isClicked}>
                <Heading>{openingInformation.familyECO}</Heading>
                <WinRate>{(openingInformation.wins / openingInformation.played * 100).toFixed(2)}%</WinRate>
                {/* <PopupTextSpan><p><b>Rate:</b></p><p>{tile.winpct.toFixed(2)}%</p></PopupTextSpan> */}
                <Cell>{`Played: \n ${openingInformation.played}`}</Cell>
                <Cell>{`Won: \n ${openingInformation.wins}`}</Cell>
                <Cell>{`Loss: \n ${openingInformation.losses}`}</Cell>
                <Cell>{`Drew: \n ${openingInformation.draws}`}</Cell>
            </OpeningDiv>


            {isClicked && (
                <VariationDiv expanded={isClicked}>
                <Table>
                    <thead>
                        <tr>
                            <Th>Variation Name</Th>
                            <Th>Played</Th>
                            <Th>Wins</Th>
                            <Th>Losses</Th>
                            <Th>Draws</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {openingInformation.variations.map((variation, vIndex) => (
                            <tr key={vIndex}>
                                <Td>{variation.name}</Td>
                                <Td>{variation.played}</Td>
                                <Td>{variation.wins}</Td>
                                <Td>{variation.losses}</Td>
                                <Td>{variation.draws}</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </VariationDiv>
            )}

        </Container>
    );
};

export default OpeningAnalysisPC;