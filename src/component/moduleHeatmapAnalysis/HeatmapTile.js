import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useIsMobile from "../../hooks/useIsMobile";


const TileMobile = styled.div
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



const TilePC = styled.div
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
    // console.log(props)

    // const { tileInformation, isClicked, handleButtonClick } = props;

    // const tile = props.tileInformation;
    // const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device
    // const [colorBackground, setColorBackground] = useState("");
    // const [isClicked, setIsClicked] = useState(false);


    const { tileInformation, isClicked, handleButtonClick } = props;
    const tile = tileInformation;
    const hookIsMobile = useIsMobile(true); // Custom hook to test if mobile device
    const [colorBackground, setColorBackground] = useState("");
    const tileRef = useRef(null);
    const [isDisplayPopup, setIsDisplayPopup] = useState(false);

    // const tileRef = useRef(null);

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
        console.log(tile);

        // Object { move: "Bxh6", win: 1, lose: 0, draw: 0, played: 1, piece: "Bishop", nullcount: 0, winpct: 100, matches: (1) […] }
        // const a = tile.matches.map((entry) => entry.id);
        // console.log(a);

        handleButtonClick(tileInformation);
    };

    // Handles click event of the tile
    const handleSingleTileClick = () => {
        setIsDisplayPopup(true);
        handleButtonClick(tileInformation);
    };


    // const handleSingleTileClick = () => {

    //     setIsDisplayPopup(true)
    // }


    return (
        <>
            {/* MOBILE VIEWPORT VERSION */}
            {props && hookIsMobile && (
                <>
                    <TileMobile ref={tileRef} colorBackground={colorBackground} isDisplayPopup={isDisplayPopup} onClick={() => setIsDisplayPopup(!isClicked)}>
                        <TilePopupSpan>
                            <p>{tile.move}</p>
                        </TilePopupSpan>

                        {isDisplayPopup && (
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

                    {/* <Title>
                        <p className="game-id">
                            <a
                                href={`${gameInformation.general.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Site: {gameInformation.general.site} || ID:{" "}
                                {gameInformation.general.id}
                            </a>
                        </p>
                    </Title> */}

                                {/* Link to Games */}
                                <TilePopupSpan>
                                    <button onClick={() => handleButtonPress(tile)}>
                                        ViewGames
                                    </button>
                                </TilePopupSpan>
                            </TilePopup>
                        )}
                    </TileMobile>
                </>
            )}

            {/* PC VIEWPORT VERSION */}
            {props && !hookIsMobile && (
                <>
                    <TilePC ref={tileRef} colorBackground={colorBackground}>
                        <TilePopupSpan><p><b>Move:</b></p><p>{tile.move}</p></TilePopupSpan>
                        <TilePopupSpan><p><b>Games:</b></p><p>{tile.played}</p></TilePopupSpan>
                        <TilePopupSpan><p><b>Rate:</b></p><p>{tile.winpct.toFixed(2)}%</p></TilePopupSpan>
                    </TilePC>
                </>
            )}
        </>
    );
}

export default HeatmapTile;
