import React, { useContext } from 'react';
import { AppContext } from '../../controllers/context';
import { Datepicker } from '../Forms';

export const VersionValidUntilForm = () => {
    const { subset: { draft: {
        versionValidUntil,
        isEditableVersionValidUntil,
        errors
    }, dispatch
} } = useContext(AppContext);

        return (
            <Datepicker label='Version valid until'
                        style={{ float: 'right'}}
                        value={ versionValidUntil || '' }
                        disabled={ !isEditableVersionValidUntil() }
                        onChange={ event => dispatch({
                            action: 'version_to',
                            data: event.target.value === ''
                                ? null
                                : new Date(event.target.value)?.toJSON()
                        })}
                        errorMessages={ errors?.versionValidUntil }
            />
    );
};