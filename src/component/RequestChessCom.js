import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
} from "react";

// Hooks
import useAPIChessCom from "../hooksSpecific/useAPIChessCom";
import useBuildMatchesChessCom from "../hooksSpecific/useBuildMatchesChessCom";

{
    /*
==== RequestChessCom Component===

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

*/
}

const RequestChessCom = (props) => {

    //
    // Props
    //
    const { username, lastNGames, onDataRequest } = props;

    const urls = [
        `https://api.chess.com/pub/player/${username}/games/2024/07`,
        `https://api.chess.com/pub/player/${username}/games/2024/06`,
        `https://api.chess.com/pub/player/${username}/games/2024/05`,
        `https://api.chess.com/pub/player/${username}/games/2024/04`,
        `https://api.chess.com/pub/player/${username}/games/2024/03`,
        `https://api.chess.com/pub/player/${username}/games/2024/02`,
        `https://api.chess.com/pub/player/${username}/games/2024/01`,

        `https://api.chess.com/pub/player/${username}/games/2023/12`,
        `https://api.chess.com/pub/player/${username}/games/2023/11`,
        `https://api.chess.com/pub/player/${username}/games/2023/10`,
        `https://api.chess.com/pub/player/${username}/games/2023/09`,
        `https://api.chess.com/pub/player/${username}/games/2023/08`,
        `https://api.chess.com/pub/player/${username}/games/2023/07`,
        `https://api.chess.com/pub/player/${username}/games/2023/06`,
        `https://api.chess.com/pub/player/${username}/games/2023/05`,
        `https://api.chess.com/pub/player/${username}/games/2023/04`,
        `https://api.chess.com/pub/player/${username}/games/2023/03`,
        `https://api.chess.com/pub/player/${username}/games/2023/02`,
        `https://api.chess.com/pub/player/${username}/games/2023/01`,

        `https://api.chess.com/pub/player/${username}/games/2022/12`,
        `https://api.chess.com/pub/player/${username}/games/2022/11`,
        `https://api.chess.com/pub/player/${username}/games/2022/10`,
        `https://api.chess.com/pub/player/${username}/games/2022/09`,
        `https://api.chess.com/pub/player/${username}/games/2022/08`,
        `https://api.chess.com/pub/player/${username}/games/2022/07`,
        `https://api.chess.com/pub/player/${username}/games/2022/06`,
        `https://api.chess.com/pub/player/${username}/games/2022/05`,
        `https://api.chess.com/pub/player/${username}/games/2022/04`,
        `https://api.chess.com/pub/player/${username}/games/2022/03`,
        `https://api.chess.com/pub/player/${username}/games/2022/02`,
        `https://api.chess.com/pub/player/${username}/games/2022/01`,

        `https://api.chess.com/pub/player/${username}/games/2021/12`,
        `https://api.chess.com/pub/player/${username}/games/2021/11`,
        `https://api.chess.com/pub/player/${username}/games/2021/10`,
        `https://api.chess.com/pub/player/${username}/games/2021/09`,
        `https://api.chess.com/pub/player/${username}/games/2021/08`,
        `https://api.chess.com/pub/player/${username}/games/2021/07`,
        `https://api.chess.com/pub/player/${username}/games/2021/06`,
        `https://api.chess.com/pub/player/${username}/games/2021/05`,
        `https://api.chess.com/pub/player/${username}/games/2021/04`,
        `https://api.chess.com/pub/player/${username}/games/2021/03`,
        `https://api.chess.com/pub/player/${username}/games/2021/02`,
        `https://api.chess.com/pub/player/${username}/games/2021/01`,

        `https://api.chess.com/pub/player/${username}/games/2020/12`,
        `https://api.chess.com/pub/player/${username}/games/2020/11`,
        `https://api.chess.com/pub/player/${username}/games/2020/10`,
        `https://api.chess.com/pub/player/${username}/games/2020/09`,
        `https://api.chess.com/pub/player/${username}/games/2020/08`,
        `https://api.chess.com/pub/player/${username}/games/2020/07`,
        `https://api.chess.com/pub/player/${username}/games/2020/06`,
        `https://api.chess.com/pub/player/${username}/games/2020/05`,
        `https://api.chess.com/pub/player/${username}/games/2020/04`,
        `https://api.chess.com/pub/player/${username}/games/2020/03`,
        `https://api.chess.com/pub/player/${username}/games/2020/02`,
        `https://api.chess.com/pub/player/${username}/games/2020/01`,
    ];

    //
    // Hooks
    //
    const hookData = useAPIChessCom(urls, lastNGames);
    const hookParsedMatches = useBuildMatchesChessCom(hookData, username)


    //
    // Effects
    //
    useEffect(() => {
        if (!hookData || hookData.length === 0) {return}
        if (!hookParsedMatches || hookParsedMatches.length === 0) {return}
        onDataRequest(hookParsedMatches)    // Sends the data to "ChessAppSwitcher"
    }, [hookData, hookParsedMatches]);


    return (
        <>
        {console.log(hookParsedMatches)}
        </>
    );
}

export default RequestChessCom;