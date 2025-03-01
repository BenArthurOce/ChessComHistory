import React, { useEffect } from "react";
import useFetch from "../hooksSpecific/HooksAPI/useFetch";
import useFetchGameObjects from "../hooksSpecific/HooksAPI/useFetchGameObjects";

const MakeRequestsChessCom2 = ({ formData, playerProfileUrl, playerStatsUrl, gameArchiveURls, onDataRequest }) => {
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

    return (
        <>
            <button onClick={handleTestButtonClick}>VIEW REQUEST RESULTS</button>
            <div>
                {isProfilePending ? "Fetching profile data..." : profileData ? "Profile data has been fetched." : profileError && "Error fetching profile data."}
            </div>
            <div>
                {isStatsPending ? "Fetching stats data..." : statsData ? "Stats data has been fetched." : statsError && "Error fetching stats data."}
            </div>
            <div>
                {isArchiveLinksPending ? "Fetching archive links..." : archiveLinksData ? "Archive links have been fetched." : archiveLinksError && "Error fetching archive links."}
            </div>
            <div>
                {isGameObjectsPending ? "Fetching game objects..." : gameObjects ? "Game objects have been fetched." : gameObjectsError && "Error fetching game objects."}
            </div>
        </>
    );
};

export default MakeRequestsChessCom2;
