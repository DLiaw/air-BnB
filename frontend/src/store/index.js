import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import allSpotImagesReducer from './allspots'
import createASpotReducer from './CreateASpotStore'
import editASpotReducer from "./editASpotStore";

const rootReducer = combineReducers({
  session: sessionReducer,
  spot: allSpotImagesReducer,
  newSpot: createASpotReducer,
  editSpot: editASpotReducer

});
// reducers can be passed as props
let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
