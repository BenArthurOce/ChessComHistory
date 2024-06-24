import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchForm from './SearchForm';
import PlayerHistorySummary from './PlayerHistorySummary';
import PlayerInformation from './PlayerInformation';
import SingleMatch from './SingleMatch';
import UniqueMoves from './UniqueMoves';

function ChessApp() {
    // const [playerUsername, setplayerUsername] = useState('');
    // const [gamesNumber, setGamesNumber] = useState(0);

    const [formData, setFormData] = useState(null);


    const [waitingFlag, setWaitingFlag] = useState(false);
    const [playerData, setPlayerData] = useState(null);
    const [error, setError] = useState(null);
    const [matchesToDisplay, setMatchesToDisplay] = useState(10);

    const mountedRef = useRef(true);    // Does not trigger a re-render



    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false; // Cleanup function to set mountedRef to false when component unmounts
        };
    }, []);



    const triggerFormSubmitted = (newFormData) => {
        console.log("triggerFormSubmitted");
        setFormData(newFormData);
        fetchPlayerData(newFormData);
    }

  


    const fetchPlayerData = useCallback(async (formData) => {
        setError(null);
        setWaitingFlag(true);

        try {
            const response = await fetch(`https://api.chess.com/pub/player/${formData.username}`, {
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

            if (!mountedRef.current) return;

            const playerObject = {
                  avatar:       data.avatar
                , id:           data.player_id
                , name:         data.name
                , country:      data.country
                , dateJoined:   data.joined
                , dateOnline:   data.last_online
                , matchHistory: await fetchMatchHistory(formData)
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
    }, []);


    const fetchMatchHistory = useCallback(async (formData) => {

        let dataMatchHistories = []
        const numberRequiredGames = formData.lastNGames
        let index = -1


        const dataSources = [
            `https://api.chess.com/pub/player/${formData.username}/games/2024/06`,
            `https://api.chess.com/pub/player/${formData.username}/games/2024/05`,
            `https://api.chess.com/pub/player/${formData.username}/games/2024/04`,
            `https://api.chess.com/pub/player/${formData.username}/games/2024/03`,
            `https://api.chess.com/pub/player/${formData.username}/games/2024/02`,
            `https://api.chess.com/pub/player/${formData.username}/games/2024/01`,
            `https://api.chess.com/pub/player/${formData.username}/games/2023/12`,
            `https://api.chess.com/pub/player/${formData.username}/games/2023/11`
        ];


        while (dataMatchHistories.length < numberRequiredGames) {
            index += 1
            let endpoint = dataSources[index]
            const response = await fetch(`${endpoint}`);
            const data = await response.json();
            dataMatchHistories = dataMatchHistories.concat(data.games);
        }

        // Adjust match history by flipping, and extracting last x games
        const reversedGames = dataMatchHistories.reverse()
        const matchHistory = reversedGames.slice(0, formData.lastNGames)

        // Parse the "match.pgn" string into different information, and then create the
        const matchObjects = await Promise.all(matchHistory.map(async (match) => {
            const parsedData = parsePGNString(match.pgn);
            return createMatchObject(match, parsedData, formData.username);
        }));

        return matchObjects;
    }, []);


    const parsePGNString = useCallback((playerUsername) => {
        const regex = /\[([\w\s]+)\s"([^"]+)"\]/g;
        let match;
        const parsedData = {};
        let remainingData = playerUsername;

        while ((match = regex.exec(playerUsername)) !== null) {
            parsedData[match[1]] = match[2];
            remainingData = remainingData.replace(match[0], '').trim();
        }

        parsedData.movestring = buildMoveString(remainingData);
        return parsedData;
    }, []);


    const buildMoveString = useCallback((input) => {
        return input.replace(/\{[^{}]*\}|\[[^\[\]]*\]/g, '')
                    .replace(/\d+\.{3}/g, ' ')
                    .replace(/\s+/g, ' ')
                    .replace(/\s+\./g, '.').replace(/\.\s+/g, '.')
                    .trim();
    }, []);


    const createMatchObject = (match, parsedData, username) => {
        const moveObject = createMoveObject(parsedData.movestring);
        const userPlayed = getUserPlayedColor(match, username);
        const winner = getMatchWinner(match);
        const playerResult = getPlayerResult(match, parsedData, username);

        return {

            // zzOriginal:         match
            // ,
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
            moves: {
                pgn:              parsedData.movestring
              , full:             moveObject
              , white:            getPlayerMoves(moveObject, "white")
              , black:            getPlayerMoves(moveObject, "black")
            }
            ,
            results: {
                white:            match.white.result === "win" ? "win" : match.white.result === "draw" ? "draw" : "lose"
              , black:            match.black.result === "win" ? "win" : match.black.result === "draw" ? "draw" : "lose"
              , fen:              parsedData.CurrentPosition
              , terminationFull:  parsedData.Termination
              , terminationWord:  parsedData.Termination.split(' ').pop()             
              , userPlayed:       userPlayed
              , userResult:       playerResult
              , winner:           winner
            }
            ,
            playerResults: {
                name:             username
              , userPlayed:       userPlayed
              , userResult:       playerResult
              , userMoves:        getPlayerMoves(moveObject, userPlayed)
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


    const createMoveObject = useCallback((notation) => {
        const MOVE_REGEX = /\s*(\d{1,3})\.?\s*((?:(?:O-O(?:-O)?)|(?:[KQNBR][1-8a-h]?x?[a-h]x?[1-8])|(?:[a-h]x?[a-h]?[1-8]\=?[QRNB]?))\+?)(?:\s*\d+\.?\d+?m?s)?\.?\s*((?:(?:O-O(?:-O)?)|(?:[KQNBR][1-8a-h]?x?[a-h]x?[1-8])|(?:[a-h]x?[a-h]?[1-8]\=?[QRNB]?))\+?)?(?:\s*\d+\.?\d+?m?s)?(?:#)?/g;
        let match;
        const allMoves = {};

        while ((match = MOVE_REGEX.exec(notation)) !== null) {
            const moveNumber = parseInt(match[1]);
            const whiteMove = match[2];
            const blackMove = match[3] || undefined;
            allMoves[moveNumber] = [whiteMove, blackMove];
        }
        return allMoves;
    }, []);


    const getUserPlayedColor = useCallback((match, username) => {
        if (match.white.username.toLowerCase() === username.toLowerCase()) return "white";
        if (match.black.username.toLowerCase() === username.toLowerCase()) return "black";
        return "";
    }, []);


    const getMatchWinner = useCallback((match) => {
        if (match.white.result.toLowerCase() === "win") return "white";
        if (match.black.result.toLowerCase() === "win") return "black";
        return "draw";
    }, []);


    const getPlayerResult = useCallback((match, parsedData, username) => {
        if (match.white.result === "win" && match.white.username.toLowerCase() === username.toLowerCase()) return "win";
        if (match.black.result === "win" && match.black.username.toLowerCase() === username.toLowerCase()) return "win";
        if (parsedData.Result === "1/2-1/2") return "draw";
        return "lose";
    }, []);


    const getPlayerMoves = useCallback((movesObject, player) => {
        const isWhite = player.toLowerCase() === 'white';
        return Object.values(movesObject).map(move => isWhite ? move[0] : move[1]).filter(Boolean);
    }, []);


    const extractOpeningName = useCallback((openingURL) => {
        const index = openingURL.indexOf("/openings/");
        return openingURL.substring(index + "/openings/".length).replace(/-/g, ' ');
    }, []);


    const extractGameId = useCallback((gameURL) => {
        const index = gameURL.indexOf("/live/");
        return parseInt(gameURL.substring(index + "/live/".length), 10);
    }, []);


    return (
        <div id="wrapper">
            <h1>Chess Match History</h1>

            <section id="form">
                <SearchForm onFormSubmit={triggerFormSubmitted} />
                {waitingFlag && <p>Loading player information...</p>}
                {error && <p>Error fetching data. Please try again.</p>}
                {/* {playerData && (
                    <div>
                        <h2>Player Information</h2>
                        <p>Player Username: {playerData.username}</p>
                    </div>
                )} */}
            </section>


            {/* <section id="playerInfo">
                {playerData && (
                    <PlayerInformation playerInformation={playerData} />
                )}
            </section> */}

            {/* Match History - Summary */}
            {!waitingFlag && formData && (
                <section id="player-history-summary">
                    {playerData && playerData.matchHistory && (
                        <div>
                            <PlayerHistorySummary matchHistory={playerData.matchHistory}></PlayerHistorySummary>
                        </div>
                    )}
                </section>
            )}


            {/* {!waitingFlag && formData && (
                <section id="matchHistory">
                    {playerData && playerData.matchHistory && (
                        <div>
                            {playerData.matchHistory.map((match, index) => (
                                index < matchesToDisplay && <SingleMatch key={index} gameInformation={match} />
                            ))}
                        </div>
                    )}
                </section>
            )} */}


            {/* Details of Unique Moves*/}
            {!waitingFlag && formData && (
                <section id="uniqueMoves">
                    {playerData && playerData.matchHistory && (
                        <div>
                            <UniqueMoves matchHistory={playerData.matchHistory}></UniqueMoves>
                        </div>
                    )}
                </section>
            )}






        </div>
    );
}

export default ChessApp;