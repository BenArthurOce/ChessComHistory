import { useState, useEffect, useCallback } from "react";
import JsonFile from '../data/openings.json';


// matchObjects = All the single match objects from the match history API
const useSingleMatchObjects = (matchObjects, pgnObjects, username, website) => {
    const [hookOutput, setHookOutput] = useState('')
    const openingDictionary = JsonFile;


    useEffect(() => {
        if (!matchObjects || matchObjects.length === 0) { return};
        if (!pgnObjects || pgnObjects.length === 0) { return};
        if (!username || username.length === 0) { return};
        if (!website || website.length === 0) { return};

        runHook()
    }, [matchObjects, pgnObjects, username, website]);


    async function runHook() {
        try {
            const result = await Promise.all(matchObjects.map(async (match, index) => {
                const pgn = pgnObjects[index];
                return createSingleMatchObject(match, pgn, username, website);
            }));
            setHookOutput(result);
        } catch (err) {
            console.error("Error in runHook:", err);
        }
    };

    const adaptMatchInformation = (match, parsedData, username, website) => { 

        function getGameURL() {
            try {
                if (website === "chesscom") {return parsedData.Link};
                if (website === "lichess") {return parsedData.Site};
                return "[getGameURL] WEBSITE NOT FOUND";
            }
            catch (err) {
                return "[getGameURL] TRY/CATCH ERROR";
            };
        };

        // currently doesnt really work
        function getOpeningName() {
            try {
                if (website === "chesscom") {
                    const a = parsedData["ECOUrl"].split("/openings/")[1].replace(/-/g, ' ')
                    return a.split("...")[0]
                };
                if (website === "lichess") {return parsedData.Opening};
            }
            catch (err) {
                return ""; // chesscom might error on this. We'll leave it alone
            };
        };

        function getWebsite() {
            try {
                if (website === "chesscom") {return "ChessCom"};
                if (website === "lichess") {return "Lichess"};
                return "[getWebsite] WEBSITE NOT FOUND";
            }
            catch (err) {
                return "[getWebsite] TRY/CATCH ERROR";
            };
        };

        function getUserPlayedColor() {
            try {

                if (parsedData.White.toLowerCase() === username.toLowerCase()) return "white";
                if (parsedData.Black.toLowerCase() === username.toLowerCase()) return "black";
                return "[getUserPlayedColor] NOT FOUND";
            }
            catch (err) {
                return "[getUserPlayedColor] TRY/CATCH ERROR";
            };
        };

        function getMatchWinner() {
            try {
                if (parsedData.Result === "1/2-1/2") {return "draw"}
                if (parsedData.Result === "1-0") {return "white"}
                if (parsedData.Result === "0-1") {return "black"}
                return "[getMatchWinner] NOT FOUND";
            }
            catch (err) {
                return "[getMatchWinner] TRY/CATCH ERROR";
            };
        };

        function getUserResult() {
            try {
                const userPlayed = getUserPlayedColor();
                const matchWinner = getMatchWinner();

                if (parsedData.Result === "1/2-1/2") return "draw";
                if (userPlayed === matchWinner) return "win";
                if (userPlayed !== matchWinner) return "lose";
                return "[getUserResult] ERROR NOT FOUND";
            }
            catch (err) {
                return "[getUserResult] TRY/CATCH ERROR";
            };
        };

        function getEndingPosition() {
            try {
                if (website === "chesscom") {return parsedData.CurrentPosition};
                if (website === "lichess") {return match.lastFen};
                return "[getEndingPosition] WEBSITE NOT FOUND";
            }
            catch (err) {
                return "[getEndingPosition] TRY/CATCH ERROR";
            };
        };

        function getTimeClassType() {
            try {
                if (website === "chesscom") {return match.time_class};
                if (website === "lichess") {return match.perf};
                return "[getTimeClassType] WEBSITE NOT FOUND";
            }
            catch (err) {
                return "[getTimeClassType] TRY/CATCH ERROR";
            };
        };

        function getTerminationWord() {
            try {
                if (website === "chesscom") {return parsedData.Termination.split(' ').pop()};
                if (website === "lichess") {return match.status};
                return "[getTerminationWord] WEBSITE NOT FOUND";
            }
            catch (err) {
                return "[getTerminationWord] TRY/CATCH ERROR";
            };
        };

        function getGameID() {
            try {
                if (website === "chesscom") {
                    const index = parsedData.Link.indexOf("/live/");
                    return parseInt(parsedData.Link.substring(index + "/live/".length), 10);
                }
                if (website === "lichess") {return match.id};
                return "[getGameID] WEBSITE NOT FOUND";
            }
            catch (err) {
                return "[getGameID] TRY/CATCH ERROR";
            };
        };

        function getIsRated() {
            try {
                if (website === "chesscom") {return match.rated}
                if (website === "lichess") {return match.rated};
                return "[getIsRated] WEBSITE NOT FOUND";
            }
            catch (err) {
                return "[getIsRated] TRY/CATCH ERROR";
            };
        };

        function getGameType() {
            try {
                if (website === "chesscom") {return parsedData["Event"]}
                if (website === "lichess") {return match.variant.charAt(0).toUpperCase() + match.variant.slice(1);};
                return "[getGameType] WEBSITE NOT FOUND";
            }
            catch (err) {
                return "[getGameType] TRY/CATCH ERROR";
            };
        };

        return {

              "game_website":           getWebsite()
            , "game_url":               getGameURL()
            , "game_id":                getGameID()
            , "game_isRated":           getIsRated()
            , "game_type":              "to be added (standard/ what variant?"
            , "game_date":              parsedData["Date"]
            , "game_type":              getGameType()

            , "move_string":            parsedData["MoveString"]
            , "move_object":            parsedData["MoveObject"]

            , "opening_eco":            parsedData["ECO"]
            , "opening_name":           getOpeningName()

            , "player_white_name":      parsedData["White"]
            , "player_white_elo":       parsedData["WhiteElo"]
            , "player_black_name":      parsedData["Black"]
            , "player_black_elo":       parsedData["BlackElo"]

            , "results_winner":         getMatchWinner()
            , "results_userPlayed":     getUserPlayedColor()
            , "results_userResult":     getUserResult()
            , "results_termination":    getTerminationWord()
            , "results_fen":            getEndingPosition()

            , "time_control":           parsedData["TimeControl"] 
            , "time_class":             getTimeClassType()
        }

    };


    const createSingleMatchObject = (match, parsedData, username, website) => {

        function getPlayerMoves(movesObject, player) {
            const isWhite = player.toLowerCase() === 'white';
            return Object.values(movesObject).map(move => isWhite ? move[0] : move[1]).filter(Boolean);
        };
    
        function getStartingMove(move) {
            if (move === "e4") {return "1.e4"};
            if (move === "d4") {return "1.d4"};
            return "other";
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


        // Match information from ChessCom / Lichess moved into a uniform state
        const adaptedInformation = adaptMatchInformation(match, parsedData, username, website)
    
        return {

            // zzOriginal:         match
            // ,
            general : {
                  url:            adaptedInformation["game_url"]
                , site:           adaptedInformation["game_website"]
                , event:          adaptedInformation["game_type"]
                , rated:          adaptedInformation["game_isRated"] ? "Rated" : "Casual"
                , id:             adaptedInformation["game_id"]
                , date:           adaptedInformation["game_date"] 
            }
            ,
            moves: {
                  string:           adaptedInformation["move_string"]
                , object:           adaptedInformation["move_object"]
                , white:            getPlayerMoves(adaptedInformation["move_object"], "white")
                , black:            getPlayerMoves(adaptedInformation["move_object"], "black")
                , first:            getStartingMove(adaptedInformation["move_object"]["1"][0]) //getStartingMove( getPlayerMoves(parsedData, "white") )
            }
            ,
            results: {
                  fen:              adaptedInformation["results_fen"]
                , terminationFull:  ""
                , terminationWord:  adaptedInformation["results_termination"]           
                , userPlayed:       adaptedInformation["results_userPlayed"]
                , userResult:       adaptedInformation["results_userResult"]
                , winner:           adaptedInformation["results_winner"]
            }
            ,
            playerResults: {
                  name:             username
                , userPlayed:       adaptedInformation["results_userPlayed"]
                , userResult:       adaptedInformation["results_userResult"]
                , userMoves:        getPlayerMoves(adaptedInformation["move_object"], adaptedInformation["results_userPlayed"])
            }
            ,
            time: {
                  class:            adaptedInformation["time_class"]
                , control:          adaptedInformation["time_control"].split('+')[0] 
                , base:             adaptedInformation["time_control"].split('+')[0] 
                , increment:        adaptedInformation["time_control"].split('+')[1] || 0 
                , bonus:            "" // not in use
                , start:            "" // not in use
                , end:              "" // not in use
                , minutes:          (adaptedInformation["time_control"].split('+')[0] ) / 60
            }
            ,
            white: {
                  username:     adaptedInformation["player_white_name"]
                , elo:          adaptedInformation["player_white_elo"]
            }
            ,
            black: {
                  username:     adaptedInformation["player_black_name"]
                , elo:          adaptedInformation["player_black_elo"]
            }
            ,
            openingMatch: {
                  eco:          adaptedInformation["opening_eco"]
                , name:         adaptedInformation["opening_name"]
            }
            ,
            openingData:     findOpeningMatch(parsedData.MoveString, openingDictionary)
        };
    };

    return hookOutput;
};




export default useSingleMatchObjects;
