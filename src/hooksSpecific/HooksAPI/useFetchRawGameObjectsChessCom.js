import { useState, useEffect } from "react";

const useFetchRawGameObjectsChessCom = (urls, lastNGames) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Guard: invalid inputsss
        if (!urls || !urls.archives || urls.archives.length === 0 || !lastNGames || lastNGames <= 0) {
            setData([]);
            setIsPending(false);
            setError(null);
            return;
        }

        let isCancelled = false;

        const runHook = async () => {
            setIsPending(true);
            setError(null);

            try {
                const outputArray = [];
                const reverseArray = [...urls.archives].reverse();
                let index = 0;

                while (outputArray.length < lastNGames && index < reverseArray.length) {
                    const url = reverseArray[index];
                    const rawGameObjects = await getData(url);

                    if (rawGameObjects?.games?.length) {
                        outputArray.push(...rawGameObjects.games.reverse());
                    }

                    index++;
                }

                if (!isCancelled) {
                    setData(outputArray.slice(0, lastNGames));
                }
            } catch (err) {
                if (!isCancelled) {
                    setError(err);
                    console.error("Error fetching games:", err);
                }
            } finally {
                if (!isCancelled) {
                    setIsPending(false);
                }
            }
        };

        runHook();

        return () => {
            isCancelled = true;
        };
    }, [urls, lastNGames]);

    const getData = async (url) => {
        if (!url) return null;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return response.json();
    };

    return { data, isPending, error };
};

export default useFetchRawGameObjectsChessCom;
