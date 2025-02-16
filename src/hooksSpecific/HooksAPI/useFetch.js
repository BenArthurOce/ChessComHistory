import { useState, useEffect } from "react";

const useFetch = (url) => {

    // console.log(`useFetch || url: ${url}`)

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        console.log(url)
        if (!url || url.length === 0) return;
        if (url == undefined) return;
        runHook();
    }, [url]);


    const runHook = () => {

        // console.log(`==useFetch RUNHOOK== url: ${url}`);


        setIsPending(true);
        setData(null);
        setError(null);

        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setIsPending(false);
            })
            .catch((error) => {
                setError(error.message);
                setIsPending(false);
            });
    };

    return { data, isPending, error };
};

export default useFetch;