import React, {useContext, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { ReorderableTable as Reorderable, Help, HelpButton } from 'components';
import { BriefContextual } from 'views';
import { AppContext } from 'controllers';
import {
    Repeat,
    ChevronUp,
    ChevronDown
} from 'react-feather';

export const Step4Reorder = () => {
    const { subset: { draft: {
        isEditableCodes,
        codes
    }, dispatch } } = useContext(AppContext);
    const { t } = useTranslation();
    const [ showHelp, setShowHelp ] = useState(false);

    useEffect(() => dispatch({ action: 'remove_timestamps' }), [ dispatch ] );

    return (<>
        <h2>{ t('Reorder codes') }<HelpButton
            clickHandler={ () => setShowHelp(prev => !prev) } />
        </h2>

        <BriefContextual metadata currentVersion />

        <Help visible={ showHelp }>
            { !isEditableCodes()
                ? <p>{ t('Code rank help intro cannot') }</p>
                : <>
                    <p><strong>{ t('Code rank help intro') }</strong></p>
                    <ul>
                        <li>
                            <p>
                                <strong>{ t('Drag and drop') }. </strong>
                                { t('Code rank help drag-and-drop') }
                            </p>
                        </li>
                        <li>
                            <p>
                                <input className='rank' name='example'
                                       style={{ textAlign: 'left', width: '35px', padding: '7px 5px'}}
                                       value='25' disabled />
                                <strong>{ t('Input field') }. </strong>
                                { t('Code rank help input') }
                                <Repeat color='#62919A'/>
                                { t('Code rank help input reset') }
                            </p>
                        </li>
                        <li>
                            <p>
                                    <span style={{ display: 'inline-block', width: '20px' }}>
                                        <ChevronUp size={16} color='#1A9D49'/>
                                        <ChevronDown size={16} color='#1A9D49'/>
                                    </span>
                                <strong>{ t('Arrows') }. </strong>
                                { t('Code rank help arrows') }
                            </p>
                        </li>
                        <li>
                            <p>
                                <strong>{ t('Keyboard') }. </strong>
                                { t('Code rank help keyboard') }
                            </p>
                        </li>
                    </ul>
                </>
            }
        </Help>

        { codes?.length === 0
            ? <p>{ t('No items to sort') }</p>
            : <Reorderable list={ codes }
                           rerank={ (codes, rank) => dispatch({
                               action: 'codes_rerank',
                               data: {codes, rank}})
                           }
                           remove={ codes => dispatch({
                               action: 'codes_exclude',
                               data: codes})
                           }
                           disabled={ !isEditableCodes() }
            />
        }
     </>);
};
