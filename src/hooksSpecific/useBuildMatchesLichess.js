import { useState, useEffect, useCallback } from "react";


import useParsePGN from "./useParsePGN";
import useSingleMatchObjects from "./useSingleMatchObjects";

//
// "HookInput" is each match object array obtained from the API

const useBuildMatchesLichess = (hookInput, username) => {
    const [hookOutput, setHookOutput] = useState('')

    // const hookUseParsePGN = useParsePGN(hookInput);
    // const hookUseSingleMatchObjects = useSingleMatchObjects(hookInput, hookUseParsePGN, username, "chesscom");



    // useEffect(() => {
    //     if (!hookInput || hookInput.length === 0) { return}
    //     if (!username || username.length === 0) { return}
    //     runHook()
    // }, [username, hookUseParsePGN, hookUseSingleMatchObjects]);


    // const runHook = () => {
    //     setHookOutput(hookUseSingleMatchObjects)
    // };

    return hookOutput;
};

export default useBuildMatchesLichess;
