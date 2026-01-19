import React, { useEffect } from "react";
import styled from "styled-components";
import useFetch from "../../hooksSpecific/HooksAPI/useFetch";
import useAPILichess from "../../hooksSpecific/HooksAPI/useAPILichess";
import useBuildMatchesLichess2 from "../../hooksSpecific/HooksGameObjects/useBuildMatchesLichess2";


const StatusBar = React.memo(styled.div
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
`);



const MakeRequestsLichess2 = ({ formData, playerProfileUrl, playerStatsUrl, gamesUrl, onDataRequest }) => {

    const { data: profileData, isPending: isProfilePending, hasError: profileError, errorMessage: profileErrorMessage
    } = useFetch(playerProfileUrl);

    const { data: statsData, isPending: isStatsPending, hasError: statsError, errorMessage: statsErrorMessage
    } = useFetch(playerStatsUrl);

    // const { data: rawGameData, isPending: isRawDataPending, hasError: rawDataErrors 
    // } = useAPILichess(gamesUrl, 2);

   const { data: rawGameData, loading: isRawDataPending, error: rawDataErrors, progress, totalGames
    } = useAPILichess(gamesUrl, formData.numgames);

    
    // const { outputArray, loading, progress, totalGames } = useAPILichess(url, lastNGames);


    // Third API: Fetch the data from each month, trim to number of games
    // const { data: gameObjects, isPending: isGameObjectsPending, hasError: gameObjectsError 
    // } = useFetchGameObjectsChessCom(archiveLinksData, parseInt(formData.numgames));

    // Build Game objects
    const {builtGameData, isPending: isBuiltGamePending, errors: builtGameErrors
    } = useBuildMatchesLichess2(rawGameData, formData.username);

    // const { data: archiveLinksData, isPending: isArchiveLinksPending, hasError: archiveLinksError } = useFetch(gameArchiveURls);
    // const { data: gameObjects, isPending: isGameObjectsPending, hasError: gameObjectsError } = useFetchGameObjectarchiveLinksData, parseInt(formData.numgames));
    // const { data: gameObjects, isPending: isGameObjectsPending, hasError: gameObjectsError } = useFetchGameObjectsChessCom('', parseInt(formData.numgames));


    // Send gameObjects to parent when it updates
    // useEffect(() => {
    //     if (gameObjects && onDataRequest) {
    //         onDataRequest(gameObjects);
    //     }
    // }, [gameObjects, onDataRequest]);

    
    // // Send rawGameObjects to parent when it updates
    useEffect(() => {
        if (!builtGameData || !onDataRequest) return;

        // Only call if the data has meaningful content
        if (Array.isArray(builtGameData) ? builtGameData.length > 0 : true) {
            onDataRequest(builtGameData);
        }
    }, [builtGameData, onDataRequest]);


    const handleViewURLResults = () => {
        console.log("playerProfileUrl", playerProfileUrl);
        console.log("playerStatsUrl", playerStatsUrl);
        console.log("gamesUrl", gamesUrl);
    };

    const handleViewRequestResults = () => {
        console.log("Form input", formData);
        console.log("Profile Data:", profileData);
        console.log("Stats Data:", statsData);
        console.log("Raw Games:", rawGameData);
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

            <h1>MakeRequestsLichess2</h1>

            <StatusBar pending={isProfilePending} error={profileError} success={profileData}>
                {getStatusText(isProfilePending, profileError, profileData, "Profile")}
            </StatusBar>

            <StatusBar pending={isStatsPending} error={statsError} success={statsData}>
                {getStatusText(isStatsPending, statsError, statsData, "Stats")}
            </StatusBar>

            <StatusBar pending={isRawDataPending} error={rawDataErrors} success={rawGameData}>
                {getStatusText(isRawDataPending, rawDataErrors, rawGameData, "Raw Game Objects")}
            </StatusBar>

            <StatusBar pending={isBuiltGamePending} error={builtGameErrors} success={builtGameData}>
                {getStatusText(isBuiltGamePending, builtGameErrors, builtGameData, "Building Data")}
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