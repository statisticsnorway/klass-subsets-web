import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from 'utils';

// DOCME
const subsetsServiceEndpoint = window.__ENV.REACT_APP_SUBSETS_API
// DOCME
const subsetsServiceEndpointAUTH = window.__ENV.REACT_APP_SUBSETS_API_AUTH
// DOCME
const defaultQuery = 'includeFuture=true&includeDrafts=true&language=nb'
const fullVersions = 'includeFullVersions=true'

export function useSubsets() {
    const { data, error } = useSWR(
        `${ subsetsServiceEndpoint }?${ defaultQuery }`,
        fetcher
    );
    return [ data, error ];
}

export function useSubset(id) {
    const { data, error } = useSWR(
        id
            ? `${ subsetsServiceEndpoint }${ id }?${ defaultQuery }&${ fullVersions }`
            : null,
        fetcher, { shouldRetryOnError: false }
        );
    return [ data, error ];
}

export function useVersion(id, versionId) {
    const { data, error } = useSWR(
        id && versionId
            ? `${ subsetsServiceEndpoint }${ id }/versions/${ versionId }?${ defaultQuery }`
            : null,
        fetcher, { shouldRetryOnError: false }
    );
    return [ data, error ];
}

export function useGet(url = null) {
    const [ path, setPath ] = useState(url);
    const [ data, setData ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        let _mounted = true;

        const fetchData = async () => {
            setData(null);
            setError(null);
            setIsLoading(true);

            try {
                const response = await fetch(`${ subsetsServiceEndpoint }${ path }?${ defaultQuery }&${ fullVersions }`);
                let json = await response.json();
                if (_mounted && response.status >= 200 && response.status <= 299) {
                    setData(json);
                    setIsLoading(false);
                } else {
                    throw Error(`${ json.error } ${ json.message }`
                        || `${ response.status } ${ response.statusText }`);
                }
            }
            catch (e) {
                setError({
                    status: e.status,
                    error: 'Fetch error',
                    message: `Error during fetching: ${e.message}`,
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

    }, [ path ]);

    return [ data, isLoading, error, setPath ];
}

export function usePost(url = '') {
    const [ path, setPath ] = useState(url);
    const [ data, setData ] = useState(null);
    const [ payload, setPayload ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => console.debug({
        method: 'POST',
        payload,
        path
    }), [ payload, path ]);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setData(null);

            try {
                const response = await fetch(`${ subsetsServiceEndpointAUTH }${ path }?ignoreSuperfluousFields=true&language=nb`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                let json = await response.json();
                if (response.status >= 200 && response.status <= 299) {
                    setData(json);
                } else {
                    throw Error(`${ json.error } ${ json.message }`
                        || `${ response.status } ${ response.statusText }`);
                }
            }
            catch (e) {
                setError(e);
            }
        };

        if (payload) {
            fetchData();
        }

    }, [ payload, path ]);

    return [ data, setPayload, error, setPath ];
}

export function usePut(url = '') {
    const [ path, setPath ] = useState(url);
    const [ data, setData ] = useState(null);
    const [ payload, setPayload ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => console.debug({
        method: 'PUT',
        payload,
        path
    }), [payload, path]);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setData(null);

            try {
                const response = await fetch(`${ subsetsServiceEndpointAUTH }${ path }?ignoreSuperfluousFields=true&language=nb`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                let json = await response.json();
                if (response.status >= 200 && response.status <= 299) {
                    setData(json);
                } else {
                    throw Error(
                        `${ json.error } ${ json.message }`
                        || `${ response.status } ${ response.statusText }`
                    );
                }
            }
            catch (e) {
                setError(e);
            }
        };

        if (payload) {
            fetchData();
        }

    }, [ payload, path ]);

/*
    useEffect(() => {
        console.debug({path, data, payload, error})
    }, [path, data, payload, error])
*/

    return [ data, setPayload, error, setPath ];
}

