import { legacy_createStore as createStore, applyMiddleware, combineReducers, compose } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { childReducer } from "./reducers/childReducer.js";
import thunk from "redux-thunk";
const reducer = combineReducers({
  movie: rootReducer,
  genre: childReducer,
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
