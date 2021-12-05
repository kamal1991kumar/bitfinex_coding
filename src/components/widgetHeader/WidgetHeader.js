import React from 'react';

export const WidgetHeader = ({options, name}) => {
    return(
        <div className={`widgetHead widgetHead--${name}`}>
           {
                options.map( (option) => {
                    return(
                        <div key={`${name}-${option.id}`} className='widgetHead__th'>{option.label}</div>
                    );
                })
            }
        </div>
    );
};
