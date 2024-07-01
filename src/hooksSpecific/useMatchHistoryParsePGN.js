// useMatchHistoryAPI.js

import { useState, useEffect } from 'react';
import JsonFile from '../data/openings.json';

const useMatchHistoryParsePGN = (array, username) => {
    const [parsedMatchObjects, setParsedMatchObjects] = useState([])
    const openingDictionary = JsonFile;

    useEffect(() => {
        if (array === null || array === undefined) {
            return;
        }
        getSingleMatches(array)
    }, [array]);


    async function getSingleMatches(allGames) {

        const matchObjects = await Promise.all(allGames.map(async (match) => {

        const parsedData = SingleMatchParsedData(match.pgn);
            return SingleMatchObject(match, parsedData, username);
        }));

        setParsedMatchObjects(matchObjects)
    };




// The data from a single game on ChessCom comes in two parts: The game data and the pgn.
// The pgn is a single string with needs to be parsed to get its key/value information
const SingleMatchParsedData = (unparsedGameString) => {

    const pgnParseGameRegx = /\[([\w\s]+)\s"([^"]+)"\]/g;
    const parsedGameData = {};
    let match;

    while ((match = pgnParseGameRegx.exec(unparsedGameString)) !== null) {
        parsedGameData[match[1]] = match[2];
    };


    function buildMoveString(input) {
        return input.replace(/\{[^{}]*\}|\[[^\[\]]*\]/g, '')
                    .replace(/\d+\.{3}/g, ' ')
                    .replace(/\s+/g, ' ')
                    .replace(/\s+\./g, '.').replace(/\.\s+/g, '.')
                    .trim();
    };

    
    function buildMoveObject(notation) {
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
    };


    parsedGameData.MoveString = buildMoveString(unparsedGameString.replace(pgnParseGameRegx, '').trim());
    parsedGameData.MoveObject = buildMoveObject(parsedGameData.MoveString);

    return parsedGameData;

};



const SingleMatchObject = (match, parsedData, username) => {

    /* 
        "match" is an object returned from the array of games fetched in the api. it includes "match.pgn" which is a single long string
        "parsedData" is match.pgn, but has now been parsed into an object with its own key/value pairs
    */

    function createMoveObject(notation) {
        // console.log(createMoveObject)
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
    };

    function getUserPlayedColor(match, username) {
        if (match.white.username.toLowerCase() === username.toLowerCase()) return "white";
        if (match.black.username.toLowerCase() === username.toLowerCase()) return "black";
        return "";
    };


    function getMatchWinner(match) {
        if (match.white.result.toLowerCase() === "win") return "white";
        if (match.black.result.toLowerCase() === "win") return "black";
        return "draw";
    };

    function getPlayerResult(match, parsedData, username) {
        if (match.white.result === "win" && match.white.username.toLowerCase() === username.toLowerCase()) return "win";
        if (match.black.result === "win" && match.black.username.toLowerCase() === username.toLowerCase()) return "win";
        if (parsedData.Result === "1/2-1/2") return "draw";
        return "lose";
    };


    function getPlayerMoves(movesObject, player) {
        const isWhite = player.toLowerCase() === 'white';
        return Object.values(movesObject).map(move => isWhite ? move[0] : move[1]).filter(Boolean);
    };


    function extractOpeningName(openingURL) {
        const index = openingURL.indexOf("/openings/");
        return openingURL.substring(index + "/openings/".length).replace(/-/g, ' ');
    };


    function extractGameId(gameURL) {
        const index = gameURL.indexOf("/live/");
        return parseInt(gameURL.substring(index + "/live/".length), 10);
    };



    const findOpeningMatch = (game, openings) => {
        const gameMoves = game.split(' ').slice(0, 15).join(' '); // Consider the first 15 moves
        let bestMatch = null;
        let bestMatchLength = 0;
    
        for (const opening in openings) {
            if (gameMoves.startsWith(opening)) {
                const openingLength = opening.split(' ').length;
                if (openingLength > bestMatchLength) {
                    bestMatch = opening;
                    bestMatchLength = openingLength;
                }
            }
        }
    
        return bestMatch ? openings[bestMatch] : null;
    };

    const moveObject = createMoveObject(parsedData['MoveString']);
    const userPlayed = getUserPlayedColor(match, username);
    const winner = getMatchWinner(match);
    const playerResult = getPlayerResult(match, parsedData, username);

    // console.log(moveObject)

    return {

        // zzOriginal:         match
        // ,
        general : {
            url:            match.url
          , site:           parsedData.Site
          , event:          parsedData.Event
          , rules:          match.rules
          , rated:          match.rated ? "Rated" : "Casual"
          , id:             extractGameId(parsedData.Link)
          , date:           parsedData.Date
          , link:           parsedData.Link
          , userPlayed:     userPlayed    
        }
        ,
        moves: {
            full:             moveObject
          , string:           parsedData.MoveString
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
          , increment:      match.time_control.split('+')[1] || 0
          , bonus:          "not in use"
          , start:          match.start_time
          , end:            match.end_time
          , minutes:        (match.time_control.split('+')[0]) / 60
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
        ,
        replaceopendict:     findOpeningMatch(parsedData.MoveString, openingDictionary)
    };


}

    return parsedMatchObjects;
};

export default useMatchHistoryParsePGN;
