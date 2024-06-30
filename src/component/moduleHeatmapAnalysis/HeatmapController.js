import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./UniqueMoves.css";

import useIsMobile from "../../hooks/useIsMobile";

import useHeatmapControllerDataset from "../../hooksSpecific/useHeatmapControllerDataset";
import useHeatmapControllerSortData from "../../hooksSpecific/useHeatmapControllerSortData";

import HeatmapTile from "./HeatmapTile";

import MatchHistoryDisplay from "../moduleMatchHistoryDisplay/MatchHistoryDisplay";

import SingleIcon from "../SingleIcon";



const InputContainer = styled.div
`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
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
    color: red;
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

const PopupOverlay = styled.div
`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
`
;


const PopupInner = styled.div
`
    background: white;
    padding: 20px;
    border-radius: 8px;
    position: relative;
    max-width: 600px;
    width: 90%;
`
;

const CloseButton = styled.button
`
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
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

    const [renderFlag, setRenderFlag] = useState(false);

    // console.log(props)
    const [start, setStart] = useState(0); // Default start value
    const [end, setEnd] = useState(5); // Default end value
    const [selectedTeam, setSelectedTeam] = useState("white"); // Default selected team

    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const [selectedMatch, setSelectedMatch] = useState(null); // State to hold selected match details

    const [popupMatchHistory, setPopupMatchHistory] = useState(null); // State to hold selected match details

    const [singleTileSelected, setSingleTileSelected] = useState(null); // for Mobile - Displays Bubble if selected

    const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device

    const hookDataSet = useHeatmapControllerDataset(props.matchHistory);
    
    const hookSortData = useHeatmapControllerSortData(hookDataSet, start, end, selectedTeam);


    useEffect(() => {
        if (Object.values(hookDataSet).length > 0) {
            setPieceMoves(hookSortData);

            if (Object.values(hookSortData).length > 0) {
                setRenderFlag(true);
            }
            else {
                setRenderFlag(false);
            }
        }  
    }, [props, hookSortData, hookDataSet, start, end, selectedTeam]);


    const handleMatchHistoryDisplay = () => {
        console.log("===handleMatchHistoryDisplay===");
        console.log();
    };
    

    const handleStartChange = (event) => {
        setStart(parseInt(event.target.value));
    };

    const handleEndChange = (event) => {
        setEnd(parseInt(event.target.value));
    };

    const handleTeamChange = (event) => {
        setSelectedTeam(event.target.value);
    };

    // On mobile, small popup if tapped
    const handleMobileClick = (move) => {
        if (hookIsMobile) {
            setSingleTileSelected(move);
        }
    };

    // When Clicking on a Heatmap Tile, you will get the matches where the game happened
    const handleIndividualTileClick = (tile) => {

        console.log("=======handleIndividualTileClick======")
        console.log();


        const matchHistory = props.matchHistory;
        const arrayMatchId = tile.matches.map((entry) => entry.id);

        function filterMatchHistory(matchHistory, array) {
            return matchHistory.filter((obj) => array.includes(obj.general.id));
        }

        const result = filterMatchHistory(matchHistory, arrayMatchId);
        // console.log(result)

        setPopupMatchHistory(result);
        setShowPopup(true);

        console.log(popupMatchHistory)
    };

    // const handleIndividualTileClick = (tile) => {
    //     // Handle click on heatmap tile to show popup
    //     setSelectedMatch(tile.matches); // Assuming tile.matches holds match details
    //     setShowPopup(true);
    //   };

    return (
        <>

            {!renderFlag && (
                <p>HeatmapController - renderFlag is flag</p>
            )}

            {renderFlag && (

                <>
                    <h2>Winning Moves Heatmap</h2>

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
                        {Object.entries(pieceMoves).map(([pieceType, moves]) => (
                            <div key={pieceType} className="piece-section">
                                <h3>{pieceType.toUpperCase()} Moves</h3>

                                {/* {moves.map((moveObj) => (
                                <div
                                key={moveObj.move}
                                className={`heatmap-item ${getColorClass(moveObj.winpct)}`}
                                onClick={() => handleMobileClick(moveObj)}
                                > */}

                                {/* {moves.map((moveObj) => (
                                <div onClick={() => handleMobileClick(moveObj)}>
                                <HeatmapTile tileInformation={moveObj} isClicked={singleTileSelected===moveObj} >

                                </HeatmapTile>
                                </div>
                                ))} */}

                                {moves.map((moveObj) => (
                                    <div key={moveObj.move}>
                                        <HeatmapTile
                                            tileInformation={moveObj}
                                            isClicked={singleTileSelected === moveObj}
                                            handleButtonClick={handleIndividualTileClick} // Pass the handler here
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </HeatmapContainer>



                    {/* Conditionally render MatchHistoryDisplay as popup */}
                    {/* {showPopup && (
                        <div className="popup">
                            <div className="popup-inner">
                                <button className="close-button" onClick={() => setShowPopup(false)}>
                                    Close
                                </button>
                                <MatchHistoryDisplay matchHistory={popupMatchHistory} />
                            </div>
                        </div>
                    )} */}



                    {showPopup && (
                        <PopupOverlay>
                            <PopupInner>
                                <CloseButton onClick={() => setShowPopup(false)}>×</CloseButton>
                                {console.log(popupMatchHistory)}
                                <MatchHistoryDisplay matchHistory={popupMatchHistory} />
                            </PopupInner>
                        </PopupOverlay>
                    )}


                </>
            )}
        </>
    );
};

export default HeatmapController;