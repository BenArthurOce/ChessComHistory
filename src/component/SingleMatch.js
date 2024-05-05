import React, { useState } from "react";
import styled from "styled-components";

import Board from "../board/Board";
import SingleMatchIcon from "./SingleMatchIcon";


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
    // width: 50%;
    // min-width: 700px;
    border: 1px solid #ccc;
    padding: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    min-width: 500px;
    min-height: 300px;

    background-color: ${(props) => {
        switch (props.result) {
            case "win":
                return "green";
            case "lose":
                return "red";
            case "draw":
                return "grey";
            default:
                return "white";
        }
    }};
`
;

const ResultBar = styled.span
`
    grid-column: 1;
    grid-row: 1;

    grid-row-start: 1;
    grid-row-end: 9;

    border-radius: 100px;
    background-color: gray;

    background-color: ${(props) => {
        switch (props.result) {
            case "win":
                return "teal";
            case "lose":
                return "pink";
            case "draw":
                return "lightgrey";
            default:
                return "white";
        }
    }};
`
;

const MatchInfoUrl = styled.span
`
    grid-column: 2;
    grid-row: 1;
`
;

const BoardSpan = styled.span
`

    grid-row: span 9;
    aspect-ratio: 1;
    border: 10px solid black;
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

function SingleMatch(props) {
    const { gameInformation } = props;

    const [moveString, setMoveString] = useState("");

    const [copied, setCopied] = useState(false);


    const isRatedString = () => {
        return gameInformation.isRated ? "Rated" : "Casual";
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1500);
    };

    // const CopyButton = () => (
    //     <button
    //         onClick={() => copyToClipboard(gameInformation.moves)}
    //         style={{ background: "none", border: "none", cursor: "pointer" }}
    //     >
    //         <FontAwesomeIcon icon={faFlag} className="icon" />
    //     </button>
    // );

    return (
        <Container>

            {gameInformation && (
                <SingleMatchComp result={gameInformation.results.playerResult}>

                    {/* Win / Loss bar */}
                    <ResultBar result={gameInformation.results.playerResult}></ResultBar>


                    {/* Line - Match ID */}
                    <MatchInfoUrl>
                        <h3 className="game-id">
                            <a
                                href={`${gameInformation.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Site: {gameInformation.site} || ID:{" "}
                                {gameInformation.id}
                            </a>
                        </h3>
                    </MatchInfoUrl>


                    {/* Chessboard Display */}
                    <BoardSpan>
                        <Board position={gameInformation.position} />
                    </BoardSpan>


                    {/* Line - General Match Info */}
                    <MatchInfoGeneral>
                        <SingleMatchIcon icon={gameInformation.timeClass}></SingleMatchIcon>
                        <p>
                            {Math.floor(gameInformation.timeControl / 60)} min
                            &nbsp; &middot; &nbsp;
                            {isRatedString(gameInformation.isRated)}
                            &nbsp; &middot; &nbsp;
                            {gameInformation.event}
                        </p>
                    </MatchInfoGeneral>


                    {/* Line - White Details */}
                    <MatchInfoWhite>
                    <SingleMatchIcon icon={"whitePawn"}></SingleMatchIcon>
                        <p>{gameInformation.white.username}</p>
                        <strong> <p>({gameInformation.white.elo})</p> </strong>
                    </MatchInfoWhite>


                    {/* Line - Black Details */}
                    <MatchInfoBlack>
                        <SingleMatchIcon icon={"blackPawn"}></SingleMatchIcon>
                        <p>{gameInformation.black.username}</p>
                        <strong>
                            <p>({gameInformation.black.elo})</p>
                        </strong>
                    </MatchInfoBlack>


                    {/* Line - Winner */}
                    <MatchInfoResult>
                        <SingleMatchIcon icon={gameInformation.results.keyword}></SingleMatchIcon>
                        <p>{gameInformation.results.result}</p>
                    </MatchInfoResult>


                    {/* Line - ECO opening and link */}
                    <MatchInfoOpening>
                        <SingleMatchIcon icon={"book"}></SingleMatchIcon>
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
                        <SingleMatchIcon icon={"copy"}></SingleMatchIcon>
                        {/* <CopyButton></CopyButton> */}
                        <p>{gameInformation.moves}</p>
                    </MatchInfoMoves>

                </SingleMatchComp>
            )}
        </Container>
    );
}

export default SingleMatch;
