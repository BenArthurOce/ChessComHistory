import { useState, useEffect, useCallback } from "react";


import useParsePGN from "./useParsePGN";
// import useSingleMatchObjects from "./useSingleMatchObjects";
import useSingleMatchObjects from "./useSingleMatchObjects2";

//
// "HookInput" is each match object array obtained from the API

const useBuildMatchesLichess2 = (hookInput, username) => {

    // console.log("========useBuildMatchesLichess2=========")
    // console.log(hookInput)
    // console.log(username)

    //
    // States
    //
    const [isTriggerParseStage, setIsTriggerParseStage] = useState(false);
    const [isTriggerBuildStage, setIsTriggerBuildStage] = useState(false);

    //
    // Hooks
    //
    const {parsedGames, isParsePending, parsedErrors} 
        = useParsePGN(hookInput, isTriggerParseStage);

    const {builtGameData, isBuiltPending, builtGameErrors}
        = useSingleMatchObjects(hookInput, parsedGames, username, "lichess", isTriggerBuildStage);


    // --- Combined overall pending ---
    const isPending = isParsePending || isBuiltPending;

 
    // --- Stage 1: Trigger parse ---
    useEffect(() => {
        if (!hookInput || hookInput.length === 0) return;
        if (!username || username.length === 0) return;

        // console.log("[useBuildMatchesLichess] - Triggering Parse Stage");
        setIsTriggerParseStage(true);
    }, [hookInput, username]);


    // --- Stage 2: Trigger build only after parsing is done ---
    useEffect(() => {
        if (isParsePending) return; // wait until parsing finishes
        if (!parsedGames || parsedGames.length === 0) return;

        // console.log("[useBuildMatchesLichess] - Triggering Build Stage");
        setIsTriggerBuildStage(true);
    }, [isParsePending, parsedGames]);


    // Debug logs
    // console.log({
    //     parsedGames,
    //     builtGameData,
    //     isParsePending,
    //     isBuiltPending,
    //     isPending,
    //     parsedErrors,
    //     builtGameErrors,
    // });

    return {
        parsedGames,
        builtGameData,
        isParsePending,
        isBuiltPending,
        isPending,
        errors: {
            parse: parsedErrors,
            build: builtGameErrors,
        },
    };
};

export default useBuildMatchesLichess2;