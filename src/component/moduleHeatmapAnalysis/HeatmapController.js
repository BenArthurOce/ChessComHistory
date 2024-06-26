import React, { useState, useEffect } from "react";
import styled from "styled-components";

import HeatmapTileMobile from "./HeatmapTileMobile";
import HeatmapTilePC from "./HeatmapTilePC";
import PopupOverlay from "../Overlay";
import SingleIcon from "../SingleIcon";

import useIsMobile from "../../hooks/useIsMobile";
import useHeatmapControllerDataset from "../../hooksSpecific/useHeatmapControllerDataset";
import useHeatmapControllerSortData from "../../hooksSpecific/useHeatmapControllerSortData";



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

const NumberInput = styled.input.attrs({ type: 'number' })
`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80px;
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

const HeatmapContainer = styled.div
`
    display: flex;
    flex-direction: row;
    gap: 10px;
`
;

const PieceSection = styled.div
`
    h3 {
        font-size: 20px;
    }
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
    // position: sticky;
    // top: calc(160px - 20px); /* Adjust based on InputContainer height and margin */
    // left: 0;
    // z-index: 900;
    // background-color: lightgrey;
`
;


const DisplayColumn = styled.div
`
    min-width: 50px;
    max-width: 55px;

`
;

const HeatmapController = (props) => {
    const [pieceMoves, setPieceMoves] = useState({
        pawn: [],
        rook: [],
        knight: [],
        bishop: [],
        queen: [],
        king: [],
        castling: [],
    });

    //
    // States
    //
    const [renderFlag, setRenderFlag] = useState(false);
    const [start, setStart] = useState(0); // Default start value
    const [end, setEnd] = useState(5); // Default end value
    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team
    const [popupMatchHistory, setPopupMatchHistory] = useState(null); // State to hold selected match details
    const [singleTileSelected, setSingleTileSelected] = useState(null); // for Mobile - Displays Bubble if selected

    //
    // Hooks
    //
    const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device
    const hookDataSet = useHeatmapControllerDataset(props.matchHistory);
    const hookSortData = useHeatmapControllerSortData(hookDataSet, start, end, selectedTeam);

    useEffect(() => {
        if (Object.values(hookDataSet).length > 0) {
            setPieceMoves(hookSortData);
            setRenderFlag(Object.values(hookSortData).length > 0);
        }  
    }, [props, hookSortData, hookDataSet, start, end, selectedTeam]);

    const handleStartChange = (event) => {
        setStart(parseInt(event.target.value));
    };

    const handleEndChange = (event) => {
        setEnd(parseInt(event.target.value));
    };

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };


    // Method when a user clicks on the "ViewGames" button on a single tile
    const handleIndividualTileClick = (tile) => {
        const matchHistory = props.matchHistory;
        const arrayMatchId = tile.matches.map((entry) => entry.id);
        const filterMatchHistory = (matchHistory, array) => matchHistory.filter((obj) => array.includes(obj.general.id));
        const result = filterMatchHistory(matchHistory, arrayMatchId);
        setPopupMatchHistory(result);
    };


    // Function to render pawn icon with associated number of wins/losses/draws/total
    // see SingleIcon.js 
    const renderPieceIcon = (iconType, color) => (
        <DisplayColumnTitle>
            <SingleIcon icon={iconType} color={color} size={30} />
            {/* <p>Moves:</p> */}
        </DisplayColumnTitle>
    );

    return (
        <>
            {!renderFlag && (
                <p>HeatmapController - renderFlag is false</p>
            )}

            {renderFlag && (
                <>
                    <h1 style={{ textAlign: "center" }}>Heatmap</h1>

                    <InputContainer>
                        <div>
                            <Label htmlFor="startInput">Start:</Label>
                            <NumberInput id="startInput" value={start} onChange={handleStartChange} />
                            <Label htmlFor="endInput">End:</Label>
                            <NumberInput id="endInput" value={end} onChange={handleEndChange} />
                        </div>

                        <div>
                            <Label htmlFor="teamSelect">Select Team:</Label>
                            <DropDownBox id="teamSelect" value={selectedTeam} onChange={handleTeamChange}>
                                <option value="white">White</option>
                                <option value="black">Black</option>
                            </DropDownBox>
                        </div>
                    </InputContainer>


                    <HeatmapContainer>
                        {!hookIsMobile && (
                            <>
                                <DisplayColumn>
                                    {renderPieceIcon(`${selectedTeam}Pawn`, selectedTeam)}
                                    {pieceMoves.pawn.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`rook`, selectedTeam)}
                                    {pieceMoves.rook.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`knight`, selectedTeam)}
                                    {pieceMoves.knight.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`bishop`, selectedTeam)}
                                    {pieceMoves.bishop.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`queen`, selectedTeam)}
                                    {pieceMoves.queen.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`king`, selectedTeam)}
                                    {pieceMoves.king.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`castle`, selectedTeam)}
                                    {renderPieceIcon(`king`, selectedTeam)}
                                    {pieceMoves.castling.map((moveObj) => (
                                        <HeatmapTilePC
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
                                    {pieceMoves.pawn.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`rook`, selectedTeam)}
                                    {pieceMoves.rook.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`knight`, selectedTeam)}
                                    {pieceMoves.knight.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`bishop`, selectedTeam)}
                                    {pieceMoves.bishop.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`queen`, selectedTeam)}
                                    {pieceMoves.queen.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`king`, selectedTeam)}
                                    {pieceMoves.king.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`exchange`, selectedTeam)}
                                    {pieceMoves.castling.map((moveObj) => (
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
        </>
    );
};

export default HeatmapController;
