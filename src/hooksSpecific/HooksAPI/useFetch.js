import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        console.log(url)
        if (!url) return; 
        console.log("useeffect allowed")
        runHook(url);
    }, [url]);


    async function runHook(url) {
        setIsPending(true);
        try {
            const json = await getData(url);
            setData(json);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsPending(false);
        }
    };


    async function getData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Network response was not ok (${response.status})`);
            return await response.json();
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    console.log(data)
    return { data, isPending, error };
};

export default useFetch;
