import { useState, useEffect, useCallback } from "react";


import useParsePGN from "./useParsePGN";
import useCreateMatchObjects from "./useCreateMatchObjects";


const useChessComBuildMatchObjects = (hookInput, username) => {
    const [hookOutput, setHookOutput] = useState('')

    const hookUseParsePGN = useParsePGN(hookInput);
    const hookUseCreateMatchObjects = useCreateMatchObjects(hookUseParsePGN, username, "chesscom");



    useEffect(() => {
        // console.log(`hookInput: ${hookInput}`)
        if (!hookInput || hookInput.length === 0) { return}
        if (!username || username.length === 0) { return}

        // console.log(hookUseCreateMatchObjects)

        runHook()

    }, [username]);


    const runHook = () => {
        // console.log(hookUseParsePGN)

    }

    return hookOutput;
};

export default useChessComBuildMatchObjects;
