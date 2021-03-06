import React from 'react';
import { Save } from 'react-feather';

export const SaveButton = ({
                                title = 'Save button',
                                clickHandler = () => {},
                                disabled = false,
                                active = true,
                                visible = true
                            }) => {

    return (
        <>{ visible &&
            <button
                title={ title }
                onClick={ clickHandler }
                disabled={ disabled }
            >
                <Save style={{
                    color: disabled || !active ? '#C3DCDC' : '#1A9D49',
                    margin: '0 10px',
                    cursor: 'pointer'
                }}
                />
            </button>
        }</>
    );
};

