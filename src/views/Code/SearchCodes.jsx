import React from 'react';
import { Code } from 'views';
import { useTranslation } from 'react-i18next';
import { flatten } from 'utils';
import { Title, Datepicker } from 'components';

export const SearchCodes = ({ data = [], edit = () => {} }) => {
    const { t } = useTranslation();

    return (
        <>
            <Title text='Codes' edit={ edit } />

            <p>{ t('Codes filter info') }</p>

            <div className='period' style={{ display: 'flex'}}>

                <Datepicker label='Valid from'
                            style={{ float: 'left' }}
                />
                <Datepicker label='Valid to'
                            style={{ float: 'right'}}/>

                <br style={{ clear: 'both' }}/>
            </div>

            {/* FIXME: hard code*/}
            <h3>{ t('Codes valid in the specified period') }: 01.01.2020 - ...</h3>
            {/* FIXME: check the validity period is set correctly*/}
            { flatten(data.map(version => version.codes))
                .map((code, i) => (
                        <Code key={ i }
                              origin={ code }
                              /*valid={ doPeriodsIntersect(code.validFromInRequestedRange, code.validToInRequestedRange, validFrom, validUntil) } */
                        />
                    )
                )
            }
        </>
    );
}
