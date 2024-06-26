import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";


const TileMobile = styled.div
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


const HeatmapTileMobile = (props) => {

    const { tileInformation, isClicked, handleButtonClick } = props;
    const tile = tileInformation;
    const [colorBackground, setColorBackground] = useState("");
    const tileRef = useRef(null);
    const [isDisplayPopup, setIsDisplayPopup] = useState(false);


    // Sets the background colour of the tile and the popup
    useEffect(() => {
        if (tile.winpct >= 60) {
            setColorBackground("#4caf50"); // Dark Green (win over 60%)
        } else if (tile.winpct > 50) {
            setColorBackground("#8dbd4f"); // Light Green (win 50% - 60%)
        } else if (tile.winpct === 50) {
            setColorBackground("#ffeb3b"); // Yellow (win 50%)
        } else if (tile.winpct >= 40) {
            setColorBackground("#ff9800"); // Orange (win 40% - 50%)
        } else if (tile.winpct >= 0) {
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

    const handleButtonPress = (tile) => {
        handleButtonClick(tileInformation);
    };

    // Handles click event of the tile
    const handleSingleTileClick = () => {
        setIsDisplayPopup(true);
        handleButtonClick(tileInformation);
    };

    return (
        <>
            {props && (
                <>
                    <TileMobile ref={tileRef} colorBackground={colorBackground} isDisplayPopup={isDisplayPopup} onClick={() => setIsDisplayPopup(!isClicked)}>
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
                    </TileMobile>
                </>
            )}

        </>
    );
}

export default HeatmapTileMobile;
