import React, { useState, useEffect } from "react";


function OpeningAnalysis(props) {

    const [ecoList, setEcoList] = useState([]);

    console.log("OpeningAnalysis")
    console.log(props.matchHistory)


    useEffect(() => {

        const ecoListResult = getMostFrequentEcoCodes(props.matchHistory)
        setEcoList(ecoListResult)

    }, [props.matchHistory]);




    const getMostFrequentEcoCodes = (matchHistory) => {
        const ecoCounts = {};
    
        // Extract ECO codes, count their occurrences, and store the matching games
        matchHistory.forEach((match) => {
            const eco = match.opening.eco;
            if (eco) {
                if (!ecoCounts[eco]) {
                    ecoCounts[eco] = { count: 0, matches: [] };
                }
                ecoCounts[eco].count += 1;
                ecoCounts[eco].matches.push(match);
            }
        });
    
        // Convert the counts object to an array of [eco, {count, matches}] pairs
        const ecoArray = Object.entries(ecoCounts);
    
        // Sort the array by count in descending order
        ecoArray.sort((a, b) => b[1].count - a[1].count);
    
        // Map the sorted array to an array of objects with keys "rank", "eco", "count", and "matches"
        const rankedEcoArray = ecoArray.map((entry, index) => ({
            rank: index + 1,
            eco: entry[0],
            count: entry[1].count,
            matches: entry[1].matches
        }));
    
        return rankedEcoArray;
    };


    return (
        <section className="opening-analysis">
            <h1>Opening Analysis</h1>
            {/* {props && (

            )} */}
        </section>
    );
}

export default OpeningAnalysis;