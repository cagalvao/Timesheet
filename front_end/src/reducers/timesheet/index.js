import { FETCH_MONTH_TIMESHEETS, ADD_TIMESHEET_LINE } from "../../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MONTH_TIMESHEETS:
      return action.payload;
    case ADD_TIMESHEET_LINE:
      return [action.payload].concat(state);
    default:
      return state;
  }
}
