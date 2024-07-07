import React, {
    useState,
    useEffect,
    useMemo,
    useCallback,
    useRef,
} from "react";

import useAPILichess from "../hooksSpecific/useAPILichess";
import useBuildMatchesLichess from "../hooksSpecific/useBuildMatchesLichess";



const RequestLichess = (props) => {

    //
    // Props
    //
    const { username, lastNGames, onDataRequest } = props;

    //
    // Hooks
    //
    const url = `https://lichess.org/api/games/user/${username}?pgnInJson=true&max=${lastNGames}&accuracy=true&opening=true&evals=true&lastFen=true`
    const hookData = useAPILichess(url, lastNGames);
    const hookParsedMatches = useBuildMatchesLichess(hookData, username)

    //
    // Effects
    //
    useEffect(() => {
        if (!hookData || hookData.length === 0) {return}
        if (!hookParsedMatches || hookParsedMatches.length === 0) {return}
        onDataRequest(hookParsedMatches)    // Sends the data to "ChessAppSwitcher"
    }, [hookData, hookParsedMatches]);


    return (
        <>
        </>
    );
};

export default RequestLichess;