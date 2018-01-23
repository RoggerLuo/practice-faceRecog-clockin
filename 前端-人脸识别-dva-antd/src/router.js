import React from 'react';
import { Router, Route } from 'dva/router';
import IndexPage from './routes/IndexPage';
import AppList from "./routes/AppList";
import Person from "./routes/Person";
import recognition from "./routes/recognition";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={IndexPage} />
      <Route path="/people" component={AppList} />
      <Route path="/person" component={Person} />
      <Route path="/recognition" component={recognition} />
    </Router>
  );
}

export default RouterConfig;
