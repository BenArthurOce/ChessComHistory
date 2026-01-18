import React, { useEffect } from "react";
import styled from "styled-components";
import useFetch from "../../hooksSpecific/HooksAPI/useFetch";
import useFetchRawGameObjectsChessCom from "../../hooksSpecific/HooksAPI/useFetchRawGameObjectsChessCom";

import useBuildMatchesChessCom from "../../hooksSpecific/HooksAPI/useBuildMatchesChessCom";

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

const MakeRequestsChessCom2 = ({ formData, playerProfileUrl, playerStatsUrl, gameArchiveURls, onDataRequest }) => {

    // First API: Get player profile summary
    const { data: profileData, isPending: isProfilePending, error: profileError 
    } = useFetch(playerProfileUrl);

    // Second API: Get player stats, rating
    const { data: statsData, isPending: isStatsPending, error: statsError 
    } = useFetch(playerStatsUrl);

    // Third API: Get array of each month API urls
    const { data: archiveLinksData, isPending: isArchiveLinksPending, error: archiveLinksError 
    } = useFetch(gameArchiveURls);

    // Third API: Fetch the data from each month, trim to number of games
    const { data: rawGameObjects, isPending: israwGameObjectsPending, error: rawGameObjectsError 
    } = useFetchRawGameObjectsChessCom(archiveLinksData, parseInt(formData.numgames));

    // Build Game objects
    const {builtGameData, isPending, errors
    } = useBuildMatchesChessCom(rawGameObjects, formData.username);


    // Send rawGameObjects to parent when it updates
    useEffect(() => {
        if (rawGameObjects && builtGameData && onDataRequest) {
            onDataRequest(builtGameData);
        }
    }, [rawGameObjects, builtGameData, onDataRequest]);


    const handleRequestResultsClick = () => {
        console.log("====handleRequestResultsClick====")
        console.log("Form input", formData);
        console.log("Profile Data:", profileData);
        console.log("Stats Data:", statsData);
        console.log("Archive Links:", archiveLinksData);
        console.log("Game Objects:", rawGameObjects);
        console.log("builtGameData", builtGameData)
    };

    const handleErrorResultsClick = () => {
        console.log("====handleErrorResultsClick====")
        console.log("errors", errors);
    };


    const getStatusText = (pending, error, success, label) => {
        if (error) return `${label} Error!`;
        if (pending) return `${label} Loading...`;
        if (success) return `${label} Loaded!`;
        return `${label} Waiting...`;
    };

    return (
        <>

            <h1> MakeRequestsChessCom2 </h1>

            <StatusBar pending={isProfilePending} error={profileError} success={profileData}>
                {getStatusText(isProfilePending, profileError, profileData, "Profile")}
            </StatusBar>

            <StatusBar pending={isStatsPending} error={statsError} success={statsData}>
                {getStatusText(isStatsPending, statsError, statsData, "Stats")}
            </StatusBar>

            <StatusBar pending={isArchiveLinksPending} error={archiveLinksError} success={archiveLinksData}>
                {getStatusText(isArchiveLinksPending, archiveLinksError, archiveLinksData, "Archive Links")}
            </StatusBar>

            <StatusBar pending={israwGameObjectsPending} error={rawGameObjectsError} success={rawGameObjects}>
                {getStatusText(israwGameObjectsPending, rawGameObjectsError, rawGameObjects, "Raw Game Objects")}
            </StatusBar>

            <StatusBar pending={isPending} error={errors?.build} success={builtGameData}>
                {getStatusText(isPending, errors?.build, builtGameData, "Building Game Data")}
            </StatusBar>

            <button onClick={handleRequestResultsClick}>View ChessCom Requests</button>
            <button onClick={handleErrorResultsClick}>View ChessCom Errors</button>
        </>
    );
};

export default MakeRequestsChessCom2;