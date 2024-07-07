import { useState, useEffect, useCallback } from "react";

const useCreateMatchObjects = (hookInput, username, website) => {
    const [hookOutput, setHookOutput] = useState('')


    useEffect(() => {
        console.log(`[useCreateMatchObjects] hookInput: ${hookInput}`)
        console.log(hookInput)
        if (!hookInput || hookInput.length === 0) { return}
        if (!username || hookInput.username === 0) { return}
        if (!website || website.username === 0) { return}

        runHook()
    }, []);


    const runHook = () => {
        
    }

    return hookOutput;
};

export default useCreateMatchObjects;
