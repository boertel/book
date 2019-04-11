import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Album, Home } from "./views";

import theme from "./theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Switch>
        <Route path="/:album" component={Album} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default styled(App)`
  height: 100%;
`;
