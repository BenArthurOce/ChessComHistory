import { useState, useEffect } from "react";

const useFetchGameArchives = (urls, lastNGames) => {

    console.log(`useFetchGameArchives || urls: ${urls} || lastNGames: ${lastNGames}`)

    const [data, setdata] = useState([]);
    const [isPending, setLoading] = useState(true);
    const [error, setProgress] = useState(0);

    useEffect(() => {

        // return;
        console.log(urls)
        console.log(lastNGames)
        if (!urls || urls.length === 0) return;
        if (!lastNGames || lastNGames === 0) return;
        runHook();
    }, [urls, lastNGames]);

    async function runHook() {
        console.log("==useFetchGameArchives runHook==")
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

        setdata(arrayOfMatches.slice(0, lastNGames));
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

    return { data, isPending, error};
};

export default useFetchGameArchives;
