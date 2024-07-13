import React, { useState, useEffect } from "react";
import styled from "styled-components";

import HeatmapTilePC from "../moduleHeatmapAnalysis/HeatmapTilePC";
import HeatmapTileMobile from "../moduleHeatmapAnalysis/HeatmapTileMobile";
import PopupOverlay from "../Overlay";
import SingleIcon from "../SingleIcon";



import useIsMobile from "../../hooks/useIsMobile";
import useHeatmapControllerDataset from "../../hooksSpecific/useHeatmapControllerDataset";
import useHeatmapControllerSortData from "../../hooksSpecific/useHeatmapControllerSortData";
import useHeatmapControllerWinsLossDraw from "../../hooksSpecific/useHeatmapControllerWinsLossDraw";

//
// Styles
//
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: auto;
    padding: 20px;
    box-sizing: border-box;
`;

const Title = styled.h1`
    text-align: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
    background-color: #f0f0f0;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FlexRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const Label = styled.label`
    display: flex;
    font-weight: bold;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
`;

const NumberInput = styled.input`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 60px;
    margin-right: 10px;
    box-sizing: border-box;
`;

const NumericIncDecContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const IncDecArrow = styled.button`
    width: 30px;
    height: 30px;
`;

const IncDecArrowContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const DropDownBox = styled.select`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    min-width: 120px;
    box-sizing: border-box;
`;

const HeatmapContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    flex-wrap: nowrap;
    overflow-x: auto;
`;

const DisplayColumnTitle = styled.div`
    margin-top: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
`;

const DisplayColumn = styled.div`
    flex-grow: 1;
`;

const TileContainer = styled.div`
    display: grid;
    gap: 10px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 60px;
`;

const TurnNumber = styled.div`
    padding-left: 5px;
    font-weight: bold;
    min-width: 20%;
`;

const MovesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`;

const HeatmapMaster = (props) => {
    //
    // Props
    //
    const { matchHistory } = props;

    //
    // States
    //
    const [start, setStart] = useState(0); // Default start value
    const [end, setEnd] = useState(5); // Default end value
    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team
    const [firstMove, setFirstMove] = useState("1.e4"); // Default starting move

    const [popupMatchHistory, setPopupMatchHistory] = useState(null); // State to hold selected match details
    const [singleTileSelected, setSingleTileSelected] = useState(null); // for Mobile - Displays Bubble if selected

    const [renderFlag, setRenderFlag] = useState(false);

    //
    // Hooks
    //
    const hookIsMobile = useIsMobile(); // Custom hook to test if mobile device
    const hookDataSet = useHeatmapControllerDataset(matchHistory);
    const hookSortData = useHeatmapControllerSortData(hookDataSet, start, end, selectedTeam, firstMove); // Should be renamed
    const hookWinsLossDraw = useHeatmapControllerWinsLossDraw(hookDataSet, selectedTeam, firstMove);

    //
    // Effects
    //
    useEffect(() => {
        if (Object.values(hookWinsLossDraw).length > 0) {
            setRenderFlag(true);
        } else {
            setRenderFlag(false);
        }
    }, [hookWinsLossDraw]);

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
            setStart((prev) => prev + 1);
        }
    };

    const handleStartMoveDec = () => {
        if (start > 0) {
            setStart((prev) => prev - 1);
        }
    };

    const handleEndMoveInc = () => {
        if (end > start) {
            setEnd((prev) => prev + 1);
        }
    };

    const handleEndMoveDec = () => {
        if (end > start + 1) {
            setEnd((prev) => prev - 1);
        }
    };

    //
    // Helpers
    //
    const handleIndividualTileClick = (tile) => {
        const arrayMatchId = tile.matches.map((entry) => entry.id);
        const filterMatchHistory = (matchHistory, array) =>
            matchHistory.filter((obj) => array.includes(obj.general.id));
        const result = filterMatchHistory(matchHistory, arrayMatchId);
        setPopupMatchHistory(result);
    };

    const renderPieceIcon = (iconType, color) => (
        <DisplayColumnTitle>
            <SingleIcon icon={iconType} color={color} size={30} />
        </DisplayColumnTitle>
    );

    return (
        <Container>
            {Object.keys(hookSortData).length === 0 && <p>HeatmapController - renderFlag is false</p>}
            {Object.keys(hookSortData).length > 0 && (
                <>
                    <Title>Heatmap Analysis</Title>
                    <InputContainer>
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
                    <HeatmapContainer>
                        {!hookIsMobile &&
                            ["pawn", "rook", "knight", "bishop", "queen", "king", "castling"].map((piece, index) => (
                                <DisplayColumn key={index}>
                                    {renderPieceIcon(piece, selectedTeam)}
                                    {hookSortData[piece].map((moveObj, idx) => (
                                        <HeatmapTilePC
                                            key={idx}
                                            moveObj={moveObj}
                                            handleClick={() => handleIndividualTileClick(moveObj)}
                                        />
                                    ))}
                                </DisplayColumn>
                            ))}
                        {hookIsMobile && (
                            <TileContainer>
                                {Object.entries(hookSortData).map(([piece, moves], idx) => (
                                    <Row key={idx}>
                                        <TurnNumber>{piece}</TurnNumber>
                                        <MovesContainer>
                                            {/* {moves.map((moveObj, idx) => (
                                                <HeatmapTileMobile
                                                    key={idx}
                                                    moveObj={moveObj}
                                                    selected={singleTileSelected === idx}
                                                    handleClick={() => setSingleTileSelected(idx)}
                                                />
                                            ))} */}
                                        </MovesContainer>
                                    </Row>
                                ))}
                            </TileContainer>
                        )}
                    </HeatmapContainer>
                    {popupMatchHistory && <PopupOverlay data={popupMatchHistory} onClose={() => setPopupMatchHistory(null)} />}
                </>
            )}
        </Container>
    );
};

export default HeatmapMaster;
