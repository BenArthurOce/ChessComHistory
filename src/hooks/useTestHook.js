import { useState, useEffect } from 'react';

const useTestHook = () => {
    const [testHookResult, setTestHookResult] = useState("HOOK_TEST_STRING")

    useEffect(() => {
        // console.log("CALL THE TEST HOOK")
        setTestHookResult("HOOK_TEST_STRING_USED")
    }, []);

    return testHookResult;
};

export default useTestHook;
