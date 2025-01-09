import { useState, useEffect } from 'react';

const useRequestChessComArchives = (username) => {
    const [hookOutput, setHookOutput] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (username === null || username === undefined || username === "" || username.length === 0) {
            return;
        };

        console.log(username);
        
        runHook();

    }, [username]);


    async function runHook() {
        const url = `https://api.chess.com/pub/player/${username.toLowerCase()}/games/archives`;

        try {
            const response = await fetch(url);  // Use await here to wait for the response
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json(); // Wait for the response to be converted to JSON
            setHookOutput(json);
        } catch (error) {
            console.error(error.message);
            setError(error.message);
        }
    }

    return { hookOutput, error };
};

export default useRequestChessComArchives;
