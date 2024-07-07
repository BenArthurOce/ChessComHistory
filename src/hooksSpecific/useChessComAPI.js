import { useState, useEffect, useCallback } from "react";

// The amount of games we need (will be passed as an argument)
const useChessComAPI = (urls, lastNGames) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [outputArray, setOutputArray] = useState([]);          // This will hold all the unparsed match objects from the API



    useEffect(() => {
        if (!urls || urls.length === 0) {
            return;
        }
        if (!lastNGames || lastNGames === 0) {
            return;
        }
        runHook();
    }, [lastNGames]);


    async function runHook() {
        const arrayOfMatches = []
        let currentIndex = -1

        while (currentIndex <= urls.length && arrayOfMatches.length <= lastNGames) {
            
            // console.log(`while ${currentIndex} <= ${urls.length}  &&  ${arrayOfMatches.length}  <=  ${lastNGames} `)
        
            try {
                const result = await getData(urls[currentIndex]);
                arrayOfMatches.push(...result.games)    // Get the result of the games, and add them to the local function array
            } catch (error) {
                setError(error.message);
            } finally  {
                setLoading(false);
                currentIndex += 1
            }
        }

        setOutputArray(arrayOfMatches);
    }



    async function getData(url) {

        if (!url) {return};

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    return outputArray;
};

export default useChessComAPI;
