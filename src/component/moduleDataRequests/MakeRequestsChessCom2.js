import React, { useEffect } from "react";
import styled from "styled-components";
import useFetch from "../../hooksSpecific/HooksAPI/useFetch";
import useFetchGameObjects from "../../hooksSpecific/HooksAPI/useFetchGameObjects";


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

    // console.log(formData, playerProfileUrl, playerStatsUrl, gameArchiveURls, onDataRequest)

    
    const { data: profileData, isPending: isProfilePending, error: profileError } = useFetch(playerProfileUrl);
    const { data: statsData, isPending: isStatsPending, error: statsError } = useFetch(playerStatsUrl);
    const { data: archiveLinksData, isPending: isArchiveLinksPending, error: archiveLinksError } = useFetch(gameArchiveURls);
    const { data: gameObjects, isPending: isGameObjectsPending, error: gameObjectsError } = useFetchGameObjects(archiveLinksData, parseInt(formData.numgames));

    // Send gameObjects to parent when it updates
    useEffect(() => {
        if (gameObjects && onDataRequest) {
            onDataRequest(gameObjects);
        }
    }, [gameObjects, onDataRequest]);

    const handleTestButtonClick = () => {
        console.log("Form input", formData);
        console.log("Profile Data:", profileData);
        console.log("Stats Data:", statsData);
        console.log("Archive Links:", archiveLinksData);
        console.log("Game Objects:", gameObjects);
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

            <StatusBar pending={isArchiveLinksPending} error={archiveLinksError} success={archiveLinksData}>
                {getStatusText(isArchiveLinksPending, archiveLinksError, archiveLinksData, "Archive Links")}
            </StatusBar>

            <StatusBar pending={isGameObjectsPending} error={gameObjectsError} success={gameObjects}>
                {getStatusText(isGameObjectsPending, gameObjectsError, gameObjects, "Game Objects")}
            </StatusBar>

            <button onClick={handleTestButtonClick}>VIEW REQUEST RESULTS</button>
        </>
    );
};

export default MakeRequestsChessCom2;