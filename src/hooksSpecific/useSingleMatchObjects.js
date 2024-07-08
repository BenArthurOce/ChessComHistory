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


    // Needs improvement. Use promise all
    async function runHook() {
        
        // matchObjects = array with 748 objects with many key/value arrays
        // pgnObjects = a different array with 748 objects with many key/value arrays
        const result = []
        let index = -1

        matchObjects.forEach(entry => {
            index += 1

            const match = matchObjects[index]
            const pgn = pgnObjects[index]


            const object = createSingleMatchObject(match, pgn, username, website)
            result.push(object)


        });
        setHookOutput(result)


        // Code to use:
        // const matchObjects = await Promise.all(allGames.map(async (match) => {

        // const parsedData = createSingleMatchObject(match);
        //     return parsedData
        // }));

        // setHookOutput(matchObjects)

    };


    const createSingleMatchObject = (match, parsedData, username, website) => {

        /* 
            "match" is an object returned from the array of games fetched in the api. it includes "match.pgn" which is a single long string
            "parsedData" is match.pgn, but has now been parsed into an object with its own key/value pairs
        */
        
        function getUserPlayedColor(match, username) {
            if (website === "chesscom") {
                if (match.white.username.toLowerCase() === username.toLowerCase()) return "white";
                if (match.black.username.toLowerCase() === username.toLowerCase()) return "black";
            }
            if (website === "lichess") {
                if (match.players.white.user.name.toLowerCase() === username.toLowerCase()) return "white";
                if (match.players.black.user.name.toLowerCase() === username.toLowerCase()) return "black";               
            }
            return "";
        };
    
        function getMatchWinner(match) {
            if (website === "chesscom") {
                if (match.white.result.toLowerCase() === "win") return "white";
                if (match.black.result.toLowerCase() === "win") return "black";
                return "draw";
            }
            if (website === "lichess") {
                return match.winner
            }
            return "";
        };
    
        function getPlayerResult(match, parsedData, username) {
            if (website === "chesscom") {
                if (match.white.result === "win" && match.white.username.toLowerCase() === username.toLowerCase()) return "win";
                if (match.black.result === "win" && match.black.username.toLowerCase() === username.toLowerCase()) return "win";
                if (parsedData.Result === "1/2-1/2") return "draw";
                return "lose";
            }
            if (website === "lichess") {
                if (parsedData.Result === "1/2-1/2") {return "draw"}
                if (parsedData.Result === "1-0" && match.players.white.user.name === "BenArthurOCE") {return "win"}
                if (parsedData.Result === "0-1" && match.players.black.user.name === "BenArthurOCE") {return "lose"}
                return "lose"
            }
            return "";
        };
    
    
        function getPlayerMoves(movesObject, player) {
            const isWhite = player.toLowerCase() === 'white';
            return Object.values(movesObject.MoveObject).map(move => isWhite ? move[0] : move[1]).filter(Boolean);
        };
    
    
        function extractOpeningName(openingURL) {
            const index = openingURL.indexOf("/openings/");
            return openingURL.substring(index + "/openings/".length).replace(/-/g, ' ');
        };
    
    
        function extractGameId(gameURL) {
            if (website === "chesscom") {
                const index = gameURL.indexOf("/live/");
                return parseInt(gameURL.substring(index + "/live/".length), 10);
            }
            if (website === "lichess") {
                return ""
            }
        };
    
        function getStartingMove(whiteMoves) {
            if (whiteMoves[0] === "e4") {return "1.e4"};
            if (whiteMoves[0] === "d4") {return "1.d4"};
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
    
        const userPlayed = getUserPlayedColor(match, username);
        const winner = getMatchWinner(match);
        const playerResult = getPlayerResult(match, parsedData, username);
    
        // console.log(match)
        // console.log(parsedData)
    
        if (website === "chesscom") {
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
                      full:             parsedData
                    , string:           parsedData.MoveString
                    , white:            getPlayerMoves(parsedData, "white")
                    , black:            getPlayerMoves(parsedData, "black")
                    , first:            getStartingMove( getPlayerMoves(parsedData, "white") )
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
                    , userMoves:        getPlayerMoves(parsedData, userPlayed)
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
                openingMatch: {
                      eco:          parsedData.ECO
                    , url:          parsedData.ECOUrl
                    , name:         extractOpeningName(parsedData.ECOUrl)
                }
                ,
                openingData:     findOpeningMatch(parsedData.MoveString, openingDictionary)
            };
        };

        if (website === "lichess") {
            return {
                // zzOriginal:         match
                // ,
                general : {
                      url:            parsedData.Site
                    , site:           "Lichess"
                    , event:          parsedData.Event
                    , rules:          match.variant
                    , rated:          match.rated ? "Rated" : "Casual"
                    , id:             match.id
                    , date:           parsedData.Date
                    , link:           parsedData.Site
                    , userPlayed:     userPlayed    
                }
                ,
                moves: {
                      full:             parsedData
                    , string:           parsedData.MoveString
                    , white:            getPlayerMoves(parsedData, "white")
                    , black:            getPlayerMoves(parsedData, "black")
                    , first:            getStartingMove( getPlayerMoves(parsedData, "white") )
                }
                ,
                results: {
                      white:            match.winner === "white" ? "win" : match.winner === "draw" ? "draw" : "lose"
                    , black:            match.winner === "black" ? "win" : match.winner === "draw" ? "draw" : "lose"
                    , fen:              match.lastFen
                    //   , terminationFull:  parsedData.Termination
                    //   , terminationWord:  parsedData.Termination    
                    , terminationWord:  match.status      
                    , userPlayed:       userPlayed
                    , userResult:       playerResult
                    , winner:           match.winner
                }
                ,
                playerResults: {
                      name:             username
                    , userPlayed:       userPlayed
                    , userResult:       playerResult
                    , userMoves:        getPlayerMoves(parsedData, userPlayed)
                }
                ,
                time: {
                      class:          match.perf
                    , control:        match.speed
                    , base:           match.clock.initial
                    , increment:      match.clock.increment
                    , bonus:          "not in use"
                    //   , start:          match.start_time
                    //   , end:            match.end_time
                    , minutes:        match.clock.initial / 60
                }
                ,
                white: {
                      username:     match.players.white.user.name
                    , elo:          match.players.white.rating
                //   , url:          match.white['@id']
                }
                ,
                black: {
                      username:     match.players.black.user.name
                    , elo:          match.players.black.rating
                //   , url:          match.black['@id']
                }
                ,
                openingMatch: {
                      eco:          match.opening.eco
                      //   , url:          parsedData.ECOUrl
                    , name:         match.opening.name

                }
                ,
                openingData:     findOpeningMatch(parsedData.MoveString, openingDictionary)
            }; 
        };
    };

    return hookOutput;
};

export default useSingleMatchObjects;
