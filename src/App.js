import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

import Home from './containers/Home';
import WalletTransactions from './containers/WalletTransactions';
import NotFound404 from './containers/NotFound404';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />

          <PrivateRoute
            exact
            path="/transactions"
            component={WalletTransactions}
          ></PrivateRoute>

          <Route component={NotFound404} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
