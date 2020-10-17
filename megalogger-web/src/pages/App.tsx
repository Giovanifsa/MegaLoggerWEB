import React from 'react';
import LoginPage from './LoginPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
    return (
      <BrowserRouter>
          <Switch>
              <Route path="/login">
                  <LoginPage title={'teste'} />
              </Route>
          </Switch>
      </BrowserRouter>
    );
}

export default App;
