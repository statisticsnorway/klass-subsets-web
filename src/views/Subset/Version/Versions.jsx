import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Version, Switcher } from 'views';
import { CheckboxGroup } from '@statisticsnorway/ssb-component-library';
import { useQuery } from 'utils';
import { Help, Title } from 'components';
import { useHistory, useParams } from 'react-router-dom';

// TODO: clean and simplify
export const Versions = ({ versions = [],
                           edit = () => {},
                           save = () => {},
                           publish = () => {},
                            current = '',
                            syncParams = false,
                            syncQuery = false
}) => {
    const { t } = useTranslation();
    let history = useHistory();
    let query = useQuery();
    let { versionId } = useParams();

    // FIXME: does not work in Step 5 on several version switch
    const [ version, setVersion ] = useState( versions?.find(v => v.versionId === versionId
        || v.versionId === query.get('versionId')
        || v.versionId === current )
        //orderByValidFromDesc(versions
        //.filter(v => v.administrativStatus != 'OPEN')
        //.filter(v => v.validFrom > new Date().toJSON()))[0] || null
    );
    const [ showHelp, setShowHelp ] = useState(false);
    const pushParams = (option) => history.push(`/subsets/${ option.subsetId }/versions/${ option.versionId }`);
    const pushQuery = option => history.push(`?${ query.update('versionId', option.versionId) }`);

    return (
        <>
            <Title text={ t('Versions') }
                   tag='h2'
                   help={ () => setShowHelp( prev => !prev) }
            />

            <Help visible={ showHelp }>
                <p>{ t('Version info') }.</p>
                <CheckboxGroup
                    header={ t('Filters') }
                    onChange={() => {}}
                    orientation='column'
                    selectedValue='includeFuture'
                    items={[
                        { label: 'includeFuture', value: 'includeFuture' },
                        { label: 'includeDrafts', value: 'includeDrafts' },
                        { label: 'includeDeprecated', value: 'includeDeprecated' }
                    ]}
                />
            </Help>

            <Switcher versions={ versions }
                      onSelect={ option =>
                          syncParams
                              ? pushParams(option)
                              : syncQuery
                                  ? pushQuery(option)
                                  : setVersion(option)
                      }
                      selected={ version }
            />

            { version &&
                <Version version={ version }
                           edit={ edit }
                           save={ save }
                           publish={ publish }
                />
            }

        </>
    );
};
