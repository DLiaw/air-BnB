import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import allSpotImagesReducer from './spotsStore';
import createReviewReducer from "./reviewStore"
import bookingsReducer from "./bookings"

const rootReducer = combineReducers({
  session: sessionReducer,
  spot: allSpotImagesReducer,
  review: createReviewReducer,
  bookings: bookingsReducer,

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
