import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (!url) return;
        runHook(url);
    }, [url]);

    async function runHook(url) {
        setIsPending(true);
        setHasError(false);
        setErrorMessage(null);

        try {
            const json = await getData(url);
            setData(json);
        } catch (err) {
            setHasError(true);
            setErrorMessage(err.message);
        } finally {
            setIsPending(false);
        }
    }

    async function getData(url) {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Network error (${response.status})`);
        }

        return response.json();
    }

    return { data, isPending, hasError, errorMessage };
};

export default useFetch;
