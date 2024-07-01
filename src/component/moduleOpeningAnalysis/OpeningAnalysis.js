import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Styled components
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
    const [ecoList, setEcoList] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null);

    useEffect(() => {
        const ecoListResult = getMostFrequentEcoCodes(props.matchHistory);
        setEcoList(ecoListResult);
    }, [props.matchHistory]);

    const getMostFrequentEcoCodes = (matchHistory) => {
        const ecoCounts = {};

        matchHistory.forEach((match) => {
            const eco = match.opening.eco;
            if (eco) {
                if (!ecoCounts[eco]) {
                    ecoCounts[eco] = { count: 0, matches: [] };
                }
                ecoCounts[eco].count += 1;
                ecoCounts[eco].matches.push(match);
            }
        });

        const ecoArray = Object.entries(ecoCounts);

        ecoArray.sort((a, b) => b[1].count - a[1].count);

        const rankedEcoArray = ecoArray.map((entry, index) => ({
            rank: index + 1,
            eco: entry[0],
            count: entry[1].count,
            matches: entry[1].matches,
        }));

        return rankedEcoArray.slice(0, 5); // Return only the top 5
    };

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    return (
      <Section>
          <h1 style={{ textAlign: "center" }}>Opening Analysis</h1>
          <h3>to do: get the big dictionary of openings in the code. Big job.</h3>
          <br></br>
          <Title>Top 5 Chess Openings</Title>
          {ecoList.map((opening, index) => (
              <OpeningDiv key={opening.rank} onClick={() => handleToggle(index)}>
                  <OpeningHeader>
                      <OpeningRank>#{opening.rank}</OpeningRank>
                      <OpeningEco>{opening.eco}</OpeningEco>
                      <OpeningCount>{opening.count} games</OpeningCount>
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
}

export default OpeningAnalysis;
