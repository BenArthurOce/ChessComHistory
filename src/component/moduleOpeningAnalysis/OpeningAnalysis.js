import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const OpeningDetails = styled.div
`
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid #ddd;
    display: ${(props) => (props.expanded ? "block" : "none")};
`
;



const OpeningAnalysis = (props) => {
    const [renderFlag, setRenderFlag] = useState(false);
    const [ecoList, setEcoList] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team


    useEffect(() => {
        const ecoListResult = getMostFrequentEcoCodes(props.matchHistory);
        setEcoList(ecoListResult);

        // console.log("===ecoListResult===")
        // console.log(ecoListResult)
        // console.log()

    }, [props.matchHistory, selectedTeam]);

    const filterByEcoFamilyName = (matchArray, fullName) => {
        if (matchArray.length === 0) {return};
        return matchArray.filter(match => match.replaceopendict.ECOFAMILY === fullName);
    };
 
    const filterByEco = (matchArray, ecoCode) => {
        if (matchArray.length === 0) {return};
        return matchArray.filter(match => match.opening.eco === ecoCode);
    };

    const filterByColour = (matchArray) => {
        if (matchArray.length === 0) {return};
        return matchArray.filter(match => match.results.userPlayed === selectedTeam);
    };

    const filterByResult = (matchArray, result) => {
        if (matchArray.length === 0) {return};
        return matchArray.filter(match => match.playerResults.userResult === result);
    };


    const filterByAll = (colour, ecoCode, result) => {
        return props.matchHistory.filter(match => 
            match.playerResults.userPlayed === colour &&
            match.opening.eco === ecoCode &&
            match.playerResults.userResult === result
        );
    };

    const getUniqueEcoFamilyNames = (objectArray) => {
        let unique_values = [
            ...new Set(objectArray.map((element) => element.replaceopendict.ECOFAMILY)),
        ];
        return unique_values;
    };


    const getMostFrequentEcoCodes = (matchHistory) => {
        const games_to_focus_on = filterByColour(matchHistory);
        const uniqueEcoArray = getUniqueEcoFamilyNames(games_to_focus_on);
    
        const rankedEcoArray = uniqueEcoArray.map((eco, index) => {
            const matchesForEco = filterByEcoFamilyName(games_to_focus_on, eco);
    
            const wins = filterByResult(matchesForEco, "win").length;
            const losses = filterByResult(matchesForEco, "lose").length;
            const draws = filterByResult(matchesForEco, "draw").length;
    
            return {
                eco: eco,
                count: matchesForEco.length,
                wins: wins,
                losses: losses,
                draws: draws,
                matches: matchesForEco,
            };
        });
    
        rankedEcoArray.sort((a, b) => {
            if (b.count !== a.count) {
                return b.count - a.count; // Primary sort by count
            } else {
                const winRateA = a.wins / a.count;
                const winRateB = b.wins / b.count;
                return winRateB - winRateA; // Secondary sort by win rate
            }
        });
    
        return rankedEcoArray.slice(0, 10); // Return only the top 10
    };

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
        <Section>
            <Title>Top Chess Openings</Title>

            <InputContainer>
                    <Label htmlFor="teamSelect">Select Team:</Label>
                    <DropDownBox id="teamSelect" value={selectedTeam} onChange={handleTeamChange}>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                    </DropDownBox>
            </InputContainer>



            {ecoList.map((opening, index) => (
                <OpeningDiv key={opening.rank} onClick={() => handleToggle(index)}>
                    <OpeningHeader>
                        {/* <OpeningRank>#{opening.rank}</OpeningRank> */}
                        <OpeningEco>{opening.eco}</OpeningEco>
                        <OpeningCount>{opening.count} games</OpeningCount>
                        <div>
                            Win Rate: {((opening.wins / opening.count) * 100).toFixed(2)}%
                            {/* &nbsp;|&nbsp;
                            Loss Rate: {((opening.losses / opening.count) * 100).toFixed(2)}% */}
                        </div>
                    </OpeningHeader>
                    <OpeningDetails expanded={expandedIndex === index}>
                        <p>Matches:</p>
                        <ul>
                            {opening.matches.map((match, i) => (
                                <li key={i}>
                                    <a href={match.general.url} target="_blank" rel="noopener noreferrer">
                                        Match {i + 1}: {match.general.url}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </OpeningDetails>
                </OpeningDiv>
            ))}
        </Section>
    );
};

export default OpeningAnalysis;
