import { useState, useEffect } from "react";

const useAPILichess = (url, numGames) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState([]);
    const [progress, setProgress] = useState(0);
    const [totalGames, setTotalGames] = useState(numGames);

    useEffect(() => {
        if (!url || url.length === 0) return;
        if (!numGames || numGames === 0) return;
        runHook();
    }, [numGames]);

    async function runHook() {
        try {
            const response = await fetch(`${url}`, {
                headers: {
                    'Accept': 'application/x-ndjson',
                },
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let result = '';
            const gamesArray = [];
            let gamesCount = 0;

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                result += decoder.decode(value, { stream: true });

                const lines = result.split('\n');
                result = lines.pop();

                for (const line of lines) {
                    if (line.trim()) {
                        gamesArray.push(JSON.parse(line));
                        gamesCount += 1;
                        setProgress(gamesCount);
                    }
                }
            }
            setData(gamesArray);
        } catch (error) {
            console.error(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { data, loading, error, progress, totalGames };
};

export default useAPILichess;