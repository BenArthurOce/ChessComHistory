import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useOpeningAnalysisGroupOpenings from "../../hooksSpecific/useOpeningAnalysisGroupOpenings";

// Styled components
const InputContainer = styled.div
`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 900;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
;

const Label = styled.label
`
    font-weight: bold;
    margin-right: 10px;
`
;

const DropDownBox = styled.select
`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    min-width: 120px;
`
;

const Section = styled.section
`
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`
;

const Title = styled.h1
`
    text-align: center;
    color: #333;
`
;

const OpeningDiv = styled.div
`
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 10px 0;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`
;

const OpeningHeader = styled.div
`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
;

const OpeningRank = styled.span
`
    font-weight: bold;
    font-size: 1.2em;
`
;

const OpeningEco = styled.span
`
    font-weight: bold;
    font-size: 1em;
`
;

const OpeningCount = styled.span
`
    font-size: 0.9em;
    color: #555;
`
;

const VariationDiv = styled.div
`
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
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
    text-align: left;
`
;

const Td = styled.td
`
    border: 1px solid #ddd;
    padding: 8px;
`
;

const OpeningAnalysis = (props) => {
    const { matchHistory } = props;

    const [expandedIndex, setExpandedIndex] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState("white");

    const dataToRender = useOpeningAnalysisGroupOpenings(matchHistory, selectedTeam);

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <Section>
            {dataToRender && (
                <>
                    <Title>Top Chess Openings</Title>

                    <InputContainer>
                        <Label htmlFor="teamSelect">Select Team:</Label>
                        <DropDownBox id="teamSelect" value={selectedTeam} onChange={handleTeamChange}>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                        </DropDownBox>
                    </InputContainer>

                    {dataToRender.map((opening, index) => (
                        <OpeningDiv key={index} onClick={() => handleToggle(index)}>
                        <OpeningHeader>
                            <OpeningRank>{index + 1}</OpeningRank>
                            <OpeningEco>{opening.familyECO}</OpeningEco>
                            <OpeningCount>{opening.played} games</OpeningCount>
                            <p>wins: {opening.wins}</p>
                            <p>losses: {opening.losses}</p>
                            <p>draws: {opening.draws}</p>
                        </OpeningHeader>
                        <VariationDiv expanded={expandedIndex === index}>
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
                                    {opening.variations.map((variation, vIndex) => (
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
                    </OpeningDiv>
                    ))}
                </>
            )}
        </Section>
    );
};

export default OpeningAnalysis;
