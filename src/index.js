import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from "react-dom";
import { store, persistor } from "./store";
import "./index.scss";

import WidgetContainer from "./containers/widgetContainer";
import { WebSocketService } from "./services/WebSocketService";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <WebSocketService />
      <WidgetContainer />
    </PersistGate>
  </Provider>,
  rootElement
);
