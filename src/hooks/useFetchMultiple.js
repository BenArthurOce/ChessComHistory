import { useState, useEffect, useCallback } from "react";

const useFetchMultiple = (urls) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const fetchData = useCallback(() => {
        setLoading(true);
        setData(null);
        setError(null);

        const requests = urls.map(url => fetch(url).then(response => response.json()));

        const p = Promise.all(requests);
        p.then(data => {
            setData(data);
            setLoading(false);
        }).catch(error => {
            setError(error.message);
            setLoading(false);
        });

    }, [urls]);

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error};
};

export default useFetchMultiple;
