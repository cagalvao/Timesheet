import { combineReducers } from "redux";
import TimesheetReducer from "./timesheet";

const rootReducer = combineReducers({
  timesheets: TimesheetReducer
});

export default rootReducer;
