import React from "react";
import { useSelector } from "react-redux";
import WidgetHeader from '../../components/widgetHeader';
import WidgetBody from '../../components/widgetBody';
import Loader from '../../components/loader';

export const WidgetContainer = () => {
  const { isLoading, bids, asks, asksMeta, bidsMeta, widgetHeadOptions, maxTotal} = useSelector((state) => state.widgetReducer);


  const RenderBody = () => {
    return(
      <>
        <div className='widgetContainer__column'>
              <WidgetHeader options={widgetHeadOptions} name='bids' />
              <WidgetBody options={widgetHeadOptions} name='bids' meta={bidsMeta} data={bids} maxTotal={maxTotal} />
          </div>
          <div className='widgetContainer__column'>
              <WidgetHeader options={[...widgetHeadOptions].reverse()} name='asks'  />
              <WidgetBody options={[...widgetHeadOptions].reverse()} name='asks' maxTotal={maxTotal} meta={asksMeta} data={asks} />
          </div>
      </>
    );
  };


  return (
    <div className="widgetContainer">
      <div className="widgetContainer__head">
        <h3 className="widgetContainer__heading">
          <strong>Order book </strong>
          <span>BTC/USD</span>
        </h3>
      </div>
      <div className="widgetContainer__body">
          { isLoading ? <Loader /> : <RenderBody /> }
      </div>
    </div>
  );
};


