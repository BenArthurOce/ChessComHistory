
// Gets other game stats based on a win/lose.

import { useState, useEffect } from 'react';

const useOtherGameStats = (hookInput) => {
    const [hookOutput, setHookOutput] = useState([])

    useEffect(() => {
        // Array is the list of parsed Match Objects
        if (!hookInput || hookInput.length === 0) { return };
        runHook();
    }, [hookInput]);

    function runHook() {

        // First, Extract Game Data
        const extractedGameData = extractGameStats(hookInput);
        setHookOutput(extractedGameData);




        // // First, acquire an Array of Objects
        // // structure: {firstMove, id, isCapture, piece, result, team, turn}
        // const dataLineObjects = createMoveHistoryArray(hookInput)

        // // Now we need to group them into white/black, and turn number
        // const sortedMoveData = groupByTeamAndFirstMove(dataLineObjects)
        // setHookOutput(sortedMoveData);
    };

    const extractGameStats = (matchHistory) => {

        // Create Output Schema
        const dataOutput = {
            gameId: null,
            isWin: null,
            eloDiff: null,
            eloDiffGroup: null
        };

        dataOutput['gameId'] = matchHistory.map((match) => match['general']['id']);
        dataOutput['isWin'] = matchHistory.map((match) => match['playerResults']['userResult']);
        dataOutput['eloDiff'] = matchHistory.map((match) => match['playerResults']['eloDiff']);
        // dataOutput['eloDiff'] = matchHistory.map((match) => match['userResult']['eloDiff']);

        dataOutput['eloDiffGroup'] = matchHistory.map((match) => {
                                        const eloDiff = match['playerResults']['eloDiff'];
                                        return Math.floor(eloDiff / 10) * 10;
        })

        return dataOutput;
    };


    return hookOutput;
};

export default useOtherGameStats;
