import React from "react";
import { globalHistory, Router } from "@reach/router";
import { QueryParamProvider } from "use-query-params";

import { Album, Home, Page, Viewer } from "./views";

const App = () => (
  <QueryParamProvider reachHistory={globalHistory}>
    <Router>
      <Album path="/:name">
        <Page path=":index">
          <Viewer path=":block" />
        </Page>
      </Album>
      <Home path="/" />
  </Router>
    </QueryParamProvider>
);

export default App;
