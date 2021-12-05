import { createStore, combineReducers } from "redux";
import widgetContainerReducer from "./reducers/widgetContainerReducer"; 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootRuducer = combineReducers({
  widgetReducer: widgetContainerReducer
});
 
const persistedReducer = persistReducer(persistConfig, rootRuducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
