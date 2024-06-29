import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";


const UniqueMoveTileStyledMobile = styled.div
`
    position: relative;
    padding: 10px;
    border: 1px solid #ccc;
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



const UniqueMoveTileStyledPC = styled.div
`
    // position: relative;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    text-align: center;
    
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // cursor: pointer;
    background-color: ${(props) => props.colorBackground};
    border: ${(props) => (props.isClicked ? "3px solid #000" : "1px solid #ccc")};
`
;

const TilePopup = styled.div
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

const TilePopupSpan = styled.span
`
    display: flex;
    justify-content: space-between;
    align-items: start;
    margin-bottom: 5px;
    font-size: 12px;
    text-wrap: nowrap;
`
;


function HeatmapTile(props) {
    const tile = props.tileInformation;
    const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device
    const [colorBackground, setColorBackground] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    const tileRef = useRef(null);

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
                setIsClicked(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [tileRef]);


    return (
        <>
            {/* MOBILE VIEWPORT VERSION */}
            {props && hookIsMobile && (
                <>
                    <UniqueMoveTileStyledMobile ref={tileRef} colorBackground={colorBackground} isClicked={isClicked} onClick={() => setIsClicked(!isClicked)}>
                        <TilePopupSpan>
                            <p>{tile.move}</p>
                        </TilePopupSpan>

                        {isClicked && (
                            <TilePopup colorBackground={colorBackground}>
                                <TilePopupSpan><p><b>Move:</b></p><p>{tile.move}</p></TilePopupSpan>
                                <TilePopupSpan><p><b>Rate:</b></p><p>{tile.winpct.toFixed(2)}%</p></TilePopupSpan>
                                <br></br>
                                <TilePopupSpan><p><b>Games:</b></p><p>{tile.played}</p></TilePopupSpan>
                                <TilePopupSpan><p><b>Won:</b></p><p>{tile.win}</p></TilePopupSpan>
                                <TilePopupSpan><p><b>Lost:</b></p><p>{tile.lose}</p></TilePopupSpan>
                                <TilePopupSpan><p><b>Draw:</b></p><p>{tile.draw}</p></TilePopupSpan>
                                {/* <TilePopupSpan><p><b>Null:</b></p><p>{tile.nullcount}</p></TilePopupSpan>
                                <TilePopupSpan><p><b>All Games:</b></p><p>{tile.win + tile.lose + tile.draw + tile.nullcount}</p></TilePopupSpan> */}
                            </TilePopup>
                        )}
                    </UniqueMoveTileStyledMobile>
                </>
            )}

            {/* PC VIEWPORT VERSION */}
            {props && !hookIsMobile && (
                <>
                    <UniqueMoveTileStyledPC ref={tileRef} colorBackground={colorBackground}>
                        <TilePopupSpan><p><b>Move:</b></p><p>{tile.move}</p></TilePopupSpan>
                        <TilePopupSpan><p><b>Games:</b></p><p>{tile.played}</p></TilePopupSpan>
                        <TilePopupSpan><p><b>Rate:</b></p><p>{tile.winpct.toFixed(2)}%</p></TilePopupSpan>
                    </UniqueMoveTileStyledPC>
                </>
            )}
        </>
    );
}

export default HeatmapTile;
