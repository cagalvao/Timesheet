import _ from "lodash";
import { FETCH_MONTH_TIMESHEETS, EDIT_TIMESHEET } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {    
    case FETCH_MONTH_TIMESHEETS:
      return action.payload
    case EDIT_TIMESHEET:      
      return state;
    default:
      return state;
  }
}
