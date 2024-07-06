import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Board from "./Board";
import SingleIcon from "../SingleIcon";

//
// Styles
//
const SingleMatchComp = styled.div
`
    display: grid;
    grid-template-columns: 2% 5% 50% 1fr;
    width: 100%;

    border: 1px solid #ccc;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 200px;

    font-size: 13px;

    background-color: ${(props) => props.colorBackground};
`
;

const ResultBar = styled.span
`
    grid-column: 1;
    grid-row-start: 1;
    grid-row-end: 10;

    border-radius: 100px;
    background-color: ${(props) => props.colorBar}; 
`
;

const BoardContainer = styled.span
`
    display: inline-block;

    align-items: center;
    justify-content: center;

    grid-column-start: 4;
    grid-column-end: 4;

    grid-row-start: 1;
    grid-row-end: 10;

    padding-right:2px;
`
;

const CopyButton = styled.button
`
    grid-column: 2;

    grid-column: 2;
    cursor: pointer;
    align-self: center;

    background: none;   /* Removes the button "look" */
    border: none;       /* Removes the button "look" */
`
;

const Title = styled.span
`
    grid-column: 2 / span 2;
    display: flex;
    padding-left: 5px;
`
;

const Icon = styled(SingleIcon)
`
    grid-column: 2;
    align-self: center;
`
;

const Row = styled.span
`
    grid-column: 3;
    display: flex;
    align-items: center;
    overflow: hidden;
`
;


function SingleMatchMobile(props) {

    //
    // Props
    //
    const { gameInformation } = props;

    //
    // States
    //
    const [copied, setCopied] = useState(false);
    const [colorBar, setColorBar] = useState("");
    const [colorIcon, setColorIcon] = useState("");
    const [colorBackground, setColorBackground] = useState("");

    //
    // Effects
    //
    useEffect(() => {
        if (gameInformation.results.userResult === "win") {
            setColorBar("#19a335");
            setColorIcon("#19a335");
            setColorBackground("#8ceda0");
        } else if (gameInformation.results.userResult === "lose") {
            setColorBar("#a33019");
            setColorIcon("#a33019");
            setColorBackground("#ed9c8c");
        } else if (gameInformation.results.userResult === "draw") {
            setColorBar("#3a3636");
            setColorIcon("#3a3636");
            setColorBackground("#a6a0a0");
        }   
        else {
            setColorBar("black");
            setColorIcon("black");
            setColorBackground("black");
        }
    }, [gameInformation.results.userResult]);


    //
    // Handlers
    //
    // When the "Copy" icon is clicked, "props.gameInformation.moves.string" is copied to the users clipboard
    const handleCopyPGNButtonClick = (e) => {
        e.stopPropagation();    // If there is an event listener when the entire component is clicked. This line stops that
        copyToClipboard(gameInformation.moves.string);
    };

    // When the "Copy" icon is clicked, "props.gameInformation.results.fen" is copied to the users clipboard
    const handleCopyFENButtonClick = (e) => {
        e.stopPropagation();    // If there is an event listener when the entire component is clicked. This line stops that
        copyToClipboard(gameInformation.results.fen);
    };

    // For debugging purposes. When the component is clicked, the ParsedMatchObject is printed to terminal
    const handleComponentClick = () => {
        console.log(gameInformation);
    };


    //
    // Helpers
    //
    // When the "Copy" button is clicked on the last two rows, handlers will call this method to copy to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };



    return (
        <>
            {gameInformation && (
                <SingleMatchComp colorBackground={colorBackground} onClick={handleComponentClick}>

                    {/* Win / Loss bar */}
                    <ResultBar colorBar={colorBar}></ResultBar>

                    {/* Line - Match ID */}
                    <Title>
                        <h2>
                            <a
                                href={`${gameInformation.general.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <p>Site: {gameInformation.general.site} || ID: {gameInformation.general.id}</p>
                            </a>
                        </h2>
                    </Title>

                    {/* Chessboard Display. "Board" is a seperate component in a different file */}
                    <BoardContainer>
                        <Board fen={gameInformation.results.fen} />
                    </BoardContainer>

                    {/* Line - General Match Info */}
                    <Icon icon={gameInformation.time.class} color={colorIcon} size={18} ></Icon>
                    <Row>
                        <p>
                            {gameInformation.time.minutes}+{gameInformation.time.increment}
                            &nbsp; &middot; &nbsp;
                            {gameInformation.general.rated}
                            &nbsp; &middot; &nbsp;
                            {gameInformation.general.event}
                        </p>
                    </Row>

                    {/* Line - Date Played */}
                    <Icon icon={"calendar"} color={colorIcon} size={18} ></Icon>
                    <Row>
                        <p>{gameInformation.general.date}</p>
                    </Row>

                    {/* Line - White Details */}
                    <Icon icon={"whitePawn"} color={"White"} size={18} ></Icon>
                    <Row>
                        <p>{gameInformation.white.username}</p>
                        &nbsp;
                        <strong><p>({gameInformation.white.elo})</p></strong>
                    </Row>

                    {/* Line - Black Details */}
                    <Icon icon={"blackPawn"} color={"Black"} size={18} ></Icon>
                    <Row>
                        <p>{gameInformation.black.username}</p>
                        &nbsp;
                        <strong><p>({gameInformation.black.elo})</p></strong>
                    </Row>

                    {/* Line - Result */}
                    <Icon icon={gameInformation.results.terminationWord} color={colorIcon} size={18} ></Icon>
                    <Row>
                        <p>{gameInformation.results.terminationFull}</p>
                    </Row>

                    {/* Line - ECO opening and link */}
                    <Icon icon={"book"} color={colorIcon} size={18} ></Icon>
                    <Row>
                        <p>{gameInformation.openingData.ECO} - {gameInformation.openingData.NAME}</p>
                    </Row>

                    {/* Line - String of Moves */}
                    <CopyButton onClick={handleCopyPGNButtonClick}>
                            <Icon icon={"copy"} color={colorIcon} size={18}></Icon>
                    </CopyButton>
                    <Row>
                        <p>{gameInformation.moves.string}</p>
                    </Row>

                    {/* Line - FEN */}
                    <CopyButton onClick={handleCopyFENButtonClick}>
                            <Icon icon={"copy"} color={colorIcon} size={18}></Icon>
                    </CopyButton>
                    <Row>
                        <p>{gameInformation.results.fen}</p>
                    </Row>

                </SingleMatchComp>
            )}
        </>
    );
}

export default SingleMatchMobile;
