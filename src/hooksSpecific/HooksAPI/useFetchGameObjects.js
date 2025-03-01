import { useState, useEffect } from "react";

const useFetchGameObjects = (urls, lastNGames) => {
    // console.log(`useFetchGameArchives || urls: ${urls} || lastNGames: ${lastNGames}`);

    const [data, setData] = useState([]);
    const [isPending, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!urls || urls.length === 0 || !lastNGames || lastNGames === 0) return;
        // console.log(`==useFetchGameArchives RUNHOOK==`);
        runHook();
    }, [urls, lastNGames]);

    
    async function runHook() {
        const outputArray = [];
        const reverseArray = [...urls.archives].reverse(); // Ensure we're not mutating the original array
        let index = 0;

        try {
            while (outputArray.length < lastNGames && index < reverseArray.length) {
                const url = reverseArray[index];
                const gameObjects = await getData(url);

                if (gameObjects?.games?.length) {
                    outputArray.push(...gameObjects.games.reverse()); // Reverse to get latest games first
                }

                index++;
            }

            // Trim outputArray in case we fetched more games than needed
            setData(outputArray.slice(0, lastNGames));
        } catch (err) {
            setError(err);
            console.error("Error fetching games:", err);
        } finally {
            setLoading(false);
        }
    }

    async function getData(url) {
        console.log(url);
        if (!url) return;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    return { data, isPending, error };
};

export default useFetchGameObjects;
