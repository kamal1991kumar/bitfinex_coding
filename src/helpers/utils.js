import { round, toNumber, isUndefined } from "lodash";

const totalCalcualtionformAmount = (meta, data, price) => {
    let total = 0;
    for(let i=0;i<meta.length;i++){
      const item = meta[i];
      total += data[item].amount;
      data[item].total = toNumber(total.toFixed(4));
      data[item].isUpdated = false;
    }
    data[price].isUpdated = true;
    data.maxTotal = total;
};

export const composeInitData = (payload=[]) => {
  const bidsMeta = [];
  const bids = {};
  const asksMeta = [];
  const asks = {};
  bids.maxTotal = 0;
  asks.maxTotal = 0;
  let a = {};
  let b = {};
  
  let j = 25;
  for(let i=0; i<25;i++){
    b = { price:payload[i][0], count: payload[i][1], amount: payload[i][2] }
    bidsMeta.push(b.price);
    bids.maxTotal += round(b.amount, 4);
    bids[b.price] = {
      count: b.count,
      total: bids.maxTotal.toFixed(4),
      amount: toNumber(round(b.amount, 4).toFixed(4)),
      isUpdated: false
    }
    
    if(isUndefined(payload[j])){
      return;
    }
    a = { price:payload[j][0], count: payload[j][1], amount: Math.abs(payload[j][2]) }
    asksMeta.push(a.price);
    asks.maxTotal +=  round(a.amount, 4);
    asks[a.price] = {
      count: a.count,
      total: toNumber(asks.maxTotal.toFixed(4)),
      amount: toNumber(round(a.amount, 4).toFixed(4)),
      isUpdated: false
    }
    j++;
  }

  const maxTotal = asks.maxTotal > bids.maxTotal ? asks.maxTotal : bids.maxTotal;

  return {
    bids,
    bidsMeta,
    asks,
    asksMeta,
    maxTotal
  };
};

const findIndexAndDelete = (arr, value) => {
  const index = arr.indexOf(value);
  if(index !== -1){
    arr.splice(index, 1);
  }
};

const findMaxPriceIndex = (arr, price, asc) => {
  let priceIndex = arr.indexOf(price);
  if(priceIndex === -1) {
    arr.push(price);
    arr.sort((a, b) => asc ? a - b : b - a); 
  }
};

export const composeLiveData = (payload, state) => {
  const p = { price: payload[0] || 0, count: payload[1] || 0, amount: payload[2] || 0 };
  if(typeof p.price !== 'number'){
    return state;
  }
  if(!p.count){
      if(p.amount>0){
        if(state.bids[p.price]){
            delete state.bids[p.price];
            findIndexAndDelete(state.bidsMeta, p.price);
        }
      } else if(p.amount<0){
        if(state.asks[p.price]){
            delete state.asks[p.price];
           findIndexAndDelete(state.asksMeta, p.price);
        }
      }
  } else {
    const newData = {
      count: p.count,
      total: round(Math.abs(p.amount), 4),
      amount: toNumber(round(Math.abs(p.amount), 4).toFixed(4))
    };

    if(p.amount >= 0){
      state.bids[p.price]= newData;
      findMaxPriceIndex(state.bidsMeta, p.price, false);
      totalCalcualtionformAmount(state.bidsMeta, state.bids, p.price);
    } else {
      state.asks[p.price]= newData;
      findMaxPriceIndex(state.asksMeta, p.price, true);
      totalCalcualtionformAmount(state.asksMeta, state.asks, p.price);
    }

    const maxTotal = state.asks.maxTotal > state.bids.maxTotal ? state.asks.maxTotal : state.bids.maxTotal;
    state.maxTotal = maxTotal;

  }
  return state;
};