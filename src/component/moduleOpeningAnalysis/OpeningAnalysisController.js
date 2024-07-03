import React, { useState, useEffect } from "react";
import styled from "styled-components";

import OpeningAnalysisPC from "./OpeningAnalysisPC";
import OpeningAnalysisMobile from "./OpeningAnalysisMobile";

import useOpeningAnalysisGroupOpenings from "../../hooksSpecific/useOpeningAnalysisGroupOpenings";
import useIsMobile from "../../hooks/useIsMobile";


//
// Styles
//

const Container = styled.div
`
    height: 100%;
    overflow-y: scroll;
`

const Title = styled.h1
`
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
`
;

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

const FlexRow = styled.div
`
    display: flex;
    gap: 10px;
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


const OpeningAnalysisController = (props) => {

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
    const hookIsMobile = useIsMobile()
    const hookDataToRender = useOpeningAnalysisGroupOpenings(matchHistory, selectedTeam, firstMove);

    //
    // Handles
    //
    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };

    const handleElementClick = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    const handleFirstMoveChange = (event) => {
        setFirstMove(event.target.value);
    };
    

    return (
        <Container>
            <Title>Opening Analysis</Title>

            {/* Input Controls */}
            <InputContainer>
                <FlexRow>
                    <div>
                        <Label htmlFor="teamSelect">Select Team:</Label>
                        <DropDownBox id="teamSelect" value={selectedTeam} onChange={handleTeamChange}>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                        </DropDownBox>
                    </div>

                    <div>
                        <Label htmlFor="firstMoveSelect">First Move:</Label>
                        <DropDownBox id="firstMoveSelect" value={firstMove} onChange={handleFirstMoveChange}>
                            <option value="1.e4">1.e4</option>
                            <option value="1.d4">1.d4</option>
                            <option value="other">Other</option>
                        </DropDownBox>
                    </div>
                </FlexRow>
            </InputContainer>


            {/* PC Display */}
            {!hookIsMobile && hookDataToRender && (
                <>
                    {hookDataToRender.map((opening, index) => (
                        <div key={index}>
                            <OpeningAnalysisPC
                                openingInformation={opening}
                                isClicked={expandedIndex === index}
                                handleElementClick={() => handleElementClick(index)}
                            />
                        </div>
                    ))}
                </>
            )}


            {/* Mobile Display */}
            {hookIsMobile && hookDataToRender && (
                <>
                    {hookDataToRender.map((opening, index) => (
                        <div key={index}>
                            <OpeningAnalysisMobile
                                openingInformation={opening}
                                isClicked={expandedIndex === index}
                                handleElementClick={() => handleElementClick(index)}
                            />
                        </div>
                    ))}
                </>
            )}
        </Container>
    );




};
export default OpeningAnalysisController;