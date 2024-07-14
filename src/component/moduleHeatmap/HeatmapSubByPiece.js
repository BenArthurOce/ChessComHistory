import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Container, Title, Inner, ContainerUserInput, FlexRow, FlexLabel, FlexDropDown} from "../styles3";
// import { Container, Title, FlexRow } from "../styles3";

import HeatmapTileMobile from "./HeatmapTileMobile";
import HeatmapTilePC from "./HeatmapTilePC";
import PopupOverlay from "../Overlay";

import SingleIcon from "../SingleIcon";
import useIsMobile from "../../hooks/useIsMobile";
import useHeatMasterSort from "../../hooksSpecific/useHeatMasterSort";

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

const HeatmapSubByPiece = (props) => {

    //
    // Props
    //
    const {turnData} = props

    //
    // States
    //
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(5);
    const [selectedTeam, setSelectedTeam] = useState("white");
    const [firstMove, setFirstMove] = useState("1.e4");

    const [dataToRender, setDataToRender] = useState([]);


    const [popupMatchHistory, setPopupMatchHistory] = useState(null); // State to hold selected match details
    const [singleTileSelected, setSingleTileSelected] = useState(null); // for Mobile - Displays Bubble if selected


    //
    // Hooks
    //
    const hookIsMobile = useIsMobile(); // Custom hook to test if mobile device
    const hookUseHeatmapSubByTurnData = useHeatMasterSort(turnData, selectedTeam, firstMove, start, end)



    //
    // Effects
    //
    useEffect(() => {

        if (!turnData || turnData.length === 0) { return};
        if (!hookUseHeatmapSubByTurnData || hookUseHeatmapSubByTurnData.length === 0) { return};

        // console.log(turnData)

        function performFilterByPiece(data, piece) {
            return data.filter((entry) => entry.piece === piece);
        };


        // // Combining multiple "tiles" into a single tile
        // function combineStats(array) {
        //     return array.reduce((acc, obj) => {
        //       acc.wins += obj.wins;
        //       acc.losses += obj.losses;
        //       acc.draws += obj.draws;
        //       acc.matchIds = acc.matchIds.concat(obj.matchIds);
        //       return acc;
        //     }, {
        //       wins: 0,
        //       losses: 0,
        //       draws: 0,
        //       matchIds: [],
        //       team: array[0].team,
        //       piece: array[0].piece,
        //       firstMove: array[0].firstMove,
        //     });
        //   }


          const summaryByPiece = {
            pawn: performFilterByPiece(hookUseHeatmapSubByTurnData, "Pawn"),
            rook: performFilterByPiece(hookUseHeatmapSubByTurnData, "Rook"),
            knight: performFilterByPiece(hookUseHeatmapSubByTurnData, "Knight"),
            bishop: performFilterByPiece(hookUseHeatmapSubByTurnData, "Bishop"),
            queen: performFilterByPiece(hookUseHeatmapSubByTurnData, "Queen"),
            king: performFilterByPiece(hookUseHeatmapSubByTurnData, "King"),
            castling: performFilterByPiece(hookUseHeatmapSubByTurnData, "Castling"),
          }

        //   console.log(summaryByPiece)

          setDataToRender(summaryByPiece);

        // const a = performFilterByPiece(hookUseHeatmapSubByTurnData, "Knight")
        // console.log(Object.keys(dataToRender).length)
        // console.log(dataToRender.length)
        // console.log(dataToRender.length === 0)
    }
    , [hookUseHeatmapSubByTurnData]);



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


        // In order to get the viewGames working
        // Need to pass an array of ID numbers (tile.matchIds)


        // // // // // console.log(tile)
        // const myMatchHistory = tile.matchIds;
        // // // // // console.log(myMatchHistory)
        // const arrayMatchId = tile.matchIds.map((entry) => entry.id);

        // // // // // console.log(arrayMatchId)
        // // // // // console.log()

        // const filterMatchHistory = (matchHistory, array) => matchHistory.filter((obj) => array.includes(obj.general.id));
        // const result = filterMatchHistory(hookUseHeatmapSubByTurnData, arrayMatchId);
        // setPopupMatchHistory(result);
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
                        {/* {console.log(dataToRender)} */}
                        {/* {console.log(dataToRender.length)} */}
                        {!hookIsMobile && Object.keys(dataToRender).length > 0 && (
                            <>
                            
                                <DisplayColumn>
                                    {renderPieceIcon(`pawn`, selectedTeam)}
                                    {dataToRender.pawn.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`rook`, selectedTeam)}
                                    {dataToRender.rook.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`knight`, selectedTeam)}
                                    {dataToRender.knight.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`bishop`, selectedTeam)}
                                    {dataToRender.bishop.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`queen`, selectedTeam)}
                                    {dataToRender.queen.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`king`, selectedTeam)}
                                    {dataToRender.king.map((moveObj) => (
                                        <HeatmapTilePC
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`exchange`, selectedTeam)}
                                    {dataToRender.castling.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
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
                                    {dataToRender.pawn.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`rook`, selectedTeam)}
                                    {dataToRender.rook.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`knight`, selectedTeam)}
                                    {dataToRender.knight.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`bishop`, selectedTeam)}
                                    {dataToRender.bishop.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`queen`, selectedTeam)}
                                    {dataToRender.queen.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`king`, selectedTeam)}
                                    {dataToRender.king.map((moveObj) => (
                                        <HeatmapTileMobile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick}
                                        />
                                    ))}
                                </DisplayColumn>

                                <DisplayColumn>
                                    {renderPieceIcon(`exchange`, selectedTeam)}
                                    {dataToRender.castling.map((moveObj) => (
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

            



        </Container>
    );
};

export default HeatmapSubByPiece;
