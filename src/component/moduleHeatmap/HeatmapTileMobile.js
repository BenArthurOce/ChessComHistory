import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

//
// Component Styles
//
const Tile = styled.div
`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: ${(props) => props.colorBackground};
    margin: 10px 0px;

    position: relative;
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

const HeatmapTileMobile = (props) => {

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
        if (tile.winrate >= 60) {
            setColorBackground("#4caf50"); // Dark Green (win over 60%)
        } else if (tile.winrate > 50) {
            setColorBackground("#8dbd4f"); // Light Green (win 50% - 60%)
        } else if (tile.winrate === 50) {
            setColorBackground("#ffeb3b"); // Yellow (win 50%)
        } else if (tile.winrate >= 40) {
            setColorBackground("#ff9800"); // Orange (win 40% - 50%)
        } else if (tile.winrate >= 0) {
            setColorBackground("#f44336"); // Red (win under 40%)
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
                        <PopupTextSpan><p><b>Rate:</b></p><p>{tile.winrate.toFixed(2)}%</p></PopupTextSpan>
                        <br></br>
                        <PopupTextSpan><p><b>Games:</b></p><p>{tile.played}</p></PopupTextSpan>
                        <PopupTextSpan><p><b>Won:</b></p><p>{tile.wins}</p></PopupTextSpan>
                        <PopupTextSpan><p><b>Lost:</b></p><p>{tile.losses}</p></PopupTextSpan>
                        <PopupTextSpan><p><b>Draw:</b></p><p>{tile.draws}</p></PopupTextSpan>

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

export default HeatmapTileMobile;
