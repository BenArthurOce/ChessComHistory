import { useState, useEffect, useCallback } from "react";
import JsonFileNew from '../data/openingsNew.json';


const useHookReadDictionary = (hookInput) => {
    const [hookOutput, setHookOutput] = useState({})
    const openingDictionary = JsonFileNew;

    useEffect(() => {
        if (!hookInput || hookInput.length === 0) { return};

        runHook()

        // console.log("useHookReadDictionary")

    }, [hookInput]);


    //
    // Takes the opening name from the chessCom url and seperates it into key words
    //
    function getArrayOfOpeningWords(string) {
        return string.split(' ')
    };



    const filterDictionaryByVolume = (dictionary, searchTerm) => {
        return Object.values(dictionary).filter(({ VOLUME }) => {
            return VOLUME === searchTerm;
        });
    };


    
    const filterByMatchingFamilyName = (dictionary, arrayKeywords) => {
        return Object.values(dictionary).filter(({ FAMILYKEYWORDS }) => {
            const matchingKeywords = FAMILYKEYWORDS.filter(keyword => arrayKeywords.includes(keyword));
            return matchingKeywords.length >= 2;    // Check if there are at least two matches
        })};


    const filterByMatchingKeywords = (dictionary, arrayKeywords) => {
        return Object.values(dictionary).filter(({ FAMILYKEYWORDS, VARIATIONKEYWORDS, SUBVARIATIONKEYWORDS }) => {
            // Combine all keyword arrays into a single array
            const combinedKeywords = [
                ...(FAMILYKEYWORDS || []),
                ...(VARIATIONKEYWORDS || []),
                ...(SUBVARIATIONKEYWORDS || [])
            ];
    
            // Find the intersection of combinedKeywords and arrayKeywords
            const matchingKeywords = combinedKeywords.filter(keyword => arrayKeywords.includes(keyword));
    
            // Check if there are at least two matches
            return matchingKeywords.length >= (arrayKeywords.length - 2);
        });
    };
        

    
    function runHook() {


        // const data = Object.values(openingDictionary);
        // const invalidEntries = findInvalidFamilyKeywords(data);
        
        // if (invalidEntries.length === 0) {
        //     // console.log("All entries have valid FAMILYKEYWORDS.");
        // } else {
        //     // console.log("Invalid entries found:", invalidEntries);
        // }

        hookInput.forEach(match => {
            // // console.log(match.aaaData.adapted)

            const opening_eco = match.aaaData.adapted['opening_eco']
            const opening_volume = match.aaaData.adapted['opening_volume']
            const opening_name = match.aaaData.adapted['opening_name']
            const game_url = match.aaaData.adapted['game_url']


            //
            // Debugging Print
            //
            // console.log("===================")
            // console.log(opening_eco);
            // console.log(opening_volume);
            // console.log(opening_name);
            // console.log(game_url);

            const a = getArrayOfOpeningWords(opening_name)
            // console.log(a)

            // const b = filterDictionaryByVolume(openingDictionary, opening_volume)
            // // console.log(b)

            // const c = filterByMatchingFamilyName(b, a)
            // // console.log(c)

            const d = filterByMatchingKeywords(openingDictionary, a)
            // console.log(d)

            // try {
            //     const c = filterByMatchingFamilyName(b);
            //     // console.log(c);
            // } catch (error) {
            //     console.error("Error when filtering by matching family name:", error);
            // }

        });

        
    };

    return hookOutput;

};

export default useHookReadDictionary;
