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
  const { tileInformation, isClicked, handleTileClick } = props;
  const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device
  const [colorBackground, setColorBackground] = useState("");

  const tileRef = useRef(null);

  // Sets the background colour of the tile and the popup
  useEffect(() => {
    if (tileInformation.winpct >= 60) {
      setColorBackground("#4caf50"); // Dark Green (win over 60%)
    } else if (tileInformation.winpct > 50) {
      setColorBackground("#8dbd4f"); // Light Green (win 50% - 60%)
    } else if (tileInformation.winpct === 50) {
      setColorBackground("#ffeb3b"); // Yellow (win 50%)
    } else if (tileInformation.winpct >= 40) {
      setColorBackground("#ff9800"); // Orange (win 40% - 50%)
    } else if (tileInformation.winpct >= 0) {
      setColorBackground("#f44336"); // Red (win under 40%)
    } else {
      setColorBackground("black"); // Indicates an error
    }
  }, [tileInformation]);

  // Handles click event of the tile
  const handleClick = () => {
    handleTileClick(tileInformation);
  };

  // Sets the click event for the popup
  useEffect(() => {
    function handleClickOutside(event) {
      if (tileRef.current && !tileRef.current.contains(event.target)) {
        // Implement if needed
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
        <UniqueMoveTileStyledMobile
          ref={tileRef}
          colorBackground={colorBackground}
          isClicked={isClicked}
          onClick={handleClick}
        >
          <TilePopupSpan>
            <p>{tileInformation.move}</p>
          </TilePopupSpan>
        </UniqueMoveTileStyledMobile>
      )}

      {/* PC VIEWPORT VERSION */}
      {props && !hookIsMobile && (
        <UniqueMoveTileStyledPC
          ref={tileRef}
          colorBackground={colorBackground}
          onClick={handleClick}
        >
          <TilePopupSpan>
            <p>{tileInformation.move}</p>
          </TilePopupSpan>
        </UniqueMoveTileStyledPC>
      )}
    </>
  );
}

export default HeatmapTile;
