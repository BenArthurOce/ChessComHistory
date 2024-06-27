import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import useFetchMultiple from "../hooks/useFetchMultiple";


import MatchHistorySummary from './MatchHistorySummary';
import PlayerInformation from './PlayerInformation';
import SingleMatch from './SingleMatch';
import UniqueMoves from './UniqueMoves';
import OpeningAnalysis from './OpeningAnalysis';



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




const SingleMatchObject2 = (match, username) => {

}


const SingleMatchObject = (match, parsedData, username) => {

    console.log(match)

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
    }


    function getUserPlayedColor(match, username) {
        if (match.white.username.toLowerCase() === username.toLowerCase()) return "white";
        if (match.black.username.toLowerCase() === username.toLowerCase()) return "black";
        return "";
    }


    function getMatchWinner(match) {
        if (match.white.result.toLowerCase() === "win") return "white";
        if (match.black.result.toLowerCase() === "win") return "black";
        return "draw";
    }

    function getPlayerResult(match, parsedData, username) {
        if (match.white.result === "win" && match.white.username.toLowerCase() === username.toLowerCase()) return "win";
        if (match.black.result === "win" && match.black.username.toLowerCase() === username.toLowerCase()) return "win";
        if (parsedData.Result === "1/2-1/2") return "draw";
        return "lose";
    }


    function getPlayerMoves(movesObject, player) {
        const isWhite = player.toLowerCase() === 'white';
        return Object.values(movesObject).map(move => isWhite ? move[0] : move[1]).filter(Boolean);
    }


    function extractOpeningName(openingURL) {
        const index = openingURL.indexOf("/openings/");
        return openingURL.substring(index + "/openings/".length).replace(/-/g, ' ');
    }


    function extractGameId(gameURL) {
        const index = gameURL.indexOf("/live/");
        return parseInt(gameURL.substring(index + "/live/".length), 10);
    }


    const moveObject = createMoveObject(parsedData.movestring);
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
          , isRated:        match.rated
          , id:             extractGameId(parsedData.Link)
          , date:           parsedData.Date
          , link:           parsedData.Link
          , userPlayed:     userPlayed    
        }
        ,
        moves: {
        //     pgn:              parsedData.movestring
        //   , 
            full:             moveObject
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


}




const MatchHistory = (props) => {
    console.log(props)
    const [arrayMatches, SetArrayMatches] = useState([])
    const [matchesToDisplay, SetMatchesToDisplay] = useState(0)

    const urls = [
          `https://api.chess.com/pub/player/${props.username}/games/2024/06`
        , `https://api.chess.com/pub/player/${props.username}/games/2024/05`
        // , `https://api.chess.com/pub/player/${props.username}/games/2024/04`
        // , `https://api.chess.com/pub/player/${props.username}/games/2024/03`
        // , `https://api.chess.com/pub/player/${props.username}/games/2024/02`
        // , `https://api.chess.com/pub/player/${props.username}/games/2024/01`
        // , `https://api.chess.com/pub/player/${props.username}/games/2023/12`
        // , `https://api.chess.com/pub/player/${props.username}/games/2023/11`
    ];


    const { data, loading, error } = useFetchMultiple(urls);
    const [matches, setMatches] = useState([])

    // console.log(data)
    useEffect(() => {
        console.log(data)
        if (data === null || data === undefined) {
            return;
        }
        // Proceed with setting matches or processing data
        setMatches(data);
        console.log(data)
        prepareMatchData()
        SetMatchesToDisplay(10)
        const matchHistory = combineAndSortMatchObjects();
        createAndStoreMoveObjects(matchHistory)

    }, [data]);




    function combineAndSortMatchObjects() {
        let resultMatchHistory = []
        let index = -1

        // User Inputs a number of required games. Each API endpoint gets the games for that month. We get enough games to pass requirement
        while (resultMatchHistory.length < props.lastNGames) {
            index += 1
            resultMatchHistory = resultMatchHistory.concat(data[index].games);
        };

        // Then reverse the order, and trim the excess
        const reversedGames = resultMatchHistory.reverse()
        const matchHistory = reversedGames.slice(0, props.lastNGames)

        return matchHistory
    };

    async function createAndStoreMoveObjects(matchHistory) {
        const matchObjects = await Promise.all(matchHistory.map(async (match) => {
            // const parsedData = parseMetaInformation(match.pgn);
            // return SingleMatchObject(match, parsedData, props.username);
            // return SingleMatchObject2(match, props.username)

            console.log(SingleMatchParsedData(match.pgn))
        }));

        console.log(matchObjects)
        return matchObjects;
    }


    function prepareMatchData() {
        console.log("prepareMatchData")



        async function getSingleMatches(allGames) {



            // const matchObjects = await Promise.all(allGames.map(async (match) => {

            //     const parsedData = parseMetaInformation(match.pgn);
            //     return SingleMatchObject(match, parsedData, props.username);
            // }));

            // return matchObjects;
        };
        
        // Code to combine all arrays
        // const flattenedArray = data.flatMap(obj => obj.games);

        const a = getSingleMatches(data)
        console.log(a)
        // .then(matches => {

        //     // Adjust match history by flipping, and extracting last x games
        //     const reversedGames = matches.reverse()
        //     const matchHistory = reversedGames.slice(0, props.lastNGames)

        //     SetArrayMatches(matchHistory);
        // })
        // .catch(error => {
        //     console.error('Error fetching single matches:', error);
        // });
    }


    return (
        <section className="player-match-history">

            {/* {!waitingFlag && formData && (
                <div>
                    <button onClick={() => setCurrentComponent('PlayerInformation')}>Player Information</button>
                    <button onClick={() => setCurrentComponent('MatchHistorySummary')}>Player History Summary</button>
                    <button onClick={() => setCurrentComponent('MatchHistory')}>Match History</button>
                    <button onClick={() => setCurrentComponent('UniqueMoves')}>Unique Moves</button>
                    <button onClick={() => setCurrentComponent('OpeningAnalysis')}>Opening Analysis</button>
                </div>
            )} */}



            {/* {!loading && data && (
                <section id="player-history-summary">
                    {data && <MatchHistorySummary matchHistory={arrayMatches} />}
                </section>
            )} */}

            {/* {!loading && data && (
                <section id="matchHistory">
                    {arrayMatches && (
                        <div>
                            {arrayMatches.map((match, index) => (
                                index < matchesToDisplay && <SingleMatch key={index} gameInformation={match} />
                            ))}
                        </div>
                    )}
                </section>
            )} */}


            {!loading && data && (
                <section id="player-unique-moves">
                    {data && <OpeningAnalysis matchHistory={arrayMatches} />}
                </section>
            )}

            {/* {!loading && data && (
                <section id="player-unique-moves">
                    {data && <UniqueMoves matchHistory={arrayMatches} />}
                </section>
            )} */}

            {/* {!waitingFlag && formData && currentComponent === 'OpeningAnalysis' && (
                <section id="player-opening-analysis">
                    {playerData && playerData.matchHistory && <OpeningAnalysis matchHistory={playerData.matchHistory} />}
                </section>
            )} */}

        </section>
    );
}

export default MatchHistory;
