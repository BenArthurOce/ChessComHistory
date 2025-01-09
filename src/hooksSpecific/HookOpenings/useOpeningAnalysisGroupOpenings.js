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

    // Function to filter by the first move in the Match 
    const filterMatchesByFirstMove = (matchArray, firstMove) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.moves.first === firstMove);
    };

    // Function to filter matchArray by ECO Family Name
    const filterMatchesByECOFamilyName = (matchArray, fullName) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.openingDataNew.ECOFAMILY === fullName);
    };

    // Function to filter matchArray by Opening Name
    const filterMatchesByVariationName = (matchArray, name) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.openingDataNew.NAME === name);
    };

    // Function to filter matchArray by Family Name
    const filterMatchesByFamilyName = (matchArray, name) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.openingDataNew.FAMILY === name);
    };

    // Function to filter matchArray by ECO Code
    const filterByEcoCode = (matchArray, ecoCode) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.opening.eco === ecoCode);
    };

    // Function to filter matchArray by user's played color
    const filterMatchesByColour = (matchArray) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.results.userPlayed === selectedTeam);
    };

    // Function to filter matchArray by player's result (win, lose, draw)
    const filterByResult = (matchArray, result) => {
        if (matchArray.length === 0) { return []; }
        return matchArray.filter(match => match.playerResults.userResult === result);
    };

    // Function to get unique ECO Family Names from objectArray
    const getUniqueECOFamilyNames = (objectArray) => {
        return [...new Set(objectArray.map((element) => element.openingDataNew.ECOFAMILY))];
    };

    // Function to get unique Family Names from objectArray
    const getUniqueGeneralFamilyNames = (objectArray) => {
        try {
            return [...new Set(objectArray.map((element) => {
                if (!element.openingDataNew) {
                    console.error('Missing openingDataNew in getUniqueGeneralFamilyNames:', element);
                    return null;  // Skip this element if missing
                }
                return element.openingDataNew.FAMILY;
            }))].filter(Boolean); // Filter out null values
        } catch (error) {
            console.error('Error in getUniqueGeneralFamilyNames:', error);
            return [];
        }
    };

    // Function to get unique Opening Names from objectArray
    const getUniqueVariationNames = (objectArray) => {
        return [...new Set(objectArray.map((element) => element.openingDataNew.NAME))];
    };

    // Function to rank the most frequent openings based on match history and selected team
    const rankMostFrequentOpenings = (matchHistory) => {
        const results = [];

        //
        // Filters
        //

        // Filter matches based on the starting move
        const matchesFilteredByStartingMove = filterMatchesByFirstMove(matchHistory, firstMove);

        // Filter matches played by the selected team's color
        const matchesFilteredByColourUsed = filterMatchesByColour(matchesFilteredByStartingMove);
        
        
        //
        // General Family
        //
        console.log(matchesFilteredByStartingMove)
        console.log(matchesFilteredByColourUsed)


        // Get unique General Family Names based on filtered Matches
        const arrayOfUniqueGeneralFamilyNames = getUniqueGeneralFamilyNames(matchesFilteredByColourUsed);

        // Iterate over each unique General Family Name
        arrayOfUniqueGeneralFamilyNames.forEach(eachgeneralFamilyName => {
            

            //
            // ECO Family
            //

            // Filter matches by current General Family Name
            const filteredGeneralFamilyMatches = filterMatchesByFamilyName(matchesFilteredByColourUsed, eachgeneralFamilyName); 
            
            // Get unique ECO Family Names based on filtered General Family Name Matches
            const arrayOfUniqueECOFamilyNames = getUniqueECOFamilyNames(filteredGeneralFamilyMatches);  

            // Iterate over each unique ECO Family Name
            const generalFamilyMatchObjects = arrayOfUniqueECOFamilyNames.map(eachECOFamilyName => {  


                //
                // Variations
                //

                // Filter matches by current ECO Family Name
                const filteredECOFamilyMatches = filterMatchesByECOFamilyName(filteredGeneralFamilyMatches, eachECOFamilyName);

                // Get unique Variation Names from filtered matches
                const arrayOfUniqueVariationNames = getUniqueVariationNames(filteredECOFamilyMatches); 

                // Map unique Variation Names to objects containing statistics
                const ECOFamilyMatchObjects = arrayOfUniqueVariationNames.map(eachVariationName => { 
                    const variationMatchObjects = filterMatchesByVariationName(filteredECOFamilyMatches, eachVariationName);

                    return {
                        variationName: eachVariationName,
                        variationMatches: variationMatchObjects,
                        matchesPlayed: variationMatchObjects.length,
                        matchesWon: filterByResult(variationMatchObjects, "win").length,
                        matchesLost: filterByResult(variationMatchObjects, "lose").length,
                        matchesDrew: filterByResult(variationMatchObjects, "draw").length
                    };
                });

                // Sort variations by the number of matches played
                ECOFamilyMatchObjects.sort((a, b) => b.matchesPlayed - a.matchesPlayed);

                // Return an object representing the current ECO Family and its variations
                return {
                    familyECOName: eachECOFamilyName,
                    familyECOMatches: ECOFamilyMatchObjects,
                    matchesPlayed: filteredECOFamilyMatches.length,
                    matchesWon: filterByResult(filteredECOFamilyMatches, "win").length,
                    matchesLost: filterByResult(filteredECOFamilyMatches, "lose").length,
                    matchesDrew: filterByResult(filteredECOFamilyMatches, "draw").length
                };
            });

            // Sort ECO Family by the number of matches played
            generalFamilyMatchObjects.sort((a, b) => b.matchesPlayed - a.matchesPlayed);

            // Construct object for current general family with its variations
            const familyEntry = {
                familyGeneralName: eachgeneralFamilyName,
                familyGeneralMatches: generalFamilyMatchObjects,
                matchesPlayed: filteredGeneralFamilyMatches.length,
                matchesWon: filterByResult(filteredGeneralFamilyMatches, "win").length,
                matchesLost: filterByResult(filteredGeneralFamilyMatches, "lose").length,
                matchesDrew: filterByResult(filteredGeneralFamilyMatches, "draw").length
            };

            // Push current ECO Family entry to results array
            results.push(familyEntry);
        });

        // Sort general family entries by the number of matches played
        results.sort((a, b) => b.matchesPlayed - a.matchesPlayed);

        return results;
    };


    return hookOutput;
};

export default useOpeningAnalysisGroupOpeningsNEW;
