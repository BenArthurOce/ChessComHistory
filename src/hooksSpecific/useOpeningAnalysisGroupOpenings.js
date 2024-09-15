import { useState, useEffect } from 'react';

const useOpeningAnalysisGroupOpenings = (hookInput, selectedTeam, firstMove) => {
    const [hookOutput, setHookOutput] = useState([]);

    useEffect(() => {
        if (!hookInput || hookInput.length < 1) {
            return;
        }

        // Rank and set the most frequent openings based on the selected team
        const resultData = rankMostFrequentOpenings(hookInput, selectedTeam, firstMove);
        setHookOutput(resultData);

        // // // console.log("====Hook Result===");
        // // // console.log(resultData);
        // // // console.log();

    }, [hookInput, selectedTeam, firstMove]);


    // Function to filter by the first move in the game 
    const filterByFirstMove = (matchArray, firstMove) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.moves.first === firstMove);
    };

    // Function to filter matchArray by ECO Family Name
    const filterByEcoFamilyName = (matchArray, fullName) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.openingData.ECOFAMILY === fullName);
    };


    // Function to filter matchArray by Opening Name
    const filterByName = (matchArray, name) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.openingData.NAME === name);
    };


    // Function to filter matchArray by ECO Code
    const filterByEco = (matchArray, ecoCode) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.opening.eco === ecoCode);
    };


    // Function to filter matchArray by user's played color
    const filterByColour = (matchArray) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.results.userPlayed === selectedTeam);
    };


    // Function to filter matchArray by player's result (win, lose, draw)
    const filterByResult = (matchArray, result) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.playerResults.userResult === result);
    };


    // Function to get unique ECO Family Names from objectArray
    const getUniqueEcoFamilyNames = (objectArray) => {
        return [...new Set(objectArray.map((element) => element.openingData.ECOFAMILY))];
    };


    // Function to get unique Opening Names from objectArray
    const getUniqueNames = (objectArray) => {
        return [...new Set(objectArray.map((element) => element.openingData.NAME))];
    };

    // Function to get unique Full Opening Names from objectArray
    const getUniqueFullNames = (objectArray) => {
        return [...new Set(objectArray.map((element) => element.openingData.FULL))];
    };

    
    // Function to rank the most frequent openings based on match history and selected team
    const rankMostFrequentOpenings = (matchHistory) => {
        const results = [];

        // Filter games based on the starting move
        const gamesFilteredByStartingMove = filterByFirstMove(matchHistory, firstMove)

        // Filter games played by the selected team's color
        const gamesFilteredByColourUsed = filterByColour(gamesFilteredByStartingMove);
        
        // Get unique ECO Family Names from filtered games
        const arrayOfUniqueOpeningFamilies = getUniqueEcoFamilyNames(gamesFilteredByColourUsed);

        // Iterate over each unique ECO Family Name
        arrayOfUniqueOpeningFamilies.forEach(ecoFamilyName => {
            
            const filteredEcoFamilyMatches = filterByEcoFamilyName(gamesFilteredByColourUsed, ecoFamilyName); // Filter games by current ECO Family Name
            const uniqueVariationNames = getUniqueNames(filteredEcoFamilyMatches);  // Get unique Variation Names from filtered matches

            const variations = uniqueVariationNames.map(variationName => {  // Map unique Variation Names to objects containing statistics
                
                const matchesForVariation = filterByName(filteredEcoFamilyMatches, variationName);  // Filter matches by current Variation Name

                return {
                      name: variationName
                    , matches: matchesForVariation
                    , played: matchesForVariation.length
                    , wins: filterByResult(matchesForVariation, "win").length
                    , losses: filterByResult(matchesForVariation, "lose").length
                    , draws: filterByResult(matchesForVariation, "draw").length
                };
            });

            // Sort variations by games played
            variations.sort((a, b) => b.played - a.played);

            // Construct object for current ECO Family with its variations
            const familyEntry = {
                  familyECO: ecoFamilyName
                , variations: variations
                , played: filteredEcoFamilyMatches.length
                , wins: filterByResult(filteredEcoFamilyMatches, "win").length
                , losses: filterByResult(filteredEcoFamilyMatches, "lose").length
                , draws: filterByResult(filteredEcoFamilyMatches, "draw").length
            };

            // Push current ECO Family entry to results array
            results.push(familyEntry);
        });

        // Sort family entries by games played
        results.sort((a, b) => b.played - a.played);

        return results;
    };

    return hookOutput;
};

export default useOpeningAnalysisGroupOpenings;
