import React from 'react';
import { useTranslation } from 'react-i18next';
import './block-expandable.css';

export const BlockExpandable = ({ label, text, color, light }) => {
    const { t } = useTranslation();
    return (
        <div className='grow'
             style={{ backgroundColor: color || '#C3DCDC' }}
        >
            <span className='label'
                  style={{ backgroundColor: '#F0F8F9' }}
            >{ t( label ) }:</span>
            <span className={ light && 'light' } >{ text }</span>
        </div>
    );
}