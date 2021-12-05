import React from 'react';

export const WidgetBody = ({name, meta, options, data, maxTotal}) => {
    return (
        <>
            {
                meta.map( (value) => {
                    const item = data[value];
                    return !data[value] ? null :(
                        <div key={`${name}-${value}`} className={`widgetRow widgetRow--${name}`}>
                            <div className='widgetRow__bar' style={{width:`${(item.total/maxTotal)*100}%`}} />
                            <div className={`widgetRow__wrapper widgetRow__wrapper--${item.isUpdated ? 'active' : ''}`}>
                                {
                                    options.map((option)=>{
                                        return(
                                            <div key={`${name}-${option.id}-${value}`} className={`widgetRow__td ${option.id}`}>{ item[option.id] || value}</div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
};