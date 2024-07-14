import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Title, Inner, ContainerUserInput, FlexRow, FlexLabel, FlexDropDown} from "../styles3";
// import { Container, Title, FlexRow } from "../styles3";

import HeatmapTileMobile from "./HeatmapTileMobile";
import HeatmapTilePC from "./HeatmapTilePC";
import PopupOverlay from "../Overlay";
import SingleIcon from "../SingleIcon";

import useIsMobile from "../../hooks/useIsMobile";
import useHeatmapControllerDataset from "../../hooksSpecific/useHeatmapControllerDataset";
import useHeatmapControllerSortData from "../../hooksSpecific/useHeatmapControllerSortData";


//
// Styles
//

const Label = styled.label
`
    display: flex;
    font-weight: bold;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
`
;

const NumberInput = styled.input
`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 60px;
    margin-right: 10px;
    box-sizing: border-box;
`
;

const NumericIncDecContainer = styled.div
`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const IncDecArrow = styled.button
`
    width: 30px;
    height: 30px;
`

const IncDecArrowContainer = styled.div
`
    display: flex;
    flex-direction: column;
`



const HeatmapContainer = styled.div
`
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: nowrap;
    overflow-x: auto;
`
;


const DisplayColumnTitle = styled.div
`
    margin-top: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
`
;


const DisplayColumn = styled.div
`
    // min-width: 40px;
    // max-width: 45px;

    // min-width: 60px;
    // max-width: 65px;
    flex-grow: 1;
`
;

const HeatmapController = (props) => {

    //
    // Props
    //
    const {matchHistory} = props

    //
    // States
    //
    const [start, setStart] = useState(0); // Default start value
    const [end, setEnd] = useState(5); // Default end value
    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team
    const [firstMove, setFirstMove] = useState("1.e4"); // Default starting move

    const [popupMatchHistory, setPopupMatchHistory] = useState(null); // State to hold selected match details
    const [singleTileSelected, setSingleTileSelected] = useState(null); // for Mobile - Displays Bubble if selected

    //
    // Hooks
    //
    const hookIsMobile = useIsMobile(); // Custom hook to test if mobile device
    const hookDataSet = useHeatmapControllerDataset(matchHistory);
    const hookSortData = useHeatmapControllerSortData(hookDataSet, start, end, selectedTeam, firstMove); // Should be renamed

    //
    // Handlers
    //
    const handleStartChange = (event) => {
        setStart(parseInt(event.target.value));
    };

    const handleEndChange = (event) => {
        setEnd(parseInt(event.target.value));
    };

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };

    const handleFirstMoveChange = (event) => {
        setFirstMove(event.target.value);
    };

    const handleStartMoveInc = () => {
        if (start < end) {
            setStart(prev => prev + 1);
        }
    };
    
    const handleStartMoveDec = () => {
        if (start > 0) {
            setStart(prev => prev - 1);
        }
    };
    
    const handleEndMoveInc = () => {
        if (end > start) {
            setEnd(prev => prev + 1);
        }
    };
    
    const handleEndMoveDec = () => {
        if (end > start + 1) {
            setEnd(prev => prev - 1);
        }
    };

    //
    // Helpers
    //
    // Method when a user clicks on the "ViewGames" button on a single tile
    const handleIndividualTileClick = (tile) => {
        // // // console.log(tile)
        const myMatchHistory = tile.matches;
        // // // console.log(myMatchHistory)
        const arrayMatchId = tile.matches.map((entry) => entry.id);

        // // // console.log(arrayMatchId)
        // // // console.log()

        const filterMatchHistory = (matchHistory, array) => matchHistory.filter((obj) => array.includes(obj.general.id));
        const result = filterMatchHistory(matchHistory, arrayMatchId);
        setPopupMatchHistory(result);
    };


    // Function to render pawn icon with associated number of wins/losses/draws/total
    // see SingleIcon.js 
    const renderPieceIcon = (iconType, color) => (
        <DisplayColumnTitle>
            <SingleIcon icon={iconType} color={color} size={30} />
        </DisplayColumnTitle>
    );

    return (
        <Container>
            {/* {// // console.log(Object.keys(hookSortData).length===0)}
            {// // console.log(Object.keys(hookSortData).length===0)}
            {// // console.log(Object.keys(hookSortData))}  */}
            
            {Object.keys(hookSortData).length === 0 && (
                <p>HeatmapController - renderFlag is false</p>
            )}

            {Object.keys(hookSortData).length > 0 && (
                
                <>
                    {/* {// // console.log(Object.keys(hookSortData))}  */}
                    <Title>Heatmap Analysis</Title>
                    


                <ContainerUserInput>

                            <FlexRow>
                                <NumericIncDecContainer>
                                    <Label htmlFor="startInput">Start:</Label>
                                    <NumberInput id="startInput" value={start} onChange={handleStartChange} />

                                    <IncDecArrowContainer>
                                        <IncDecArrow onClick={handleStartMoveInc}>&uarr;</IncDecArrow>
                                        <IncDecArrow onClick={handleStartMoveDec}>&darr;</IncDecArrow>
                                    </IncDecArrowContainer>
                                </NumericIncDecContainer>

                                <NumericIncDecContainer>
                                    <Label htmlFor="endInput">End:</Label>
                                    <NumberInput id="endInput" value={end} onChange={handleEndChange} />

                                    <IncDecArrowContainer>
                                        <IncDecArrow onClick={handleEndMoveInc}>&uarr;</IncDecArrow>
                                        <IncDecArrow onClick={handleEndMoveDec}>&darr;</IncDecArrow>
                                    </IncDecArrowContainer>
                                </NumericIncDecContainer>
                            </FlexRow>



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




                    <HeatmapContainer>
                        {!hookIsMobile && (
                            <>
                                <DisplayColumn>
                                    {renderPieceIcon(`pawn`, selectedTeam)}
                                    {hookSortData.pawn.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`rook`, selectedTeam)}
                                    {hookSortData.rook.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`knight`, selectedTeam)}
                                    {hookSortData.knight.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`bishop`, selectedTeam)}
                                    {hookSortData.bishop.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`queen`, selectedTeam)}
                                    {hookSortData.queen.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`king`, selectedTeam)}
                                    {hookSortData.king.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`exchange`, selectedTeam)}
                                    {hookSortData.castling.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>
                            </>
                        )}


                        {hookIsMobile && (
                            <>
                                <DisplayColumn>
                                    {renderPieceIcon(`pawn`, selectedTeam)}
                                    {hookSortData.pawn.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`rook`, selectedTeam)}
                                    {hookSortData.rook.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`knight`, selectedTeam)}
                                    {hookSortData.knight.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`bishop`, selectedTeam)}
                                    {hookSortData.bishop.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`queen`, selectedTeam)}
                                    {hookSortData.queen.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`king`, selectedTeam)}
                                    {hookSortData.king.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`exchange`, selectedTeam)}
                                    {hookSortData.castling.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>
                            </>
                        )}

                    </HeatmapContainer>


                    {popupMatchHistory && (
                        <PopupOverlay matchHistory={popupMatchHistory} />
                    )}
                </>
            )}
        </Container>
    );
};

export default HeatmapController;
