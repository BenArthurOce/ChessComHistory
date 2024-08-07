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
import useHeatMasterSort from "../../hooksSpecific/useHeatMasterSort";

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

    //
    // Props
    //
    const {matchHistory, hookMasterData} = props;

    //
    // States
    //
    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team
    const [firstMove, setFirstMove] = useState("1.e4"); // Default starting move

    const [popupMatchHistory, setPopupMatchHistory] = useState(null);
    const [singleTileSelected, setSingleTileSelected] = useState(null);

    //
    // Hooks
    //
    const hookUseHeatmapSubByTurnData = useHeatMasterSort(hookMasterData, selectedTeam, firstMove)
    const hookIsMobile = useIsMobile(true);

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
                {Object.values(hookUseHeatmapSubByTurnData).map((tile, index) => (
                    
                    
                    <Row key={`row-${index}`}>
                        <TurnNumber>Turn: {index + 1}</TurnNumber> {/* Add 1 to index */}
                        <MovesContainer>

                            <HeatmapTileMobile
                                tileInformation={tile}
                                isClicked={singleTileSelected === tile}
                                handleButtonClick={handleIndividualTileClick}
                                />

                        </MovesContainer>
                    </Row>
                ))}
            </TileContainer>

            {popupMatchHistory && (
                <PopupOverlay matchHistory={popupMatchHistory} />
            )}
        </>
        </Inner>
    );


};
export default HeatmapSubByTurn;
