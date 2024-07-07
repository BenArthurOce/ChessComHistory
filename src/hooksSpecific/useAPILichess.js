import { useState, useEffect, useCallback } from "react";

const useAPILichess = (url, lastNGames) => {
    const [outputArray, setOutputArray] = useState([]); 

    useEffect(() => {
        if (!url || url.length === 0) {return;}
        if (!lastNGames || lastNGames === 0) {return;}
        runHook();
    }, [lastNGames]);


    async function runHook() {
        try {
            const response = await fetch(
                `${url}`, 
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
            };
            setOutputArray(gamesArray);

        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    return outputArray;
};

export default useAPILichess;
