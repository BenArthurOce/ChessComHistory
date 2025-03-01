import React, { useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import useFetch from "../hooksSpecific/HooksAPI/useFetch";

const MakeRequestsChessCom = (props) => {
    const { formData, playerProfileUrl, playerStatsUrl, gameArchiveURls, onDataRequest } = props;

    


    const refProfileUrl = useRef(playerProfileUrl);
    const refStatsUrl = useRef(playerStatsUrl);
    const refArchiveUrl = useRef(gameArchiveURls);

    const isProfileDataGot = useRef(false);
    const isStatsDataGot = useRef(false);
    const isEndpointDataGot = useRef(false);

    const rendersCountRef = useRef(0);
    rendersCountRef.current += 1;

    console.log("===MakeRequestsChessCom RENDERED===", rendersCountRef.current);

    
    // Fetch API data
    const { data: profileData, isPending: isProfilePending, error: profileError } = useFetch(refProfileUrl.current, isProfileDataGot.current);
    const { data: statsData, isPending: isStatsPending, error: statsError } = useFetch(refStatsUrl.current, isStatsDataGot.current);
    const { data: archiveLinksData, isPending: isArchiveLinksPending, error: archiveLinksError } = useFetch(refArchiveUrl.current, isEndpointDataGot.current);

    
    // useEffect(() => {

    //     console.log("useEffect triggered on the component being invoked")

    //     isProfileDataGot.current = false;
    //     isStatsDataGot.current = false;
    //     isEndpointDataGot.current = false;

    // }, []);

    useEffect(() => {
        console.log("useEffect triggered on the data being grabbed")

        if (!profileData) {
            console.log("Profile data is null");
            return;
        } else {console.log(profileData)}


        if (!statsData) {
            console.log("Stats data is null");
            return;
        } else {console.log(statsData)}


        if (!archiveLinksData) {
            console.log("Archive data is null");
            return;
        } else {console.log(archiveLinksData)}



        isProfileDataGot.current = true;
        isStatsDataGot.current = true;
        isEndpointDataGot.current = true;

    // }, [profileData, statsData, archiveLinksData]); 
}, []); 

  

    const handleTestButtonClick = () => {
        console.log("Profile Data:", profileData);
        console.log("Stat Data:", statsData);
        console.log("Archive Data:", archiveLinksData);
    };



    return (
        <>
            <button onClick={handleTestButtonClick}>VIEW REQUEST RESULTS</button>
            <span>
                RendersCounter rendered <b>{rendersCountRef.current}</b> time(s)
            </span>
        </>
    );
};

export default MakeRequestsChessCom;
