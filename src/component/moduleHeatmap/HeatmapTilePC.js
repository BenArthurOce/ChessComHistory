import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

//
// Component Styles
//
const Tile = styled.div
`
    position: relative;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${(props) => props.colorBackground};
    border: ${(props) => (props.isClicked ? "3px solid #000" : "1px solid #ccc")};
`
;

const Popup = styled.div
`
    position: absolute;
    top: 40px;
    left: 10px;
    border: 5px solid black;
    border-radius: 5px;
    padding: 5px;
    z-index: 10;
    width: 120px;
    white-space: nowrap;
    background-color: ${(props) => props.colorBackground};
`
;

const PopupTextSpan = styled.span
`
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 5px;
    font-size: 12px;
    text-wrap: nowrap;
`
;


const HeatmapTilePC = (props) => {

    //
    // Props
    //
    const { tileInformation, isClicked, handleButtonClick } = props;
    const tile = tileInformation;

    //
    // States
    //
    const [colorBackground, setColorBackground] = useState("");
    const [isDisplayPopup, setIsDisplayPopup] = useState(false);
    const tileRef = useRef(null);

    //
    // Effects
    //
    useEffect(() => {
        if (tile.winrate >= 95) {
            setColorBackground("#35d404"); 
        } else if (tile.winrate >= 90) {
            setColorBackground("#35d404"); 
        } else if (tile.winrate >= 85) {
            setColorBackground("#2cba00"); 
        } else if (tile.winrate >= 80) {
            setColorBackground("#2cba00"); 
        } else if (tile.winrate >= 75) {
            setColorBackground("#2cba00"); 
        } else if (tile.winrate >= 70) {
            setColorBackground("#60ba00"); 
        } else if (tile.winrate >= 65) {
            setColorBackground("#60ba00");
        } else if (tile.winrate >= 60) {
            setColorBackground("#60ba00"); 
        } else if (tile.winrate >= 55) {
            setColorBackground("#60ba00"); 
        } else if (tile.winrate >= 50) {
            setColorBackground("#82ba00"); 
        } else if (tile.winrate >= 45) {
            setColorBackground("#d0db02"); 
        } else if (tile.winrate >= 40) {
            setColorBackground("#d0db02"); 
        } else if (tile.winrate >= 35) {
            setColorBackground("#d0db02"); 
        } else if (tile.winrate >= 30) {
            setColorBackground("#d1b204"); 
        } else if (tile.winrate >= 25) {
            setColorBackground("#d1b204"); 
        } else if (tile.winrate >= 20) {
            setColorBackground("#ff0000"); 
        } else if (tile.winrate >= 15) {
            setColorBackground("#ff0000"); 
        } else if (tile.winrate >= 10) {
            setColorBackground("#ff0000"); 
        } else if (tile.winrate >= 5) {
            setColorBackground("#ff0000"); 
        } else if (tile.winrate >= 0) {
            setColorBackground("#ff0000"); 
        } else {
            setColorBackground("black"); // Indicates an error
        }
    }, [tile]);

    // Sets the click event for the popup
    useEffect(() => {

        function handleClickOutside(event) {
            if (tileRef.current && !tileRef.current.contains(event.target)) {
                setIsDisplayPopup(false)    // Allows only one tile at a time to have an active popup displayed
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [tileRef, tileInformation]);


    //
    // Handles
    //
    const handleButtonPress = (tile) => {
        handleButtonClick(tileInformation);
    };

    // When the user clicks an individual tile - gets small popup of tile information
    const handleHeatmapTileClicked = () => {
        setIsDisplayPopup(!isClicked);
    }

    return (
    <>
        {props && (
        <>
            <Tile ref={tileRef} colorBackground={colorBackground} isDisplayPopup={isDisplayPopup} onClick={() => handleHeatmapTileClicked()}>
                <PopupTextSpan>
                    <p>{tile.move}</p>
                </PopupTextSpan>

                {isDisplayPopup && (
                    <Popup colorBackground={colorBackground}>
                        <PopupTextSpan><p><b>Move:</b></p><p>{tile.move}</p></PopupTextSpan>
                        <PopupTextSpan><p><b>Rate:</b></p><p>{tile.winpct.toFixed(2)}%</p></PopupTextSpan>
                        <br></br>
                        <PopupTextSpan><p><b>Games:</b></p><p>{tile.played}</p></PopupTextSpan>
                        <PopupTextSpan><p><b>Won:</b></p><p>{tile.win}</p></PopupTextSpan>
                        <PopupTextSpan><p><b>Lost:</b></p><p>{tile.lose}</p></PopupTextSpan>
                        <PopupTextSpan><p><b>Draw:</b></p><p>{tile.draw}</p></PopupTextSpan>

                        {/* Button - Link to Games */}
                        <PopupTextSpan>
                            <button onClick={() => handleButtonPress(tile)}>  ViewGames </button>
                        </PopupTextSpan>
                    </Popup>
                )}
            </Tile>
        </>
        )}

    </>
    );
}

export default HeatmapTilePC;
