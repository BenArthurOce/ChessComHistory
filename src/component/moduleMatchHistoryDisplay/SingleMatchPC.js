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


function SingleMatchPC(props) {
    const { gameInformation } = props;

    const [moveString, setMoveString] = useState("");

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


    const isRatedString = () => {
        return gameInformation.general.isRated ? "Rated" : "Casual";
    };


    function splitAndConvert(str) {
        return str.split('+').map(Number);
    };


    const timeValue = (timeString) => {
        const array = timeString.split('+').map(Number);
    
        const totalSeconds = array[0];
        const minutes = Math.floor(totalSeconds / 60);
        const extraSeconds = array[1] ? array[1] : 0;

        return `${minutes}+${extraSeconds}`
    };


    const copyToClipboard = (text) => {
        console.log(text);
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };


    const CopyButton = () => (
        <CopyButtonStyled onClick={() => copyToClipboard(gameInformation.moves)}>
            <SingleIcon icon={"book"} color={colorIcon}></SingleIcon>
        </CopyButtonStyled>
    );

    const handleClick = () => {
        console.log(props.gameInformation);
    };

    return (
        <Container>
            {gameInformation && (
                <SingleMatchComp colorBackground={colorBackground} onClick={handleClick}>
                    {/* Win / Loss bar */}
                    <ResultBar colorBar={colorBar}></ResultBar>

                    {/* Line - Match ID */}
                    <MatchInfoUrl>
                        <h3 className="game-id">
                            <a
                                href={`${gameInformation.general.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Site: {gameInformation.general.site} || ID:{" "}
                                {gameInformation.general.id}
                            </a>
                        </h3>
                    </MatchInfoUrl>

                    {/* Chessboard Display */}
                    <BoardSpan>
                        <Board position={gameInformation.results.fen} />
                    </BoardSpan>

                    {/* Line - General Match Info */}
                    <MatchInfoGeneral>
                        <SingleIcon icon={gameInformation.time.class} color={colorIcon}></SingleIcon>
                        <p>
                            {timeValue(gameInformation.time.control)}
                            &nbsp; &middot; &nbsp;
                            {isRatedString(gameInformation.general.isRated)}
                            &nbsp; &middot; &nbsp;
                            {gameInformation.general.event}
                        </p>
                    </MatchInfoGeneral>

                    {/* Line - White Details */}
                    <MatchInfoWhite>
                        <SingleIcon icon={"whitePawn"} color={colorIcon}></SingleIcon>
                        <p>{gameInformation.white.username}</p>
                        &nbsp;
                        <strong>
                            <p>({gameInformation.white.elo})</p>
                        </strong>
                    </MatchInfoWhite>

                    {/* Line - Black Details */}
                    <MatchInfoBlack>
                        <SingleIcon icon={"blackPawn"} color={colorIcon}></SingleIcon>
                        <p>{gameInformation.black.username}</p>
                        &nbsp;
                        <strong>
                            <p>({gameInformation.black.elo})</p>
                        </strong>
                    </MatchInfoBlack>

                    {/* Line - Winner */}
                    <MatchInfoResult>
                        <SingleIcon icon={gameInformation.results.terminationWord} color={colorIcon}></SingleIcon>
                        <p>{gameInformation.results.terminationFull}</p>
                    </MatchInfoResult>

                    {/* Line - ECO opening and link */}
                    <MatchInfoOpening>
                        <SingleIcon icon={"book"} color={colorIcon}></SingleIcon>
                        <a
                            href={gameInformation.opening.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <p>{gameInformation.opening.eco}</p>
                            &nbsp;
                            <p>{gameInformation.opening.name}</p>
                        </a>
                    </MatchInfoOpening>

                    {/* Line - List of Moves */}
                    <MatchInfoMoves>
                        <CopyButton />
                        <p>{gameInformation.moves.pgn}</p>
                    </MatchInfoMoves>
                </SingleMatchComp>
            )}
        </Container>
    );
}

export default SingleMatchPC;
