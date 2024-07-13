import { useState, useEffect } from "react";

const useChessComAPI = (urls, lastNGames) => {
    const [outputArray, setOutputArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [totalEndpoints, setTotalEndpoints] = useState(urls.length);

    useEffect(() => {
        if (!urls || urls.length === 0) return;
        if (!lastNGames || lastNGames === 0) return;
        runHook();
    }, [lastNGames]);

    async function runHook() {
        const arrayOfMatches = [];
        let currentIndex = -1;

        while (currentIndex <= urls.length && arrayOfMatches.length <= lastNGames) {
            console.log(`while ${currentIndex} <= ${urls.length}  &&  ${arrayOfMatches.length}  <=  ${lastNGames} `);
            console.log(`url: ${urls[currentIndex]}`);

            try {
                const result = await getData(urls[currentIndex]);
                const reversed = result.games.reverse();
                arrayOfMatches.push(...reversed); 
            } catch (error) {
                console.error(error.message);
            } finally {
                currentIndex += 1;
                setProgress((prev) => prev + 1);
            }
        }

        setOutputArray(arrayOfMatches.slice(0, lastNGames));
        setLoading(false);
    }

    async function getData(url) {
        if (!url) return;

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

    return { outputArray, loading, progress, totalEndpoints };
};

export default useChessComAPI;
