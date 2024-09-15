import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Title, Inner, ContainerUserInput, FlexRow, FlexLabel, FlexDropDown} from "../styles3";

// Components
import HeatmapTilePC from "./HeatmapTilePC";
import HeatmapTileMobile from "./HeatmapTileMobile";
import PopupOverlay from "../Overlay";
import SingleIcon from "../SingleIcon";

// Custom Hooks
import useIsMobile from "../../hooks/useIsMobile";
import useHeatmapControllerByTeamStartMove from "../../hooksSpecific/useHeatmapControllerByTeamStartMove";

//
// Component Styles
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
;

const IncDecArrow = styled.button
`
    width: 30px;
    height: 30px;
`
;

const IncDecArrowContainer = styled.div
`
    display: flex;
    flex-direction: column;
`
;

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

const HeatmapSubByPiece = (props) => {

    //
    // Props
    //
    const {matchHistory, hookMasterData} = props;


    //
    // States
    //
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const [selectedTeam, setSelectedTeam] = useState("white");
    const [firstMove, setFirstMove] = useState("1.e4");

    const [dataToRender, setDataToRender] = useState([]);

    const [popupMatchHistory, setPopupMatchHistory] = useState(null);   // State to hold selected match details
    const [singleTileSelected, setSingleTileSelected] = useState(null); // for Mobile - Displays Bubble if selected


    //
    // Hooks
    //
    const hookIsMobile = useIsMobile(); // Custom hook to test if mobile device
    const hookUseHeatmapControllerByTeamStartMove = useHeatmapControllerByTeamStartMove(hookMasterData, selectedTeam, firstMove, start, end)


    //
    // Effects
    //
    useEffect(() => {

        if (!hookMasterData || hookMasterData.length === 0) { return};
        if (!hookUseHeatmapControllerByTeamStartMove || hookUseHeatmapControllerByTeamStartMove.length === 0) { return};

        function performFilterByPiece(data, piece) {
            const filteredData = Object.values(data)
                .filter(summary => summary.piece === piece)

            // Sort the moveStats array by the number of games played in descending order
            filteredData.sort((a, b) => b.played - a.played);
            return filteredData
        };
 
        const summaryByPiece = {
              pawn: performFilterByPiece(hookUseHeatmapControllerByTeamStartMove, "Pawn")
            , bishop: performFilterByPiece(hookUseHeatmapControllerByTeamStartMove, "Bishop")
            , knight: performFilterByPiece(hookUseHeatmapControllerByTeamStartMove, "Knight")
            , rook: performFilterByPiece(hookUseHeatmapControllerByTeamStartMove, "Rook")
            , queen: performFilterByPiece(hookUseHeatmapControllerByTeamStartMove, "Queen")
            , king: performFilterByPiece(hookUseHeatmapControllerByTeamStartMove, "King")
            , castling: performFilterByPiece(hookUseHeatmapControllerByTeamStartMove, "Castling")
        }

        setDataToRender(summaryByPiece);
    }
    , [hookUseHeatmapControllerByTeamStartMove]);


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
        if (end >= start) {
            setEnd(prev => prev + 1);
        }
    };
    
    const handleEndMoveDec = () => {
        if (end > start) {
            setEnd(prev => prev - 1);
        }
    };

    //
    // Helpers
    //
    // Method when a user clicks on the "ViewGames" button on a single tile
    const handleIndividualTileClick = (tile) => {
        const myMatchHistory = tile.matchIds;
        const filterMatchHistory = (matchHistory, array) => matchHistory.filter((obj) => array.includes(obj.general.id));
        const result = filterMatchHistory(matchHistory, myMatchHistory);
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
        <Inner>
        <>
            <ContainerUserInput>

                {/* Input: Select Start and End Move */}
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
                {hookIsMobile && Object.keys(dataToRender).length > 0 && (
                <>

                    <DisplayColumn>
                        {renderPieceIcon(`pawn`, selectedTeam)}
                        {dataToRender.pawn.map((tile) => (
                            <HeatmapTilePC
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>


                    <DisplayColumn>
                        {renderPieceIcon(`knight`, selectedTeam)}
                        {dataToRender.knight.map((tile) => (
                            <HeatmapTilePC
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>


                    <DisplayColumn>
                        {renderPieceIcon(`bishop`, selectedTeam)}
                        {dataToRender.bishop.map((tile) => (
                            <HeatmapTilePC
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>


                    <DisplayColumn>
                        {renderPieceIcon(`rook`, selectedTeam)}
                        {dataToRender.rook.map((tile) => (
                            <HeatmapTilePC
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>


                    <DisplayColumn>
                        {renderPieceIcon(`queen`, selectedTeam)}
                        {dataToRender.queen.map((tile) => (
                            <HeatmapTilePC
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>

                    <DisplayColumn>
                        {renderPieceIcon(`king`, selectedTeam)}
                        {dataToRender.king.map((tile) => (
                            <HeatmapTilePC
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>

                    <DisplayColumn>
                        {renderPieceIcon(`exchange`, selectedTeam)}
                        {dataToRender.castling.map((tile) => (
                            <HeatmapTilePC
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>
                </>
                )}


                {hookIsMobile && Object.keys(dataToRender).length > 0 && (
                <>

                    <DisplayColumn>
                        {renderPieceIcon(`pawn`, selectedTeam)}
                        {dataToRender.pawn.map((tile) => (
                            <HeatmapTileMobile
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>


                    <DisplayColumn>
                        {renderPieceIcon(`knight`, selectedTeam)}
                        {dataToRender.knight.map((tile) => (
                            <HeatmapTileMobile
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>


                    <DisplayColumn>
                        {renderPieceIcon(`bishop`, selectedTeam)}
                        {dataToRender.bishop.map((tile) => (
                            <HeatmapTileMobile
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>


                    <DisplayColumn>
                        {renderPieceIcon(`rook`, selectedTeam)}
                        {dataToRender.rook.map((tile) => (
                            <HeatmapTileMobile
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>


                    <DisplayColumn>
                        {renderPieceIcon(`queen`, selectedTeam)}
                        {dataToRender.queen.map((tile) => (
                            <HeatmapTileMobile
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>

                    <DisplayColumn>
                        {renderPieceIcon(`king`, selectedTeam)}
                        {dataToRender.king.map((tile) => (
                            <HeatmapTileMobile
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>

                    <DisplayColumn>
                        {renderPieceIcon(`exchange`, selectedTeam)}
                        {dataToRender.castling.map((tile) => (
                            <HeatmapTileMobile
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />
                        ))}
                    </DisplayColumn>
                </>
                )}

            </HeatmapContainer>

            {/* If "ViewGames" button is pushed, display match history*/}
            {popupMatchHistory && (
                <PopupOverlay matchHistory={popupMatchHistory} />
            )}
        </>
        </Inner>
    );
};

export default HeatmapSubByPiece;
