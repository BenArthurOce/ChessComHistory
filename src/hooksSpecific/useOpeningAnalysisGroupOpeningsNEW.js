import { useState, useEffect } from 'react';

const useOpeningAnalysisGroupOpeningsNEW = (hookInput, selectedTeam, firstMove) => {
    const [hookOutput, setHookOutput] = useState([]);

    useEffect(() => {
        if (!hookInput || hookInput.length < 1) {
            return;
        }

        // Rank and set the most frequent openings based on the selected team
        const resultData = rankMostFrequentOpenings(hookInput, selectedTeam, firstMove);
        setHookOutput(resultData);

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

    // Function to filter matchArray by Family Name
    const filterByFamilyName = (matchArray, name) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.openingData.FAMILY === name);
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

    // Function to get unique Family Names from objectArray
    const getUniqueFamilyNames = (objectArray) => {
        return [...new Set(objectArray.map((element) => element.openingData.FAMILY))];
    };

    // Function to get unique Opening Names from objectArray
    const getUniqueNames = (objectArray) => {
        return [...new Set(objectArray.map((element) => element.openingData.NAME))];
    };

    // Function to rank the most frequent openings based on match history and selected team
    const rankMostFrequentOpenings = (matchHistory) => {
        const results = [];

        // Filter games based on the starting move
        const gamesFilteredByStartingMove = filterByFirstMove(matchHistory, firstMove);

        // Filter games played by the selected team's color
        const gamesFilteredByColourUsed = filterByColour(gamesFilteredByStartingMove);
        
        // Get unique General Family Names from filtered games
        const arrayOfUniqueOpeningFamilies = getUniqueFamilyNames(gamesFilteredByColourUsed);

        // Iterate over each unique ECO Family Name
        arrayOfUniqueOpeningFamilies.forEach(generalFamilyName => {
            
            // Filter games by current General Family Name
            const filteredGeneralFamilyMatches = filterByFamilyName(gamesFilteredByColourUsed, generalFamilyName); 
            
            // Get unique ECO Family Names from filtered matches
            const uniqueECOFamilyNames = getUniqueEcoFamilyNames(filteredGeneralFamilyMatches);  

            // Map unique ECO Family Names to objects containing statistics
            const ECOFamilyNames = uniqueECOFamilyNames.map(ECOFamilyName => {  

                // Further filter matches by the ECO Family Name
                const matchesForECOFamilyName = filterByEcoFamilyName(filteredGeneralFamilyMatches, ECOFamilyName);

                // Get unique Variation Names from filtered matches
                const uniqueVariationNames = getUniqueNames(matchesForECOFamilyName); 

                // Map unique Variation Names to objects containing statistics
                const variationNames = uniqueVariationNames.map(variationName => { 
                    const matchesForVariationName = filterByName(matchesForECOFamilyName, variationName);

                    return {
                        name: variationName,
                        matches: matchesForVariationName,
                        played: matchesForVariationName.length,
                        wins: filterByResult(matchesForVariationName, "win").length,
                        losses: filterByResult(matchesForVariationName, "lose").length,
                        draws: filterByResult(matchesForVariationName, "draw").length
                    };
                });

                // Return an object representing the current ECO Family and its variations
                return {
                    name: ECOFamilyName,
                    variations: variationNames
                };
            });

            // Sort variations by games played
            ECOFamilyNames.sort((a, b) => b.played - a.played);

            // Construct object for current general family with its variations
            const familyEntry = {
                familyName: generalFamilyName,
                ecoFamilyName: ECOFamilyNames, // Now contains actual objects with variations
                played: filteredGeneralFamilyMatches.length,
                wins: filterByResult(filteredGeneralFamilyMatches, "win").length,
                losses: filterByResult(filteredGeneralFamilyMatches, "lose").length,
                draws: filterByResult(filteredGeneralFamilyMatches, "draw").length
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

export default useOpeningAnalysisGroupOpeningsNEW;
