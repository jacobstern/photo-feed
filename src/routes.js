import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './app';
import Favorites from './containers/favorites';
import Feed from './containers/feed';

const Routes = () => (
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Feed} />
      <Route path='favorites' component={Favorites} />
    </Route>
  </Router>
);

export default Routes;
