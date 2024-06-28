import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";

const Container = styled.div
`

`
;


const UniqueMoveTileStyledMobile = styled.div
`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    position: relative;
    text-align: center;

    background-color: ${(props) => props.colorBackground};
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


function HeatmapTile(props) {

    const tile = props.tileInformation;
    const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device

    const [colorBackground, setColorBackground] = useState("");
    const [clickedTile, setClickedTile] = useState(null); // Popup bubble if tile is clicked. Should set to useToggle


    const tileRef = useRef(null);


    useEffect(() => {
        if (tile.winpct >= 60) {
          setColorBackground("#4caf50"); // Dark Green (win over 60%)
        } else if (tile.winpct > 50) {
          setColorBackground("#8dbd4f"); // Light Green (win 50% - 60%)
        } else if (tile.winpct === 50) {
          setColorBackground("#ffeb3b"); // Yellow (win 50%)
        } else if (tile.winpct >= 40) {
          setColorBackground("#ff9800"); // Orange (win 40% - 50%)
        } else if (tile.winpct > 40) {
            setColorBackground("#f44336"); // Red (win under 40%)
        } else {
          setColorBackground("#black"); // Indicates an error
        }
      }, [tile]);


    // On mobile, small popup if tapped
    const handleMobileClick = (move) => {
        if (hookIsMobile) {
            // setClickedTile(move === clickedTile ? null : move); // Toggle popup
            setClickedTile(move)
        }
    };




    return (

        <Container>

            {/* If viewport is Mobile */}
            {props && hookIsMobile && (
                <UniqueMoveTileStyledMobile ref={tileRef} colorBackground={colorBackground} onClick={() => handleMobileClick(tile)}>
                    {tile.move}
                </UniqueMoveTileStyledMobile>
            )}

            {/* If viewport is Mobile and has been tapped */}
            {props && hookIsMobile && clickedTile === tile && (

                <TilePopup colorBackground={colorBackground}>
                    <span><p><b>Move:</b></p> <p>{tile.move}</p></span>
                    <span><p><b>Rate:</b></p> <p>{tile.winpct.toFixed(2)}%</p></span>
                    <br></br>
                    <span><p><b>Games:</b></p> <p>{tile.played}</p></span>
                    <span><p><b>Won:</b></p> <p>{tile.win}</p></span>
                    <span><p><b>Lost:</b></p> <p>{tile.lose}</p></span>
                    <span><p><b>Draw:</b></p> <p>{tile.draw}</p></span>
                    <span><p><b>Null:</b></p> <p>{tile.nullcount}</p></span>
                    <span><p><b>All Games:</b></p> <p>{tile.win + tile.lose + tile.draw + tile.nullcount}</p></span>
                </TilePopup>
            )}
        </Container>


    )
}

export default HeatmapTile;
