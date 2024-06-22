import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import PlayerInformation from './PlayerInformation';
import SingleMatch from './SingleMatch';

import UniqueMoves from './UniqueMoves';

function ChessApp() {
    const [inputString, setInputString] = useState('');
    const [waitingFlag, setWaitingFlag] = useState(false);
    const [playerData, setPlayerData] = useState(null);
    const [error, setError] = useState(null);
    const [matchCount, setMatchCount] = useState(0);
    const [matchesToDisplay, setMatchesToDisplay] = useState(10);

    useEffect(() => {
        if (inputString) {
            fetchPlayerData(inputString);
        }
    }, [inputString]);

    const fetchPlayerData = async (username) => {
        setError(null);
        setWaitingFlag(true);

        try {
            const response = await fetch(`https://api.chess.com/pub/player/${username}`, {
                headers: {
                    Accept: 'application/ld+json',
                },
            });
            const data = await response.json();

            if (!data.player_id) {
                setError(true);
                setWaitingFlag(false);
                return;
            }

            const playerObject = {
                  avatar:       data.avatar
                , id:           data.player_id
                , name:         data.name
                , country:      data.country
                , dateJoined:   data.joined
                , dateOnline:   data.last_online
                , matchHistory: await fetchMatchHistory(username)
                , url:          data.url
                , username:     data.username
            };

            setPlayerData(playerObject);
            setWaitingFlag(false);
        } catch (error) {
            setError(true);
            setWaitingFlag(false);
            console.error('Error fetching player information:', error);
        }
    };

    const fetchMatchHistory = async (username) => {
        try {
            const response = await fetch(`https://api.chess.com/pub/player/${username}/games/2024/06`);
            const data = await response.json();
            setMatchCount(data.games.length);

            const matchObjects = await Promise.all(data.games.map(async (match) => {
                const parsedData = parsePGNString(match.pgn);
                return createMatchObject(match, parsedData, username);
            }));

            return matchObjects;
        } catch (error) {
            setError(true);
            setWaitingFlag(false);
            console.error('Error fetching match history:', error);
            return [];
        }
    };

    const parsePGNString = (inputString) => {
        const regex = /\[([\w\s]+)\s"([^"]+)"\]/g;
        let match;
        const parsedData = {};
        let remainingData = inputString;

        while ((match = regex.exec(inputString)) !== null) {
            parsedData[match[1]] = match[2];
            remainingData = remainingData.replace(match[0], '').trim();
        }

        parsedData.moves = buildMoveString(remainingData);
        return parsedData;
    };

    const buildMoveString = (input) => {
        return input.replace(/\{[^{}]*\}|\[[^\[\]]*\]/g, '')
                    .replace(/\d+\.{3}/g, ' ')
                    .replace(/\s+/g, ' ')
                    .replace(/\s+\./g, '.').replace(/\.\s+/g, '.')
                    .trim();
    };

    const createMatchObject = (match, parsedData, username) => {
        const moveObject = createMoveObject(parsedData.moves);
        const userPlayed = getUserPlayedColor(match, username);
        const winner = getMatchWinner(match);
        const playerResult = getPlayerResult(match, parsedData, username);

        return {
            general : {
                url:            match.url
              , site:           parsedData.Site
              , event:          parsedData.Event
              , rules:          match.rules
              , isRated:        match.rated
              , id:             extractGameId(parsedData.Link)
              , date:           parsedData.Date
              , link:           parsedData.Link
              , userPlayed:     userPlayed
            }
            ,
            allMoves: {
                pgn:              parsedData.moves
              , full:             moveObject
              , white:            getPlayerMoves(moveObject, "white")
              , black:            getPlayerMoves(moveObject, "black")
            }
            ,
            results: {
                white:            match.white.result
              , black:            match.black.result
              , userPlayed:       userPlayed
              , result:           parsedData.Termination
              , keyword:          parsedData.Termination.split(' ').pop()
              , playerResult:     playerResult
              , fen:              parsedData.CurrentPosition
            }
            ,
            playerResults: {
                name:             username
              , team:             userPlayed
              , outcome:          playerResult
            }
            ,
            time: {
                class:          match.time_class
              , control:        match.time_control
              , base:           match.time_control.split('+')[0]
              , increment:      match.time_control.split('+')[1] || ""
              , bonus:          "not in use"
              , start:          match.start_time
              , end:            match.end_time
            }
            ,
            white: {
                username:     match.white.username
              , elo:          match.white.rating
              , url:          match.white['@id']
            }
            ,
            black: {
                username:     match.black.username
              , elo:          match.black.rating
              , url:          match.black['@id']
            }
            ,
            opening: {
                eco:          parsedData.ECO
              , url:          parsedData.ECOUrl
              , name:         extractOpeningName(parsedData.ECOUrl)
            }
        };
    };

    const getUserPlayedColor = (match, username) => {
        if (match.white.username.toLowerCase() === username.toLowerCase()) return "white";
        if (match.black.username.toLowerCase() === username.toLowerCase()) return "black";
        return "";
    };

    const getMatchWinner = (match) => {
        if (match.white.result.toLowerCase() === "win") return "white";
        if (match.black.result.toLowerCase() === "win") return "black";
        return "draw";
    };

    const getPlayerResult = (match, parsedData, username) => {
        if (match.white.result === "win" && match.white.username.toLowerCase() === username.toLowerCase()) return "win";
        if (match.black.result === "win" && match.black.username.toLowerCase() === username.toLowerCase()) return "win";
        if (parsedData.Result === "1/2-1/2") return "draw";
        return "lose";
    };

    const createMoveObject = (notation) => {
        const MOVE_REGEX = /\s*(\d{1,3})\.?\s*((?:(?:O-O(?:-O)?)|(?:[KQNBR][1-8a-h]?x?[a-h]x?[1-8])|(?:[a-h]x?[a-h]?[1-8]\=?[QRNB]?))\+?)(?:\s*\d+\.?\d+?m?s)?\.?\s*((?:(?:O-O(?:-O)?)|(?:[KQNBR][1-8a-h]?x?[a-h]x?[1-8])|(?:[a-h]x?[a-h]?[1-8]\=?[QRNB]?))\+?)?(?:\s*\d+\.?\d+?m?s)?(?:#)?/g;
        let match;
        const moves = {};

        while ((match = MOVE_REGEX.exec(notation)) !== null) {
            const moveNumber = parseInt(match[1]);
            const whiteMove = match[2];
            const blackMove = match[3] || undefined;
            moves[moveNumber] = [whiteMove, blackMove];
        }

        return moves;
    };

    const getPlayerMoves = (movesObject, player) => {
        const isWhite = player.toLowerCase() === 'white';
        return Object.values(movesObject).map(move => isWhite ? move[0] : move[1]).filter(Boolean);
    };

    const extractOpeningName = (openingURL) => {
        const index = openingURL.indexOf("/openings/");
        return openingURL.substring(index + "/openings/".length).replace(/-/g, ' ');
    };

    const extractGameId = (gameURL) => {
        const index = gameURL.indexOf("/live/");
        return parseInt(gameURL.substring(index + "/live/".length), 10);
    };

    return (
        <div id="wrapper">
            <h1>Chess Match History</h1>

            <section id="form">
                <SearchForm onFormSubmit={setInputString} />
                {waitingFlag && <p>Loading player information...</p>}
                {error && <p>Error fetching data. Please try again.</p>}
                {playerData && (
                    <div>
                        <h2>Player Information</h2>
                        <p>Player Username: {playerData.username}</p>
                        <p>{matchCount} matches found</p>
                    </div>
                )}
            </section>

            <section id="uniqueMoves">
                {playerData && playerData.matchHistory && (
                    <div>
                        <UniqueMoves matchHistory={playerData.matchHistory}></UniqueMoves>
                    </div>
                )}
            </section>

            {/* <section id="playerInfo">
                {playerData && (
                    <PlayerInformation playerInformation={playerData} />
                )}
            </section>

            <section id="matchHistory">
                {playerData && playerData.matchHistory && (
                    <div>
                        {playerData.matchHistory.map((match, index) => (
                            index < matchesToDisplay && <SingleMatch key={index} gameInformation={match} />
                        ))}
                    </div>
                )}
            </section> */}



        </div>
    );
}

export default ChessApp;