// useMatchHistoryAPI.js

/* 

"hookInput" is an array. Each array element represents one month.
each of these elements are a secondary array. The arrays contain every chess game played in that month

*/

import { useState, useEffect } from 'react';

const useMatchHistoryAPI = (hookInput, lastNGames) => {
    const [unparsedMatchObjects, setUnparsedMatchObjects] = useState([])

    useEffect(() => {
        if (hookInput === null || hookInput === undefined) {
            return;
        }
        const objectWhatGamesToUse = findGamesToUse(hookInput, lastNGames)
        const unparsedMatchObjects = prepareUnparsedMatchObjectList(hookInput, objectWhatGamesToUse)
        setUnparsedMatchObjects(unparsedMatchObjects)

    }, [hookInput]);


    // Function that reads the hookInput for how many matches a month it has, and how many games we want to use from it
    function findGamesToUse(hookInput, target) {
        const results = {};
        let remainingTarget = target;
        
        for (let i = 0; i < hookInput.length && remainingTarget > 0; i++) {
            const monthObject = hookInput[i];
            const gamesArray = monthObject.games; // Access the 'games' array from the month object
            const gamesToAdd = Math.min(remainingTarget, gamesArray.length);
            
            results[i] = gamesToAdd;
            remainingTarget -= gamesToAdd;
        }
    
        return results;
    };

    // Function that loops through every month, reverses game history and extracts the games we want to display
    function prepareUnparsedMatchObjectList(hookInput, gameNumberObject) {
        let resultMatchHistory = []

        for (const key in gameNumberObject) {

            // The month, and the amount of games we want from that month
            const gamesInThatMonth = hookInput[key]["games"]
            const gamesToExtract = gameNumberObject[key]

            // Reverse the monthly games so the most recent is first. then take the first n games
            const reversedGamesInThatMonth = gamesInThatMonth.reverse()
            const gamesUsedInThatMonth = reversedGamesInThatMonth.slice(0, gamesToExtract)

            // Add the required games to the match history list
            resultMatchHistory = resultMatchHistory.concat(gamesUsedInThatMonth);
        }
    
        return resultMatchHistory;
    };

    return unparsedMatchObjects;
};

export default useMatchHistoryAPI;
