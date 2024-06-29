import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Board from "../../board/Board";
import SingleMatchIcon from "../SingleMatchIcon";


// Styled components
const SingleMatchComp = styled.div
`
    display: grid;
    grid-template-columns: 2% 5% 50% 1fr;
    width: 100%;

    border: 1px solid #ccc;
    padding: 5px;
    padding-right: 0;
    margin-top: 10px;
    margin-bottom: 10px;
    min-height: 200px;

    font-size: 10px;

    background-color: ${(props) => props.colorBackground};

`
;

const ResultBar = styled.span
`
    grid-column: 1;

    grid-row-start: 1;
    grid-row-end: 8;

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
    grid-row-end: 8;

    border: 1px solid black;

`
;

const CopyButtonStyled = styled.button
`
    grid-column: 2;
    background: none;
    border: none;
    cursor: pointer;
    width: 50px;
    height: 50px;
`
;

const Title = styled.span
`
    grid-column: 2 / span 2;
    display: flex;
    padding-left: 5px;
`
;

const Icon = styled(SingleMatchIcon)
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
`
;





function SingleMatchMobile(props) {
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
            <Icon icon={"dunno"} color={colorIcon} size={13} ></Icon>
        </CopyButtonStyled>
    );

    const handleClick = () => {
        console.log(props.gameInformation);
    };

    return (
        <>
            {gameInformation && (
                <SingleMatchComp colorBackground={colorBackground} onClick={handleClick}>

                    {/* Win / Loss bar */}
                    <ResultBar colorBar={colorBar}></ResultBar>

                    {/* Line - Match ID */}
                    <Title>
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
                    </Title>

                    {/* Chessboard Display */}
                    <BoardContainer>
                        <Board position={gameInformation.results.fen} />
                    </BoardContainer>

                    {/* Line - General Match Info */}
                    <Icon icon={gameInformation.time.class} color={colorIcon} size={13} ></Icon>
                    <Row>
                        
                        <p>
                            {timeValue(gameInformation.time.control)}
                            &nbsp; &middot; &nbsp;
                            {isRatedString(gameInformation.general.isRated)}
                            &nbsp; &middot; &nbsp;
                            {gameInformation.general.event}
                        </p>
                    </Row>

                    {/* Line - White Details */}
                    <Icon icon={"whitePawn"} color={colorIcon} size={13} ></Icon>
                    <Row>
                        <p>{gameInformation.white.username}</p>
                        &nbsp;
                        <strong>
                            <p>({gameInformation.white.elo})</p>
                        </strong>
                    </Row>

                    {/* Line - Black Details */}
                    <Icon icon={"blackPawn"} color={colorIcon} size={13} ></Icon>
                    <Row>
                        
                        <p>{gameInformation.black.username}</p>
                        &nbsp;
                        <strong>
                            <p>({gameInformation.black.elo})</p>
                        </strong>
                    </Row>

                    {/* Line - Winner */}
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

                    {/* Line - List of Moves */}
                    <Icon icon={"dunno"} color={colorIcon} size={13} ></Icon>
                    <Row>
                        {/* <CopyButton /> */}
                        {/* <p>{gameInformation.moves.pgn}</p> */}
                        <p>placeholder string goes in here</p>
                    </Row>

                </SingleMatchComp>
            )}
        </>
    );
}

export default SingleMatchMobile;
