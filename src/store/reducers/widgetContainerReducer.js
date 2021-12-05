import { actionType } from "../actions/WidgetContainerAction";
import { cloneDeep } from "lodash";
import { composeLiveData } from '../../helpers/utils';
const initState = {
  isLoading: true,
  bids: {},
  asks: {},
  bidsMeta:[],
  asksMeta:[],
  maxTotal: 0,
  widgetHeadOptions: [{
    id: 'count',
    label: 'Count'
  },{
    id: 'amount',
    label: 'Amount'
  },{
    id: 'total',
    label: 'Total'
  },{
    id: 'price',
    label: 'Price'
  }]
};
const widgetContainerReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case actionType.LOAD_INIT_DATA: {
      return {
        ...state,
        isLoading: false,
        ...payload
      };
    }
    case actionType.UPDATE_LIVE_DATA: {
      const _newState = cloneDeep(state);
      const manipulatedData = composeLiveData(payload, _newState);
      return {
        ...manipulatedData
      };
    }
    default: {
      return state;
    }
  }
};

export default widgetContainerReducer;
