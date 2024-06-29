import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';

// Hooks
import useFetchMultiple from "../hooks/useFetchMultiple";
import useMatchHistoryAPI from '../hooksSpecific/useMatchHistoryAPI';
import useMatchHistoryParsePGN from '../hooksSpecific/useMatchHistoryParsePGN';


{/*
==== MatchesRequest Component===

This is a child component that is tasked with obtaining the match history API, sorting it into ParsedMatchObjects and returning it to the parent component

Works in these three steps:
    1. uses the "useFetchMultiple" hook to obtain the game data.
            The game data comes in this format: {[month1] [month2] [month3] [month4]}
                this represents each month api endpoint, and the results stored in an array

    2. uses the "useMatchHistoryAPI"
            This hook takes the "{[month1] [month2] [month3] [month4]}" and merges them into one array
            This hook will continue to do the merging, until the required amount of games from props.lastNGames is met
            Then the aray will be reversed, and the excess games will be trimmed off

    3. uses the useMatchHistoryParsePGN
            We now have an array of every chess game, and need to remodel the data structure to our own needs
            This complex hook comes in two parts:

                3a: Extract the key "pgn" from each game, and use regex to extract key information about the match
                        We then further use regex to extract the individual moves and organise them into a {1: [white, black], 2: [white, black], 3: [white, black] object

                3b: Create the ParsedMatchObject
                        We use the data from each match, as well as the data from 3a to create a ParsedMatchObject

Output:
    The Output from this component should be a single array. Filled with ParsedGameObjects.
    the ParsedGameObject has the following stucture

        ParsedGameObjects{
            general: {url, site, event, rules, isRated, id, date, link, userPlayed}
            moves: {full, white, black}
            results: {white, black, fen, terminationFull, terminationWord, userPlayed, userResult, winner}
            playerResults: {name, userPlayed, userResult, userMoves}
            time: {class, control, base, increment, bonus, start, end}
            white: {username, elo, url}
            black: {username, elo, url}
            opening: {eco, url, name}
        }


Usage:
    The array output will be used almost in every other component that requires data.
    Those components will manipulate and summarise the data for their own requirements

*/}


const MatchesRequest = ({ username, lastNGames, onDataRequest }) => {
    const [renderFlag, setRenderFlag] = useState(false);

    const urls = [
          `https://api.chess.com/pub/player/${username}/games/2024/06`
        , `https://api.chess.com/pub/player/${username}/games/2024/05`
        , `https://api.chess.com/pub/player/${username}/games/2024/04`
        , `https://api.chess.com/pub/player/${username}/games/2024/03`
        , `https://api.chess.com/pub/player/${username}/games/2024/02`
        , `https://api.chess.com/pub/player/${username}/games/2024/01`
        , `https://api.chess.com/pub/player/${username}/games/2023/12`
        , `https://api.chess.com/pub/player/${username}/games/2023/11`
    ];

    const { data, loading, error } = useFetchMultiple(urls);
    const hookArrayOfUnparsedMatchObjects = useMatchHistoryAPI(data, lastNGames);
    const hookArrayOfParsedMatchObjects = useMatchHistoryParsePGN(hookArrayOfUnparsedMatchObjects, username);


    useEffect(() => {
        if (hookArrayOfParsedMatchObjects) {
            onDataRequest(hookArrayOfParsedMatchObjects); // Send parsed data to parent
            setRenderFlag(checkIfAbleToRender(hookArrayOfParsedMatchObjects));
  
        } else {
            setRenderFlag(false);
        }
    }, [hookArrayOfParsedMatchObjects, onDataRequest]);


    const checkIfAbleToRender = (array) => {
        if (array === null || array === undefined) {return false}
        if (array <= 1) {return false}
        return true
    };

    return (
        <>
            {renderFlag && (
                <div>
                    <p></p>
                </div>
            )}
        </>
    );
};

export default MatchesRequest;
