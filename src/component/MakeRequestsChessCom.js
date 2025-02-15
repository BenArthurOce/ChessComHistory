import React, { useState, useEffect } from "react";
import styled from "styled-components";


import useFetchTest from "./useFetchTest";
import useFetchGameArchives from "../hooksSpecific/HooksAPI/useFetchGameArchives";
import useBuildMatchesChessCom from "../hooksSpecific/HooksGameObjects/useBuildMatchesChessCom";

;

function MakeRequestsChessCom(props) {

    const {formData, playerProfileUrl, playerStatsUrl, gameArchiveURls} = props

    // const [isTriggerGameFetch, setIsTriggerGameFetch] = useState(false);

    // Needs to be populated so the Game Fetch can be triggered
    const [arrayOfURL, setArrayOfURL] = useState(null);
    const [arrayOfGames, setArrayOfGames] = useState(null);


    const { data: profileData, isPending: isProfilePending, error: profileError } = useFetchTest(playerProfileUrl);
    const { data: statsData, isPending: isStatsPending, error: statsError } = useFetchTest(playerStatsUrl);
    const { data: archiveLinksData, isPending: isArchiveLinksPending, error: archiveLinksError } = useFetchTest(gameArchiveURls);
    const { data: gamesData, isPending: isGamesPending, error: gamesError } = useFetchGameArchives(arrayOfURL, formData.numgames);


    // const [finalGameData, setFinalGameData] = useState(null); 

    const hookParsedMatches = useBuildMatchesChessCom(gamesData, formData.username);


    // Gets all game data from the list of Endpoint URLS from "archiveLinksData"
    useEffect(() => {

        if (!archiveLinksData || !archiveLinksData.archives) return;
        setArrayOfURL(archiveLinksData['archives'].reverse())

      }, [archiveLinksData])


    // Once "gamesData" has been completed, we can start transforming those games into objects
    useEffect(() => {

        if (!gamesData ) return;
        setArrayOfGames(gamesData)
        // setArrayOfURL(archiveLinksData['archives'].reverse())

      }, [gamesData])



    const handleTestButtonClick = () => {
        console.log("==handleButtonClick==");
        console.log("Profile Data:", profileData);
        console.log("Stats Data:", statsData);
        console.log("Links Data:", archiveLinksData);
        console.log("Games Data:", gamesData);
        console.log("Parsed Matches:", hookParsedMatches);
    };


    return (

        <>

            {profileData && (
                <>
                    <p>HTTP RESULT: User Profile has been found</p>
                </>
            )}

            {statsData && (
                <>
                    <p>HTTP RESULT: User stats Data</p>
                </>
            )}

            {archiveLinksData && (
                <>
                    <p>HTTP RESULT: User game archive Urls have been found</p>
                </>
            )}

            {gamesData && (
                <>
                    <p>HTTP RESULT: Games data has been found</p>
                </>
            )}
        
            <button onClick={handleTestButtonClick} >TEST</button>

        </>

    );
}

export default MakeRequestsChessCom;
