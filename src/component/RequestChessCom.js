import React, { useEffect } from "react";

// Components
import RequestChessComLoading from "./RequestChessComLoading";

// Custom Hooks
import useAPIChessCom from "../hooksSpecific/useAPIChessCom";
import useBuildMatchesChessCom from "../hooksSpecific/useBuildMatchesChessCom";

const RequestChessCom = (props) => {

    //
    // Props
    //
    const { username, lastNGames, onDataRequest } = props;


    // Generate URLs dynamically from the current month back to 2011
    const generateUrls = (username) => {
        const urls = [];
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; // Months are 0-based in JavaScript
        const startYear = 2011;

        for (let year = currentYear; year >= startYear; year--) {
            const endMonth = year === currentYear ? currentMonth : 12;
            for (let month = endMonth; month >= 1; month--) {
                const monthString = month.toString().padStart(2, '0'); // Ensure two-digit month format
                urls.push(`https://api.chess.com/pub/player/${username}/games/${year}/${monthString}`);
            }
        }

        return urls;
    };


    //
    // Hooks
    //
    const urls = generateUrls(username);
    const { outputArray, loading, progress, totalEndpoints } = useAPIChessCom(urls, lastNGames);
    const hookParsedMatches = useBuildMatchesChessCom(outputArray, username);
    

    //
    // Effects
    //
    useEffect(() => {
        if (!outputArray || outputArray.length === 0) return;
        if (!hookParsedMatches || hookParsedMatches.length === 0) return;
        onDataRequest(hookParsedMatches);
    }, [outputArray, hookParsedMatches]);

    return (
        <>
        {loading && (
            <RequestChessComLoading progress={progress} total={totalEndpoints} gamesremaining={lastNGames - outputArray.length} />
        )}
        </>
    );
};

export default RequestChessCom;
