import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Board from "../../board/Board";
import SingleIcon from "../SingleIcon";


// Styled components
const Container = styled.div
`
    //   &.win {
    //     background-color: lightgreen;
    //   }
    //   &.loss {
    //     background-color: lightcoral;
    //   }
    //   &.draw {
    //     background-color: lightgray;
    //   }
`
;

const SingleMatchComp = styled.div
`
    display: grid;
    grid-template-columns: 2% 57% 1fr;
    grid-template-rows: repeat(8, 1fr);
    width: 50%;
    min-width: 700px;
    border: 1px solid #ccc;
    padding: 5px;
    padding-right: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    min-width: 500px;
    min-height: 300px;

    max-height: 30vh;

    background-color: ${(props) => props.colorBackground};


    @media (max-width: 768px) {
        width: 100%;
        min-width: unset;
        grid-template-columns: 2% 50% 1fr;
        padding: 5px;
        min-height: unset;
        max-height: 300px
    }

`
;

const ResultBar = styled.span
`
    grid-column: 1;
    grid-row: 1;

    grid-row-start: 1;
    grid-row-end: 10;

    border-radius: 100px;
    background-color: ${(props) => props.colorBar};

    
`
;

const MatchInfoUrl = styled.span
`
    grid-column: 2;
    grid-row: 1;
    padding-left: 10px;
`
;

const BoardSpan = styled.span
`
    // grid-row: span 10;

    display: inline-block;

    align-items: center;
    justify-content: center;

    grid-column-start: 3;
    grid-column-end: 3;

    grid-row-start: 1;
    grid-row-end: 10;


    @media (max-width: 768px) {
        border: 1px solid black;
    }
`
;

const MatchInfoGeneral = styled.span
`
    grid-column: 2;
    grid-row: 2;

    display: flex;
    align-items: center;
    padding-left: 10px;
`
;

const MatchInfoWhite = styled.span
`
    grid-column: 2;
    grid-row: 4;

    display: flex;
    align-items: center;
    padding-left: 10px;
`
;

const MatchInfoBlack = styled.span
`
    grid-column: 2;
    grid-row: 5;

    display: flex;
    align-items: center;
    padding-left: 10px;
`
;

const MatchInfoResult = styled.span
`
    grid-column: 2;
    grid-row: 6;

    display: flex;
    align-items: center;
    padding-left: 10px;
`
;

const MatchInfoOpening = styled.span
`
    grid-column: 2;
    grid-row: 8;

    display: block ruby;
    // align-items: center;
    padding-left: 10px;
`
;

const MatchInfoMoves = styled.span
`
    grid-column: 2;
    grid-row: 9;

    display: flex;
    align-items: center;
    padding-left: 10px;

    display: flex;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: inherit;
`
;

const CopyButtonStyled = styled.button
`
    background: none;
    border: none;
    cursor: pointer;
    width: 50px;
    height: 50px;
`
;


const SingleMatchPC = (props) => {
    const { gameInformation } = props;

    const [copied, setCopied] = useState(false);

    const [colorBar, setColorBar] = useState("");

    const [colorIcon, setColorIcon] = useState("");

    const [colorBackground, setColorBackground] = useState("");


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


    // When the "Copy" button is clicked on the last two rows, handlers will call this method to copy to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

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
        console.log(props.gameInformation);
    };

    return (
        <>
            {gameInformation && (
                <SingleMatchComp colorBackground={colorBackground} onClick={handleComponentClick}>

                    {/* Win / Loss bar */}
                    <ResultBar colorBar={colorBar}></ResultBar>

                    {/* Line - Match ID */}
                    <Title>
                        <h3>
                            <a
                                href={`${gameInformation.general.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <p>Site: {gameInformation.general.site} || ID: {gameInformation.general.id}</p>
                            </a>
                        </h3>
                    </Title>

                    {/* Chessboard Display. "Board" is a seperate component in a different file */}
                    <BoardContainer>
                        <Board position={gameInformation.results.fen} />
                    </BoardContainer>

                    {/* Line - General Match Info */}
                    <Icon icon={gameInformation.time.class} color={colorIcon} size={13} ></Icon>
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
                    <Icon icon={"calendar"} color={colorIcon} size={13} ></Icon>
                    <Row>
                        <p>{gameInformation.general.date}</p>
                    </Row>

                    {/* Line - White Details */}
                    <Icon icon={"whitePawn"} color={"White"} size={13} ></Icon>
                    <Row>
                        <p>{gameInformation.white.username}</p>
                        &nbsp;
                        <strong><p>({gameInformation.white.elo})</p></strong>
                    </Row>

                    {/* Line - Black Details */}
                    <Icon icon={"blackPawn"} color={"Black"} size={13} ></Icon>
                    <Row>
                        <p>{gameInformation.black.username}</p>
                        &nbsp;
                        <strong><p>({gameInformation.black.elo})</p></strong>
                    </Row>

                    {/* Line - Result */}
                    <Icon icon={gameInformation.results.terminationWord} color={colorIcon} size={13} ></Icon>
                    <Row>
                        <p>{gameInformation.results.terminationFull}</p>
                    </Row>

                    {/* Line - ECO opening and link */}
                    <Icon icon={"book"} color={colorIcon} size={13} ></Icon>
                    <Row>
                        <a href={gameInformation.opening.url}  target="_blank"  rel="noopener noreferrer">
                          <p>{gameInformation.opening.eco} - {gameInformation.opening.name}</p>
                        </a>
                    </Row>

                    {/* Line - String of Moves */}
                    <CopyButton onClick={handleCopyPGNButtonClick}>
                            <Icon icon={"copy"} color={colorIcon} size={13}></Icon>
                    </CopyButton>
                    <Row>
                        <p>{gameInformation.moves.string}</p>
                    </Row>

                    {/* Line - FEN */}
                    <CopyButton onClick={handleCopyFENButtonClick}>
                            <Icon icon={"copy"} color={colorIcon} size={13}></Icon>
                    </CopyButton>
                    <Row>
                        <p>{gameInformation.results.fen}</p>
                    </Row>

                </SingleMatchComp>
            )}
        </>
    );
}

export default SingleMatchPC;
