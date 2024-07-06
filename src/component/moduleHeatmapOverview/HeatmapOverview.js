import React, { useState, useEffect } from "react";
import styled from "styled-components";

// Import your components and hooks
import useIsMobile from "../../hooks/useIsMobile";
import useHeatmapControllerDataset from "../../hooksSpecific/useHeatmapControllerDataset";
import useHeatmapControllerWinsLossDraw from "../../hooksSpecific/useHeatmapControllerWinsLossDraw";

import HeatmapTilePC from "../moduleHeatmapAnalysis/HeatmapTilePC";
import HeatmapTileMobile from "../moduleHeatmapAnalysis/HeatmapTileMobile";

//
// Styles
//
const Container = styled.div
`
    height: 100%;
    overflow-y: scroll;
`
;

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

const DropDownBox = styled.select
`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    min-width: 120px;
`
;

const TileContainer = styled.div
`
    display: grid;
    gap: 10px;
`
;

const Row = styled.div
`
    display: flex;
    align-items: center;
    gap: 10px;
    min-height: 60px;
`
;

const TurnNumber = styled.div
`
    padding-left: 5px;
    font-weight: bold;
    min-width: 20%;
`
;

const MovesContainer = styled.div
`
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
`
;


const HeatmapOverview = (props) => {

    //
    // Props
    //
    const { matchHistory } = props;

    //
    // States
    //
    const [renderFlag, setRenderFlag] = useState(false);
    const [popupMatchHistory, setPopupMatchHistory] = useState(null);
    const [singleTileSelected, setSingleTileSelected] = useState(null);

    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team
    const [firstMove, setFirstMove] = useState("1.e4"); // Default starting move

    //
    // Hooks
    //
    const hookIsMobile = useIsMobile(true);
    const hookDataSet = useHeatmapControllerDataset(matchHistory);
    const hookWinsLossDrawWHITE = useHeatmapControllerWinsLossDraw(hookDataSet, selectedTeam, firstMove);
    const hookWinsLossDrawBLACK = useHeatmapControllerWinsLossDraw(hookDataSet, selectedTeam, firstMove);

    const hookWinLossDraw = useHeatmapControllerWinsLossDraw(hookDataSet, selectedTeam, firstMove)

    //
    // Effects
    //
    useEffect(() => {
        console.log(hookWinLossDraw)
        if (Object.values(hookWinsLossDrawWHITE).length > 0 && Object.values(hookWinsLossDrawBLACK).length > 0) {
            setRenderFlag(true);
        } else {
            setRenderFlag(false);
    }
    }, [hookWinsLossDrawWHITE, hookWinsLossDrawBLACK]);

    //
    // Handlers
    //
    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };

    const handleFirstMoveChange = (event) => {
        setFirstMove(event.target.value);
    };

    // For debugging purposes. When the component is clicked
    const handleIndividualTileClick = (item) => {
        // console.log("handleIndividualTileClick")
        // console.log(item);
    };



    return (
        <Container>
            <Title>Heatmap Overview</Title>
                <>
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


                    <TileContainer>
                        {Object.values(hookWinLossDraw).map((array, index) => (
                            <Row key={`row-${index}`}>
                                <TurnNumber>Turn: {index + 1}</TurnNumber> {/* Add 1 to index */}
                                <MovesContainer>
                                    {array.map((item, innerIndex) => (


                                        <HeatmapTileMobile
                                            tileInformation={item}
                                            isClicked={singleTileSelected === item}
                                            handleButtonClick={handleIndividualTileClick}
                                        />

                                        // <Tile key={`tile-${index}-${innerIndex}`} onClick={() => handleComponentClick(item)}>
                                        //     <p>{item.move}</p>
                                        // </Tile>
                                    ))}
                                </MovesContainer>
                            </Row>
                        ))}
                    </TileContainer>
                </>
        </Container>
    );


};
export default HeatmapOverview;

// {hookSortData.king.map((moveObj) => (
//     <HeatmapTileMobile
//         tileInformation={moveObj}
//         isClicked={singleTileSelected === moveObj}
//         handleButtonClick={handleIndividualTileClick}
//     />
// ))}

// {hookSortData.king.map((moveObj) => (
//     <HeatmapTileMobile
//         tileInformation={moveObj}
//         isClicked={singleTileSelected === moveObj}
//         handleButtonClick={handleIndividualTileClick}
//     />
// ))}