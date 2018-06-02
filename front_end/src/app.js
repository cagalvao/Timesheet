import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import TimesheetIndex from "./components/timesheet_index";

const App = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={TimesheetIndex} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
