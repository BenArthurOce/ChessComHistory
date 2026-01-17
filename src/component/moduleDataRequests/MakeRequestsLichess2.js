import React, { useEffect } from "react";
import styled from "styled-components";
import useFetch from "../../hooksSpecific/HooksAPI/useFetch";
// import useFetchGameObjects from "../../hooksSpecific/HooksAPI/useFetchGameObjectsChessCom";
import useBuildMatchesLichess from "../../hooksSpecific/HooksGameObjects/useBuildMatchesLichess2";


const StatusBar = styled.div
`
    width: 100%;
    margin: 10px 0;
    background-color: ${(props) => {
        if (props.error) return "red";
        if (props.pending) return "yellow";
        if (props.success) return "green";
        return "grey";
    }};
    transition: background-color 0.3s ease-in-out;
`
;

const MakeRequestsLichess2 = ({ formData, playerProfileUrl, playerStatsUrl, gamesUrl, onDataRequest }) => {
// const MakeRequestsLichess2 = ({ formData, playerProfileUrl, playerStatsUrl, onDataRequest }) => {
    // console.log(formData, playerProfileUrl, playerStatsUrl, gameArchiveURls, onDataRequest)


    const { data: profileData, isPending: isProfilePending, error: profileError 
    } = useFetch(playerProfileUrl);

    const { data: statsData, isPending: isStatsPending, error: statsError 
    } = useFetch(playerStatsUrl);

    const { data: builtGameData, isPending: isPending, error: errors 
    } = useFetch(gamesUrl);


    // Third API: Fetch the data from each month, trim to number of games
    // const { data: gameObjects, isPending: isGameObjectsPending, error: gameObjectsError 
    // } = useFetchGameObjectsChessCom(archiveLinksData, parseInt(formData.numgames));

    // Build Game objects
    // const {builtGameData, isPending, errors
    // } = useBuildMatchesLichess(gameObjects, formData.username);


    // const { data: archiveLinksData, isPending: isArchiveLinksPending, error: archiveLinksError } = useFetch(gameArchiveURls);
    // const { data: gameObjects, isPending: isGameObjectsPending, error: gameObjectsError } = useFetchGameObjectarchiveLinksData, parseInt(formData.numgames));
    // const { data: gameObjects, isPending: isGameObjectsPending, error: gameObjectsError } = useFetchGameObjectsChessCom('', parseInt(formData.numgames));


    // Send gameObjects to parent when it updates
    // useEffect(() => {
    //     if (gameObjects && onDataRequest) {
    //         onDataRequest(gameObjects);
    //     }
    // }, [gameObjects, onDataRequest]);

    

    const handleViewURLResults = () => {
        console.log("playerProfileUrl", playerProfileUrl);
        console.log("playerStatsUrl", playerStatsUrl);
        console.log("gamesUrl", gamesUrl);
    };

    const handleViewRequestResults = () => {
        console.log("Form input", formData);
        console.log("Profile Data:", profileData);
        console.log("Stats Data:", statsData);
        console.log("Built Games:", builtGameData);
        // console.log("Game Objects:", gameObjects);
    };


    const getStatusText = (pending, error, success, label) => {
        if (error) return `${label} Error!`;
        if (pending) return `${label} Loading...`;
        if (success) return `${label} Loaded!`;
        return `${label} Waiting...`;
    };

    return (
        <>
            <StatusBar pending={isProfilePending} error={profileError} success={profileData}>
                {getStatusText(isProfilePending, profileError, profileData, "Profile")}
            </StatusBar>

            <StatusBar pending={isStatsPending} error={statsError} success={statsData}>
                {getStatusText(isStatsPending, statsError, statsData, "Stats")}
            </StatusBar>

            <StatusBar pending={isPending} error={errors} success={builtGameData}>
                {getStatusText(isPending, errors, builtGameData, "Building Data")}
            </StatusBar>

            {/* <StatusBar pending={isGameObjectsPending} error={gameObjectsError} success={gameObjects}>
                {getStatusText(isGameObjectsPending, gameObjectsError, gameObjects, "Game Objects")}
            </StatusBar> */}

            <button onClick={handleViewURLResults}>VIEW URLS</button>
            <button onClick={handleViewRequestResults}>VIEW REQUEST RESULTS</button>
        </>
    );
};


export default MakeRequestsLichess2;