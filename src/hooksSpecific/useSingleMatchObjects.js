import { useState, useEffect, useCallback } from "react";
import JsonFile from '../data/openings.json';
import JsonFileNew from '../data/openingsNew.json';
import Game from "../engine/Game";

// matchObjects = All the single match objects from the match history API
const useSingleMatchObjects = (matchObjects, pgnObjects, username, website) => {
    const [hookOutput, setHookOutput] = useState('')
    const [erroredGames, setErroredGames] = useState([]);
    const openingDictionary = JsonFile;
    const openingDictionaryNew = JsonFileNew;


    useEffect(() => {
        if (!matchObjects || matchObjects.length === 0) { return};
        if (!pgnObjects || pgnObjects.length === 0) { return};
        if (!username || username.length === 0) { return};
        if (!website || website.length === 0) { return};

        runHook();
    }, [matchObjects, pgnObjects, username, website]);


    async function runHook() {
        const results = [];
        const errors = [];
        const errorIndexes = [];
    
        await Promise.all(matchObjects.map(async (match, index) => {
            try {
                const matchObject = matchObjects[index];
                const pgnObject = pgnObjects[index];
                const parsedObject = await createSingleMatchObject(matchObject, pgnObject, username, website);
                results.push(parsedObject);
            } catch (err) {
                errors.push(err);
                errorIndexes.push(index)
            }
        }));
    
        console.log(results);
        console.log(errors);
        console.log(errorIndexes);

        setHookOutput(results);
        setErroredGames(errors);
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

        function getWinningPlayerColor() {
            try {
                if (parsedData.Result === "1/2-1/2") {return ""}
                if (parsedData.Result === "1-0") {return "white"}
                if (parsedData.Result === "0-1") {return "black"}
                return "[getWinningPlayerColor] NOT FOUND";
            }
            catch (err) {
                return "[getWinningPlayerColor] TRY/CATCH ERROR";
            };
        };

        function getWinningPlayerName() {
            try {
                const matchWinner = getWinningPlayerColor();

                if (parsedData.Result === "1/2-1/2") return "";
                if (matchWinner === "white") return parsedData.White;
                if (matchWinner === "black") return parsedData.Black;
                return "[getWinningPlayerName] ERROR NOT FOUND";
            }
            catch (err) {
                return "[getWinningPlayerName] TRY/CATCH ERROR";
            };
        };

        function getUserResult() {
            try {
                const userPlayed = getUserPlayedColor();
                const matchWinner = getWinningPlayerColor();

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
                if (website === "lichess") {

                    if (match.status === "Time forfeit") {return "abandoned"};

                    const wordSwitch = {
                          "resign": "resignation"
                        , "mate": "checkmate"
                        , "outoftime": "time"
                        , "timeout": "abandoned"
                        , "draw": ""
                        , "stalemate": "stalemate"
                        , "Abandoned": "abandoned"
                        , "noStart": "abandoned"
                    };
                    return wordSwitch[match.status]
                };
                return "[getTerminationWord] WEBSITE NOT FOUND";
            }
            catch (err) {
                return "[getTerminationWord] TRY/CATCH ERROR";
            };
        };

        function getTerminationFull() {
            const winnerGetPlayerName = getWinningPlayerName();
            const terminationWord = getTerminationWord();
            try {
                if (website === "chesscom") {return parsedData.Termination};
                if (website === "lichess") {

                    if (winnerGetPlayerName === "") {
                        return `Game drawn by ${terminationWord}`
                    } else {
                        return `${winnerGetPlayerName} won by ${terminationWord}`
                    };
                };
                return "[getTerminationFull] WEBSITE NOT FOUND";
            }
            catch (err) {
                return "[getTerminationFull] TRY/CATCH ERROR";
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

        function getTime() {
            try {

                if (website === "chesscom") {
                    const utcDate = parsedData["UTCDate"].replace(/\./g, "-"); // Convert YYYY.MM.DD to YYYY-MM-DD
                    const utcTime = parsedData["UTCTime"];  
                    
                    const utcDateTime = `${utcDate}T${utcTime}Z`; // 'Z' indicates UTC
                    
                    // Convert to local time in Melbourne, Australia and return only the time in 12-hour format with AM/PM
                    const convertedTime = new Date(utcDateTime).toLocaleString("en-AU", {
                        timeZone: "Australia/Melbourne",
                        hour12: true,  // Use 12-hour format with AM/PM
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                
                    return convertedTime;  // This will return the time in the format hh:mm:ss AM/PM
                }
                
                if (website === "lichess") {
                    const utcDate = parsedData["UTCDate"].replace(/\./g, "-"); // Convert YYYY.MM.DD to YYYY-MM-DD
                    const utcTime = parsedData["UTCTime"];  
                    
                    const utcDateTime = `${utcDate}T${utcTime}Z`; // 'Z' indicates UTC
                    
                    // Convert to local time in Melbourne, Australia and return only the time in 12-hour format with AM/PM
                    const convertedTime = new Date(utcDateTime).toLocaleString("en-AU", {
                        timeZone: "Australia/Melbourne",
                        hour12: true,  // Use 12-hour format with AM/PM
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                
                    return convertedTime;  // This will return the time in the format hh:mm:ss AM/PM
                }
            }
            catch (err) {
                return "[getTime] TRY/CATCH ERROR";
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
              "game_website":               getWebsite()
            , "game_url":                   getGameURL()
            , "game_id":                    getGameID()
            , "game_isRated":               getIsRated()
            , "game_type":                  "to be added (standard/ what variant?"
            , "game_time":                  getTime()
            , "game_date":                  parsedData["Date"]
            , "game_type":                  getGameType()

            , "move_string":                parsedData["MoveString"]
            , "move_object":                parsedData["MoveObject"]

            , "opening_eco":                parsedData["ECO"]
            , "opening_volume":             parsedData["ECO"].charAt(0)
            , "opening_name":               getOpeningName()
            , "opening_url":                parsedData["ECOUrl"]

            , "player_white_name":          parsedData["White"]
            , "player_white_elo":           parsedData["WhiteElo"]
            , "player_black_name":          parsedData["Black"]
            , "player_black_elo":           parsedData["BlackElo"]

            , "results_winnerColor":        getWinningPlayerColor()
            , "results_winnerName":         getWinningPlayerName()
            , "results_userPlayed":         getUserPlayedColor()
            , "results_userResult":         getUserResult()
            , "results_terminationWord":    getTerminationWord()
            , "results_terminationFull":    getTerminationFull()
            , "results_fen":                getEndingPosition()

            , "time_control":               parsedData["TimeControl"] 
            , "time_class":                 getTimeClassType()
        }
    };




    const createSingleMatchObject = (match, parsedData, username, website) => {


        function getEloDiff() {

            if (adaptedInformation['results_userPlayed'] == "white") {
                return adaptedInformation['player_white_elo'] - adaptedInformation['player_black_elo']
            };

            if (adaptedInformation['results_userPlayed'] == "black") {
                return adaptedInformation['player_black_elo'] - adaptedInformation['player_white_elo']
            };

            return 0;
        };


        function getPlayerMoves(movesObject, player) {
            const isWhite = player.toLowerCase() === 'white';
            return Object.values(movesObject).map(move => isWhite ? move[0] : move[1]).filter(Boolean);
        };
    
        function getStartingMove(move) {
            if (move === "e4") {return "1.e4"};
            if (move === "d4") {return "1.d4"};
            return "other";
        };

        // Helper function to convert time (e.g., "12:07 PM") to minutes after midnight
        function convertTimeToMinutes(timeString) {
            const [time, period] = timeString.split(" "); // Split into time and AM/PM period
            let [hours, minutes] = time.split(":").map(Number); // Split hours and minutes, convert to numbers
        
            // Correct handling of 12 AM (midnight) and 12 PM (noon)
            if (period === "am" && hours === 12) {
                hours = 0; // Midnight (12 AM) should be 0 hours
            } else if (period === "pm" && hours !== 12) {
                hours += 12; // Convert PM hours to 24-hour format, except 12 PM
            }
        
            const totalMinutes = hours * 60 + minutes; // Convert hours to minutes and add the minutes
            return totalMinutes; // Return the total number of minutes after midnight
        }
        


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
            };
        
            const emptyOpening = {
                'ID': null, 'ECO': null, 'VOLUME': null, 'NAME': null, "FULL": null, 'FEN': null, 'PGN': null, "NUMTURNS": null, 'NUMMOVES': null, 'NEXTTOMOVE': null, 'FAMILY': null, "VARIATION": null, "SUBVARIATION": null, "ECOFAMILY": null
            };
        
            return bestMatch ? openings[bestMatch] : emptyOpening;
        };


        const filterOpeningsByFEN = (searchItem, dictionary) => {
            // Filters dictionary based on matching FEN value
            return Object.values(dictionary).filter(({ FEN }) => FEN === searchItem);
        };


        
        const findOpeningMatchNew = (game, openings) => {
            // Ensure the input game string is valid
            if (!game || !openings || typeof game !== 'string') {
                console.error('Invalid input game or openings');
                return null;
            }
        
            // Initialize the array to store board positions
            const boardPositions = [];
            
            // Get the first 20 moves and split them
            const splitMoves = game.split(' ').slice(0, 20);
            let cumulativeString = splitMoves[0];
        
            // Generate the board positions after each move
            for (let i = 1; i < splitMoves.length; i++) {
                cumulativeString += " " + splitMoves[i];
                
                // Assuming `Game` is a valid constructor
                const newGame = new Game(cumulativeString);
                boardPositions.push(newGame.fen);
            }
                
            // Reverse the board positions to check from the latest to the earliest
            boardPositions.reverse();
        
            // Initialize the result variable
            let output = null;
        
            // Iterate through the board positions and try to match the FEN with the openings
            for (const boardPosition of boardPositions) {
                const dictionaryResult = filterOpeningsByFEN(boardPosition, openings);
                
                if (dictionaryResult.length > 0) {
                    output = dictionaryResult[0]; // Set the first match and stop
                    break;
                }
            }
        
            // Return the result
            return output;
        
        };
        
        
        
        // Match information from ChessCom / Lichess moved into a uniform state
        const adaptedInformation = adaptMatchInformation(match, parsedData, username, website)
    

        if (match.moves === "") {
            console.log(match)
            console.log(parsedData)
            console.log(adaptedInformation)
            throw new Error (`error moves empty string: match: ${match}  parsedData: ${parsedData}`)
        };

        if (adaptedInformation["move_object"][1] === undefined) {
            console.log(match)
            console.log(parsedData)
            console.log(adaptedInformation)
            throw new Error (`error move object undefined: match: ${match}  parsedData: ${parsedData}`)
        };


        const white_accuracy = match['accuracies'] && match['accuracies']['white'] ? match['accuracies']['white'] : '-';
        const black_accuracy = match['accuracies'] && match['accuracies']['white'] ? match['accuracies']['white'] : '-';


        // if(findOpeningMatchNew(parsedData.MoveString, openingDictionaryNew) == null ) {
        //     console.log("=======MOVESTRING WAS NOT RETURNED=======")
        //     console.log(parsedData)
        //     console.log(parsedData.MoveString)
        //     return null};


        return {
            aaaData : {
                  match:        match
                , parsed:       parsedData
                , adapted:      adaptedInformation
            }
            ,
            general : {
                  url:            adaptedInformation["game_url"]
                , site:           adaptedInformation["game_website"]
                , event:          adaptedInformation["game_type"]
                , rated:          adaptedInformation["game_isRated"] ? "Rated" : "Casual"
                , id:             adaptedInformation["game_id"]
                , time:           adaptedInformation["game_time"]
                , timeMinutes:    convertTimeToMinutes(adaptedInformation["game_time"]) 
                , date:           adaptedInformation["game_date"] 
            }
            ,
            moves: {
                  string:           adaptedInformation["move_string"]
                , object:           adaptedInformation["move_object"]
                , white:            getPlayerMoves(adaptedInformation["move_object"], "white")
                , black:            getPlayerMoves(adaptedInformation["move_object"], "black")
                , first:            getStartingMove(adaptedInformation["move_object"]["1"][0])
            }
            ,
            results: {
                  fen:              adaptedInformation["results_fen"]
                , terminationWord:  adaptedInformation["results_terminationWord"]
                , terminationFull:  adaptedInformation["results_terminationFull"]
                , userPlayed:       adaptedInformation["results_userPlayed"]
                , userResult:       adaptedInformation["results_userResult"]
                , winnerColor:      adaptedInformation["results_winnerColor"]
                , winnerName:       adaptedInformation["results_winnerName"]
            }
            ,
            playerResults: {
                  name:             username
                , userPlayed:       adaptedInformation["results_userPlayed"]
                , userResult:       adaptedInformation["results_userResult"]
                , userMoves:        getPlayerMoves(adaptedInformation["move_object"], adaptedInformation["results_userPlayed"])
                , eloDiff:          getEloDiff()
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
                , accuracy:     white_accuracy
            }
            ,
            black: {
                  username:     adaptedInformation["player_black_name"]
                , elo:          adaptedInformation["player_black_elo"]
                , accuracy:     black_accuracy
            }
            ,
            openingMatch: {
                  eco:          adaptedInformation["opening_eco"]
                , name:         adaptedInformation["opening_name"]
            }
            ,
            openingData:     findOpeningMatch(parsedData.MoveString, openingDictionary)
            ,
            openingDataNew:     findOpeningMatchNew(parsedData.MoveString, openingDictionaryNew)
        };
    };

    return hookOutput;
};




export default useSingleMatchObjects;