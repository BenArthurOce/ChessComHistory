import { useState, useEffect } from 'react';

const useAPILichess = (username, numGames) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://lichess.org/api/games/user/${username}?pgnInJson=true&max=${numGames}&accuracy=true&opening=true&evals=true&lastFen=true`, 
                    {
                        headers: {
                            'Accept': 'application/x-ndjson',
                        }
                    }
                );

                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');
                let result = '';
                const gamesArray = [];

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    result += decoder.decode(value, { stream: true });

                    // Process each line of the NDJSON response
                    const lines = result.split('\n');
                    result = lines.pop(); // Keep the last partial line for next iteration

                    for (const line of lines) {
                        if (line.trim()) {
                            gamesArray.push(JSON.parse(line));
                        }
                    }
                }

                setGames(gamesArray);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { games, loading, error };
};

export default useAPILichess;
