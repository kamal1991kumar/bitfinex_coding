import { composeInitData } from '../../helpers/utils';
 
const actionType = {
  LOAD_INIT_DATA: "LOAD_INIT_DATA",
  UPDATE_LIVE_DATA: "UPDATE_LIVE_DATA"
};


const loadInitDataAction = (payload) => ({
  type: actionType.LOAD_INIT_DATA,
  payload: composeInitData(payload),
});
const updateLiveDataAction = (payload) => ({
  type: actionType.UPDATE_LIVE_DATA,
  payload: payload,
});
 

export {
  actionType,
  loadInitDataAction,
  updateLiveDataAction
};
