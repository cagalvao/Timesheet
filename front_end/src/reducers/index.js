import { combineReducers } from "redux";
import TimesheetReducer from "./timesheet_reducer";
import EmployeeReducer from "./employee_reducer"

const rootReducer = combineReducers({
  timesheets: TimesheetReducer,
  employee: EmployeeReducer
});

export default rootReducer;
