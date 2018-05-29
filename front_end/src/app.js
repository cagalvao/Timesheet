import React from "react";
import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import TimesheetIndex from "./components/timesheet_index";
import TimesheetNew from "./components/timesheet_new";
import TimesheetShow from "./components/timesheet_show";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/timesheet/new" component={TimesheetNew} />
            <Route path="/timesheet/:id" component={TimesheetShow} />
            <Route path="/" component={TimesheetIndex} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
