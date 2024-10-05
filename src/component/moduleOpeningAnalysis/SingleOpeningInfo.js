import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Container } from '../styles3';

// Components



// Components
import Board from '../moduleMatchHistoryDisplay/Board';
import SingleIcon from "../SingleIcon";


// Components
import OpeningAnalysisPC from "./OpeningAnalysisPC";
import OpeningAnalysisMobile from "./OpeningAnalysisMobile";

// Custom Hooks
import useIsMobile from "../../hooks/useIsMobile";
import useOpeningAnalysisGroupOpenings from "../../hooksSpecific/useOpeningAnalysisGroupOpenings";
import useOpeningAnalysisGroupOpeningsNEW from '../../hooksSpecific/useOpeningAnalysisGroupOpeningsNEW';

//
// Component Styles
//
const SingleMatchComp = styled.div
`
    display: grid;
    grid-template-columns: 2% 5% 50% 1fr;
    width: 100%;

    border: 1px solid #ccc;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 200px;

    font-size: 10px;

    background-color: ${(props) => props.colorBackground};
`
;

const ResultBar = styled.span
`
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: 10;

    border-radius: 100px;
    background-color: ${(props) => props.colorBar}; 
`
;

const BoardContainer = styled.span
`
    display: inline-block;

    align-items: center;
    justify-content: center;

    grid-column-start: 4;
    grid-column-end: 4;

    grid-row-start: 1;
    grid-row-end: 10;

    padding-right:2px;

    padding-top: 10%;
    padding-bottom: 10%;
`
;

const CopyButton = styled.button
`
    grid-column: 2;

    grid-column: 2;
    cursor: pointer;
    align-self: center;

    background: none;   /* Removes the button "look" */
    border: none;       /* Removes the button "look" */
`
;

const Title = styled.span
`
    grid-column: 2 / span 2;
    display: flex;
    padding-left: 5px;
`
;

const Icon = styled(SingleIcon)
`
    grid-column: 2;
    align-self: center;
`
;

const Row = styled.span
`
    grid-column: 3;
    display: flex;
    align-items: center;
    overflow: hidden;
`
;

const Content = styled.div
`
  padding: 20px;
`
;

const SingleOpeningInfo = (props) => {

    //
    // Props
    //
    const { matchHistory } = props;

    //
    // States
    //
    const [selectedTeam, setSelectedTeam] = useState("white");
    const [firstMove, setFirstMove] = useState("1.e4"); // Default starting move
    const [expandedIndex, setExpandedIndex] = useState(null);   // Component contains Opening Divs. This holds the index number of the clicked Div so it can be expanded.

    //
    // Hooks
    //
    // const hookIsMobile = useIsMobile()
    const hookDataToRender = useOpeningAnalysisGroupOpeningsNEW(matchHistory, selectedTeam, firstMove);
    console.log(hookDataToRender)


    const openingsToRender = Object.entries(hookDataToRender).slice(0,2).map(entry => entry[1]);
    console.log(openingsToRender)

  
    return (
        <Container>
            <Title>Table Summary</Title>

             {/* <TabContainer>
                <TabButton active={activeTab === 'byMode'} onClick={() => setActiveTab('byMode')}>
                    By Time Class
                </TabButton>

                <TabButton active={activeTab === 'byTime'} onClick={() => setActiveTab('byTime')}>
                    By Time of Day
                </TabButton>
            </TabContainer> */}


            <Content>

            </Content> 

        </Container>
    );
};

export default SingleOpeningInfo;