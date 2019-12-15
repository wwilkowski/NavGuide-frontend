import React from "react";
import { Route, Switch } from "react-router-dom";
import Registration from "./containers/Registration/Registration";
import Header from "./containers/Header/Header";
import TripBrowser from "./containers/TripBrowser/TripBrowser";

const Home = () => <p data-testid="content">HomePage</p>;
const NotFound = () => <p data-testid="content">NotFoundPage</p>;

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
          <TripBrowser />
        </Route>

        <Route component={NotFound} />
      </Switch>
    </>
  );
};

export default App;

//<Route path='/register' component={Registration} />
