// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupForm from "./components/SignupFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpotImage from "./components/AllSpotsImages";
import SpotDetail from "./components/GetSpotById";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <AllSpotImage />
          </Route>
          <Route path='/spots/:spotId'>
            <SpotDetail />
          </Route>
        </Switch>
      )
      }
    </>
  );
}

export default App;


// spot ={spot} pass it in as a prop from another component
