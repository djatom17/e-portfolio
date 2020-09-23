// A store holds the whole state tree of the application.
// The only way to change the state inside it is to dispatch an action on it.

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/index";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ["auth", "user"],
};
const pReducer = persistReducer(persistConfig, rootReducer);
//export const store = createStore(pReducer);
//export const persistor = persistStore(store);

const initialState = {};

const middleware = [thunk];
export const store = createStore(
  pReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export const persistor = persistStore(store);
