import { useState, useEffect, useCallback } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(() => {
        setLoading(true);
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
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = () => {
        fetchData();
    };

    return { data, loading, error, refetch };
};

export default useFetch;
