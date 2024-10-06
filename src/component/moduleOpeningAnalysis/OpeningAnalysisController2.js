import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Title, Inner, ContainerUserInput, FlexRow, FlexLabel, FlexDropDown} from "../styles3";

// Components
import OpeningAnalysisPC from "./OpeningAnalysisPC";
import OpeningAnalysisMobile from "./OpeningAnalysisMobile";

import SingleOpeningLevel1 from "./SingleOpeningLevel1";

// Custom Hooks
import useIsMobile from "../../hooks/useIsMobile";
import useOpeningAnalysisGroupOpenings from "../../hooksSpecific/useOpeningAnalysisGroupOpenings";

import useOpeningAnalysisGroupOpeningsNEW from '../../hooksSpecific/useOpeningAnalysisGroupOpeningsNEW';


const OpeningAnalysisController2 = (props) => {

    //
    // Props
    //
    const { matchHistory } = props;

    //
    // States
    //
    const [selectedTeam, setSelectedTeam] = useState("white");
    const [firstMove, setFirstMove] = useState("1.e4"); // Default starting move
    // const [expandedIndex, setExpandedIndex] = useState(null);   // Component contains Opening Divs. This holds the index number of the clicked Div so it can be expanded.

    //
    // Hooks
    //
    // const hookIsMobile = useIsMobile()
    const hookDataToRender = useOpeningAnalysisGroupOpeningsNEW(matchHistory, selectedTeam, firstMove);
    console.log(hookDataToRender)
    const hookIsMobile = useIsMobile()

    
    //
    // Handles
    //
    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };

    const handleElementClick = (index) => {
        // setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleFirstMoveChange = (event) => {
        setFirstMove(event.target.value);
    };
    

    return (
        <Container>
            <Title>Opening Analysis</Title>

            <ContainerUserInput>
                {/* Input: Select Team */}
                <FlexRow>
                    <FlexLabel htmlFor="teamSelect">Select Team:</FlexLabel>
                    <FlexDropDown id="teamSelect" value={selectedTeam} onChange={handleTeamChange}>
                        <option value="white">White</option>
                        <option value="black">Black</option>
                    </FlexDropDown>
                </FlexRow>

                {/* Input: Select First Move */}
                <FlexRow>
                    <FlexLabel htmlFor="firstMoveSelect">First Move:</FlexLabel>
                    <FlexDropDown id="firstMoveSelect" value={firstMove} onChange={handleFirstMoveChange}>
                        <option value="1.e4">1.e4</option>
                        <option value="1.d4">1.d4</option>
                        <option value="other">Other</option>
                    </FlexDropDown>
                </FlexRow>
            </ContainerUserInput>


            {/* Mobile Display */}
            {hookIsMobile && hookDataToRender && (
                <>
                    {hookDataToRender.map((opening, index) => (
                        <div key={index}>
                            <SingleOpeningLevel1
                                openingInformation={opening}
                                elementIndex={index}
                            />
                        </div>
                    ))}
                </>
            )}
        </Container>
    );




};
export default OpeningAnalysisController2;