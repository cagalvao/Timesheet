import { combineReducers } from "redux";
import TimesheetReducer from "./timesheet_reducer";

const rootReducer = combineReducers({
  timesheets: TimesheetReducer
});

export default rootReducer;
