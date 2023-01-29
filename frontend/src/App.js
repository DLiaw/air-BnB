// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpotImage from "./components/LandingPage";
import SpotDetail from "./components/SpotDetail";
import CreateASpot from "./components/NewSpot";
import EditASpot from "./components/UpdateSpot";
import UserBookings from "./components/UserBookings"



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
          <Route exact path='/spots/new'>
            <CreateASpot />
          </Route>
          <Route exact path='/spots/:spotId'>
            <SpotDetail />
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <EditASpot />
          </Route>
          <Route exact path='/:userId/bookings'>
            <UserBookings />
          </Route>
        </Switch>
      )
      }
    </>
  );
}

export default App;


// spot ={spot} pass it in as a prop from another component
