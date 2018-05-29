import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import TimesheetReducer from "./timesheet";

const rootReducer = combineReducers({
  timesheets: TimesheetReducer,
  form: formReducer
});

export default rootReducer;
