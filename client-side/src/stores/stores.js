import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import reducer from "../reducers/reducers.js";
import detailReducer from "./detailReducer.js";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const combined = combineReducers({
  movie: reducer,
  detail: detailReducer,
});
const store = createStore(combined, composeEnhancers(applyMiddleware(thunk)));

export default store;
