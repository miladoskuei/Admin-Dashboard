import React, { useEffect, useState } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        async function fetchData(url) {
            const data = await fetch(url);
            const json = await data.json();
            const result = Object.entries(json)
            setIsPending(false);
            setData(result);
        }
        fetchData(url);
    }, []);

    return { data, isPending, error };
}