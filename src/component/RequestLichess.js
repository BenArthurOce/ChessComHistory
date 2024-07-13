import React, { useEffect } from "react";
import useAPILichess from "../hooksSpecific/useAPILichess";
import useBuildMatchesLichess from "../hooksSpecific/useBuildMatchesLichess";
import LoadingLichess from "./LoadingLichess";

const RequestLichess = (props) => {

    //
    // Props
    //
    const { username, lastNGames, onDataRequest } = props;

    //
    // Hooks
    //
    const url = `https://lichess.org/api/games/user/${username}?pgnInJson=true&max=${lastNGames}&accuracy=true&opening=true&evals=true&lastFen=true`;
    const { outputArray, loading, progress, totalGames } = useAPILichess(url, lastNGames);
    const hookParsedMatches = useBuildMatchesLichess(outputArray, username);

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
            <LoadingLichess progress={progress} total={totalGames} gamesremaining={totalGames - progress} />
        )}
        </>
    )
};

export default RequestLichess;
