// useMatchHistoryAPI.js

import { useState, useEffect } from 'react';

const useMatchHistoryAPI = (array, lastNGames) => {
    const [unparsedMatchObjects, setUnparsedMatchObjects] = useState([])

    useEffect(() => {
        if (array === null || array === undefined) {
            return;
        }
        
        const matchHistory = combineAndSortMatchObjects();
        setUnparsedMatchObjects(matchHistory)
    }, [array]);

    function combineAndSortMatchObjects() {
        let resultMatchHistory = []
        let index = -1

        // User Inputs a number of required games. Each API endpoint gets the games for that month. We get enough games to pass requirement
        while (resultMatchHistory.length < lastNGames) {
            index += 1
            resultMatchHistory = resultMatchHistory.concat(array[index].games);
        };

        // Then reverse the order, and trim the excess
        const reversedGames = resultMatchHistory.reverse()
        const matchHistory = reversedGames.slice(0, lastNGames)

        return matchHistory;
    };

    return unparsedMatchObjects;
};

export default useMatchHistoryAPI;
