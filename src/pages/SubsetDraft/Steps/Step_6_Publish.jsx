import React, { useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '@statisticsnorway/ssb-component-library';
import { usePost, usePut } from 'controllers/subsets-api';
import { useHistory } from 'react-router-dom';
import { AppContext } from 'controllers';
import { CheckCircle } from 'react-feather';
import { useQuery } from 'utils';

export const Step6Publish = () => {
    const { subset: { draft: {
        id,
        versionId,
        publishVersionPayload,
        metadataPayload,
        versionPayload,
        isNew,
        isNewVersion
    }, dispatch} } = useContext(AppContext);
    const { t } = useTranslation();
    let history = useHistory();
    let query = useQuery();

    const [ post, setPOSTPayload, errorPost ] = usePost();
    const [ update, setPUTPayload, errorUpdate ] = usePut(id);
    const [ postVersion, setPOSTPayloadVersion, errorPostVersion ] = usePost(`${id}/versions`);
    const [ updateVersion, setPUTPayloadVersion, errorUpdateVersion ] = usePut(`${id}/versions/${ versionId }`);

    useEffect(() => {
        if (!post && !update) {
            if ((query.get('metadata') || query.get('version')) && isNew()) {
                console.debug('New subset ', isNew());
                setPOSTPayload(metadataPayload);
            }
            if (query.get('metadata') && !isNew()) {
                console.debug('Save metadata ', !isNew());
                setPUTPayload(metadataPayload);
            }
            if (query.get('version') && isNewVersion() && !isNew()) {
                console.debug('New version ', isNewVersion());
                setPOSTPayloadVersion(query.get('publish')
                    ? publishVersionPayload
                    : versionPayload
                );
            }
            if (query.get('version') && !isNewVersion()) {
                console.debug('Update version ', !isNewVersion());
                setPUTPayloadVersion(query.get('publish')
                    ? publishVersionPayload
                    : versionPayload
                );
            }
        } else {
            if (query.get('version') && isNewVersion()) {
                console.debug('New version when metadata is saved', isNewVersion());
                setPOSTPayloadVersion(query.get('publish')
                    ? publishVersionPayload
                    : versionPayload
                );
            }
        }

    }, [ post, update ]);// eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (post || update) {
            dispatch({
                action: 'metadata_sync',
                data: post || update
            });
        }
    }, [ dispatch, post, update ]);

    useEffect(() => {
        if (postVersion || updateVersion) {
            console.debug('Version is updated', { response: postVersion || updateVersion });
            dispatch({
                action: 'version_sync',
                data: {
                    update: postVersion || updateVersion,
                    tempId: versionId
                }
            });
        }
    }, [ dispatch, postVersion, updateVersion, versionId ]);

    return (
        <div style={{ minHeight: '350px', textAlign: 'center', margin: 'auto', width: '100%' }}>

            { (!errorPost && !errorUpdate && !post && !update && query.get('metadata')) &&
                <p>{ t('Sending metadata to the server') }...</p>
            }
            { (query.get('version') && !errorPostVersion && !errorUpdateVersion && !postVersion && !updateVersion && !errorPost && !errorUpdate)
                &&
                <p>{ t('Sending version to the server') }...</p>
            }
            { (errorPost || errorUpdate || errorPostVersion || errorUpdateVersion) &&
            <div style={{
                width: '100%',
                height: '30%',
                border: 'none',
                margin: 'auto',
            }}>
                <Dialog type='warning'
                        title='Update failed'
                          //  {t('Update failed', {id, version: versionId})}
                >
                    {`Subset's ID: ${ id }. `}
                    {`Version's ID: ${ versionId }. `}
                    {`Error message: ${ errorPost || errorUpdate || errorPostVersion || errorUpdateVersion }`}
                </Dialog>
            </div>
            }
            { (post || update) &&
                <p style={{ color: 'green' }}>
                    <CheckCircle color='green'/> { t('Success') }. { t('Metadata is sent') }.
                </p>
            }
            { (postVersion || updateVersion) &&
                <p style={{ color: 'green' }}>
                    <CheckCircle color='green'/> { t('Success') }. { t('Version is sent') }.
                </p>
            }
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={ () => history.push(`/auth/editor?step=Metadata&subsetId=${ id }&versionId=${ postVersion?.versionId || updateVersion?.versionId || query.get('versionId') || versionId }`) }>
                    { t('Back to metadata') }
                </button>
                <button onClick={ () => history.push(`/auth/editor?step=Versions&subsetId=${ id }&versionId=${ postVersion?.versionId || updateVersion?.versionId || query.get('versionId') || versionId }`) }>
                    { t('Back to versions') }
                </button>
                <button onClick={ () => history.push(`/auth/editor?step=Review%20and%20publish&subsetId=${ id }&versionId=${ postVersion?.versionId || updateVersion?.versionId || query.get('versionId') || versionId }`) }>
                    { t('Back to review') }
                </button>
                <button onClick={ () => history.push(`/subsets/${id}`) }>
                    { t('Out of edition mode') }
                </button>
            </div>
        </div>
    );
};
