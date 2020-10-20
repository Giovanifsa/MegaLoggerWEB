import React from 'react';
import LoginPage from './loginPage/LoginPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { RouteEnum } from "../servicing/RouteManager";

function App() {
    return (
      <BrowserRouter>
          <Switch>
              <Route path={RouteEnum.login}>
                  <LoginPage title={'teste'} />
              </Route>
          </Switch>
      </BrowserRouter>
    );
}

export default App;
