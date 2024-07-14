import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { Container, Title, FlexRow } from "../styles3";
import { Container, Title, Inner, ContainerUserInput, FlexRow, FlexLabel, FlexDropDown} from "../styles3";

import HeatmapTileMobile from "../moduleHeatmapAnalysis/HeatmapTileMobile";
import HeatmapTilePC from "../moduleHeatmapAnalysis/HeatmapTilePC";
import PopupOverlay from "../Overlay";
import SingleIcon from "../SingleIcon";


import useIsMobile from "../../hooks/useIsMobile";
import useHeatmapControllerDataset from "../../hooksSpecific/useHeatmapControllerDataset";
import useHeatmapControllerWinsLossDraw from "../../hooksSpecific/useHeatmapControllerWinsLossDraw";




//
// Styles
//





// const Label = styled.label
// `
//     font-weight: bold;
//     margin-right: 10px;
// `

// const DropDownBox = styled.select
// `
//     padding: 8px;
//     font-size: 16px;
//     border: 1px solid #ccc;
//     border-radius: 5px;
//     min-width: 120px;
// `
// ;

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
    // // console.log(matchHistory)

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

    console.log("hookWinsLossDrawWHITE")
    console.log(hookWinsLossDrawWHITE)
    console.log()


    // // console.log(testHook)

    //
    // Effects
    //
    useEffect(() => {
        // // // console.log(hookWinLossDraw)
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


    //
    // Helpers
    //
    // Method when a user clicks on the "ViewGames" button on a single tile
    const handleIndividualTileClick = (tile) => {
        // console.log(tile)
        const myMatchHistory = tile.matches;
        // console.log(myMatchHistory)
        const arrayMatchId = tile.matches.map((entry) => entry.id);

        // // // // console.log(arrayMatchId)
        // // // // console.log()

        const filterMatchHistory = (matchHistory, array) => matchHistory.filter((obj) => array.includes(obj.general.id));
        const result = filterMatchHistory(matchHistory, arrayMatchId);
        setPopupMatchHistory(result);
    };

    return (
        <Container>
            <Title>Heatmap Overview</Title>
                <>


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

                    {popupMatchHistory && (
                        <PopupOverlay matchHistory={popupMatchHistory} />
                    )}
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
