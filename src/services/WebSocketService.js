import React, { useRef, useEffect } from 'react';
import { useDispatch } from "react-redux";
import {loadInitDataAction, updateLiveDataAction} from '../store/actions/WidgetContainerAction';

export const WebSocketService = () => {
  
  const ws = useRef(null);
  const dispatch = useDispatch();
  const requestPayload = { 
    event: 'subscribe', 
    channel: 'book', 
    symbol: 'tBTCUSD'
  };

  useEffect(() => {
    ws.current = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
    ws.current.onopen = () => ws.current.send(JSON.stringify(requestPayload));
    ws.current.onclose = () => {
      console.log("WebSocket closed");
    };

    let firstMessage = true;
    ws.current.onmessage = ({data})=> {
      let message = JSON.parse(data);
      if(Array.isArray(message)){
        if(firstMessage){
          dispatch(loadInitDataAction(message[1]));
          firstMessage = false;
        } else {
          dispatch(updateLiveDataAction(message[1]));
        }
      }
    };
    return () => {
      ws.current.close();
    };
  }, []);


  return <></>;

};

