import {useEffect, useState} from 'react';

// DOCME
const subSetsServiceEndpoint = process.env.REACT_APP_SUBSETS_API;
// DOCME
const subSetsServiceEndpointAUTH = process.env.REACT_APP_SUBSETS_API_AUTH;

export function useGet(url = null) {
    const [path, setPath] = useState(url);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let _mounted = true;

        const fetchData = async () => {

            setError(null);
            setIsLoading(true);

            try {
                const response = await fetch(`${subSetsServiceEndpoint}${path}`);
                let json = await response.json();
                _mounted && setData(json);
                _mounted && setIsLoading(false);
            }
            catch (e) {
                setError({
                    timestamp: Date.now(),
                    status: e.status,
                    error: 'Fetch error',
                    message: `Error during fetching: ${e.message}`,
                    path
                });
                _mounted && setIsLoading(false);
            }
        };

        if (path !== null && _mounted) {
            setError(null);
            setIsLoading(true);
            //setTimeout(fetchData, 1000);
            fetchData();
        }

        return () => {
            _mounted = false;
        };

    }, [path]);

    return [data, isLoading, error, setPath];
}

export function usePost() {
    const [path, setPath] = useState('');
    const [data, setData] = useState(null);
    const [payload, setPayload] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true);
            setData(null);

            try {
                const response = await fetch(`${subSetsServiceEndpointAUTH}${path}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                let json = await response.json();
                setData(json);
                setIsLoading(false);
            }
            catch (e) {
                setError(e);
                setIsLoading(false);
            }
        };

        if (payload) {
            fetchData();
        }

    }, [payload]);

    return [data, setPayload, isLoading, error, setPath];
}

export function usePut() {
    const [path, setPath] = useState('sets/');
    const [data, setData] = useState(null);
    const [payload, setPayload] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true);
            setData(null);

            try {
                const response = await fetch(`${subSetsServiceEndpointAUTH}${path}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                setData(response.status === 200 ? payload : response.status);
                setIsLoading(false);
            }
            catch (e) {
                setError(e);
                setIsLoading(false);
            }
        };

        if (payload) {
            fetchData();
        }

    }, [payload]);

    return [data, setPayload, isLoading, error, setPath];
}