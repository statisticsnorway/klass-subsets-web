import { useState, useEffect } from 'react';
import { today, fetcher } from 'utils';
import useSWR from 'swr';

const klassApiServiceEndpoint = process.env.REACT_APP_KLASS_API;

export const URL = {
    service: 'classifications',

    // TESTME
    toCodeURL(classificationId, code, from, to, encodedName) {

        return {
            code,
            name: decodeURI(encodedName),
            service: this.service,
            classificationId: classificationId,
            classificationURN: `urn:ssb:klass-api:classifications:${ classificationId }`,
            path: from && to
                ? `/${this.service}/${classificationId}/codes.json?from=${ from }&to=${ to }&selectCodes=${ code }`
                : from && !to
                    ? `/${this.service}/${classificationId}/codes.json?from=${ from }&selectCodes=${ code }`
                    : !from && to
                        ? `/${this.service}/${classificationId}/codes.json?to=${ to }&selectCodes=${ code }`
                        : `/${this.service}/${classificationId}/codesAt.json?date=${ today() }&selectCodes=${ code }`
            ,
            url: from && to
            ? `${klassApiServiceEndpoint}/${this.service}/${classificationId}/codes.json?from=${ from }&to=${ to }&selectCodes=${ code }`
                : from && !to
                    ? `${klassApiServiceEndpoint}/${this.service}/${classificationId}/codes.json?from=${ from }&selectCodes=${ code }`
                    : !from && to
                        ? `${klassApiServiceEndpoint}/${this.service}/${classificationId}/codes.json?to=${ to }&selectCodes=${ code }`
                        : `${klassApiServiceEndpoint}/${this.service}/${classificationId}/codesAt.json?date=${ today() }&selectCodes=${ code }`
        };
    },

    toClassificationURL(id, from, to) {
        return {
            service: this.service,
            id,
            path: `/${ this.service }/${id}`,
            codesPath: from && to
                ? `/${ this.service }/${id}/codes.json?from=${ from }&to=${to}`
                : from && !to
                    ? `/${ this.service }/${id}/codes.json?from=${ from }`
                    : !from && to
                        ? `/${ this.service }/${id}/codes.json?to=${ to }`
                        : `/${ this.service }/${id}/codesAt.json?date=${ today() }`,
            url: `${klassApiServiceEndpoint}/${ this.service }/${ id }`,
            codesUrl: from && to
                ? `${klassApiServiceEndpoint}/${ this.service }/${ id }/codes.json?from=${ from }&to=${ to }`
                : from && !to
                    ? `${klassApiServiceEndpoint}/${ this.service }/${ id }/codes.json?from=${ from }`
                    : !from && to
                        ? `${klassApiServiceEndpoint}/${ this.service }/${ id }/codes.json?to=${ to }`
                        : `${klassApiServiceEndpoint}/${ this.service }/${ id }/codesAt.json?date=${ today() }`
        };
    },

    info: (url, from, to) => {

        // FIXME sanitize input - XSS is a threat!!!
        // For now it accepts letters, digits, % & # _ - . , etc
        // the code will be used to fetch data from the Klass API
        // verify service end point
        const classificationPattern = /https:\/\/data.ssb.no\/api\/klass\/v1\/classifications\/[0-9]+/i;

        if (classificationPattern.test(url)) {
            const [ , , , , , , service, id ] = url.split('/');

            return {
                service,
                id,
                urn: `urn:ssb:klass-api:classifications:${id}`,
                path: `/${service}/${id}`,
                codesPath: from && to
                    ? `/${service}/${id}/codes.json?from=${from}&to=${to}`
                    : from && !to
                        ? `/${service}/${id}/codes.json?from=${ from }`
                        : !from && to
                            ? `/${service}/${id}/codes.json?to=${ to }`
                            : `/${service}/${id}/codesAt.json?date=${ today() }`
            };
        }
        return {};
    }
};

// TODO: error handling using global and private error handlers
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
                const response = await fetch(`${klassApiServiceEndpoint}${path}`);
                const json = await response.json();
                if (response.status >= 200 && response.status <= 299 && _mounted) {
                    setData(json);
                    setIsLoading(false);
                } else {
                    throw Error(
                        `${json.error} ${json.message}`
                        || `${response.status} ${response.statusText}`
                    );
                }
            } catch (e) {
                _mounted && setError({
                    timestamp: Date.now(),
                    status: e.status,
                    error: 'Fetch error',
                    message: `Error during fetching: ${e.message}`,
                    path
                });
                _mounted && setIsLoading(false);
            }
        };

        if (_mounted && path) {
            console.debug({path, _mounted});
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

export function useSWRGet(url) {

    const { data, error } = useSWR(url, fetcher)
    return [ data, error ];

}
