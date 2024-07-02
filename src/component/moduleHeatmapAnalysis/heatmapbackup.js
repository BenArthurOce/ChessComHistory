import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";


//
// Styles
//
const TilePC = styled.div
`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    text-align: center;
    background-color: ${(props) => props.colorBackground};
    border: ${(props) => (props.isClicked ? "3px solid #000" : "1px solid #ccc")};
`
;


const TileTextSpan = styled.span
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


    return (
        <>
            {props && (
                <>
                    <TilePC ref={tileRef} colorBackground={colorBackground}>
                        <TileTextSpan><p><b>Move:</b></p><p>{tile.move}</p></TileTextSpan>
                        <TileTextSpan><p><b>Games:</b></p><p>{tile.played}</p></TileTextSpan>
                        <TileTextSpan><p><b>Rate:</b></p><p>{tile.winpct.toFixed(2)}%</p></TileTextSpan>
                    </TilePC>
                </>
            )}
        </>
    );
}

export default HeatmapTilePC;
