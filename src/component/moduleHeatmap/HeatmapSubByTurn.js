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
import useHeatMasterSort from "../../hooksSpecific/zzzz_useHeatMasterSort";

import useHeatmapControllerWinsLossDraw from "../../hooksSpecific/zzzz_useHeatmapControllerWinsLossDraw";

//
// Component Styles
//
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


const HeatmapSubByTurn = (props) => {

    console.log("HeatmapSubByTurn")
    console.log(props)

    //
    // Props
    //
    const {matchHistory, hookMasterData} = props;

    //
    // States
    //
    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team
    const [firstMove, setFirstMove] = useState("1.e4"); // Default starting move

    const [dataToRender, setDataToRender] = useState([]); 

    const [popupMatchHistory, setPopupMatchHistory] = useState(null);
    const [singleTileSelected, setSingleTileSelected] = useState(null);

    //
    // Hooks
    //


    // const hookUseHeatmapSubByTurnData = useHeatMasterSort(hookMasterData, selectedTeam, firstMove);

    const hookUseHeatmapControllerWinsLossDraw = useHeatmapControllerWinsLossDraw(hookMasterData, selectedTeam, firstMove);

    // Disable feature for now
    // const hookUseHeatmapControllerWinsLossDraw = null
    // console.log(hookUseHeatmapControllerWinsLossDraw)

    // console.log(hookUseHeatmapSubByTurnData);



    const hookIsMobile = useIsMobile(true);


    //
    // Effects
    //
    useEffect(() => {

        if (!hookUseHeatmapControllerWinsLossDraw || hookUseHeatmapControllerWinsLossDraw.length === 0) { return};

        console.log(hookUseHeatmapControllerWinsLossDraw)

        // const groupedByTurn = hookUseHeatmapControllerWinsLossDraw.reduce((acc, obj) => {
        //     const turn = obj.turn;
          

        //     if (obj.isPositive && obj.played >= 2) {
        //       // Initialize the array for this turn if it doesn't exist
        //       if (!acc[turn]) {
        //         acc[turn] = [];
        //       }
          
        //       acc[turn].push(obj);
        //     }  
        //     return acc;
        //   }, {});
          
        //   // Sort each turn array by score in descending order and keep only the top 3
        //   for (let turn in groupedByTurn) {
        //     groupedByTurn[turn]
        //       .sort((a, b) => b.score - a.score)  // Sort by score (highest to lowest)
        //       .splice(3);  // Keep only the first 3
        //   }
          
        //   console.log(groupedByTurn);
          

        //   setDataToRender(groupedByTurn)
        setDataToRender(hookUseHeatmapControllerWinsLossDraw)
    }
    , [hookUseHeatmapControllerWinsLossDraw]);

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
        const myMatchHistory = tile.matchIds;
        const filterMatchHistory = (matchHistory, array) => matchHistory.filter((obj) => array.includes(obj.general.id));
        const result = filterMatchHistory(matchHistory, myMatchHistory);
        setPopupMatchHistory(result);
    };

    return (
        <Inner>
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

                {hookIsMobile && Object.keys(dataToRender).length > 0 && (
                <>
                    {Object.values(dataToRender).map((data, index) => ( 
                    <>
                        <Row key={`row-${index}`}>
                            <TurnNumber>Turn: {index + 1}</TurnNumber>
                            <MovesContainer>

                                {Object.values(data).map((tile, index2) => (
                                <>
                                {/* {console.log('tile')}
                                {console.log(tile)}
                                {console.log('index2')}
                                {console.log(index2)} */}
                                    <HeatmapTileMobile
                                        tileInformation={tile}
                                        isClicked={singleTileSelected === tile}
                                        handleButtonClick={handleIndividualTileClick}
                                        />
                                </>
                                ))} 

                            </MovesContainer>
                        </Row>
                    </>
                    ))} 
                </>
                )}

            </TileContainer>

            {popupMatchHistory && (
                <PopupOverlay matchHistory={popupMatchHistory} />
            )}
        </>
        </Inner>
    );


};
export default HeatmapSubByTurn;
