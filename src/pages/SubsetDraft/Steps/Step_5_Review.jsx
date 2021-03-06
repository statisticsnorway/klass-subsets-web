import React, {useContext, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, FormError } from '@statisticsnorway/ssb-component-library';
import { Preview } from 'views';
import { AppContext } from 'controllers';

export const Step5Review = () => {
    const { subset: { draft, dispatch } } = useContext(AppContext);
    const { t } = useTranslation();
    let history = useHistory();

    useEffect(() => dispatch({ action: 'remove_timestamps' }), [ dispatch ] );


return (
        <>
            <h2>{ t('Review and publish') }</h2>

            <Preview data={ draft }
                     save
                     publish
                     syncQuery
            />

            { Object.values(draft?.errors).flat().length > 0 &&
                <FormError title={ t('Some fields are not right') }
                           errorMessages={ Object.values(draft?.errors).flat()?.map(e => t(e)) }
                />
            }

            <div style={{ margin: '5px 0 5px 0', width: '60%' }}>

                <div style={{ float: 'left', marginRight: '20px', padding: '0' }}>
                    <Button
                        disabled={ draft?.isPublished }
                        onClick={() => history.push(`/auth/save?metadata=true&version=true`) }>{ t('Save') }
                    </Button>
                </div>

                <div style={{ float: 'right' }}>
                    <Button
                        disabled={ Object.values(draft.errors).flat().length > 0}
                        onClick={() => history.push(`/auth/save?publish=true&metadata=true&version=true`) }>{ t('Publish') }
                    </Button>
                </div>
                {/*{ frame && <iframe src='/auth/save'
                                   title='Sending data to the server'
                                   style={{ width: '100%', height: '30%', border: 'none'}}
                >
                </iframe>}*/}

                <br style={{ clear: 'both' }}/>
            </div>

            <br/><br/>
        </>
    );
};
