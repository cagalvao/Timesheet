import _ from "lodash";
import { FETCH_MONTH_TIMESHEETS } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    // case DELETE_POST:
    //   return _.omit(state, action.payload);
    // case FETCH_POST:
    //   return { ...state, [action.payload.data.id]: action.payload.data };
    // case FETCH_POSTS:
    //   return _.mapKeys(action.payload.data, "id");
    case FETCH_MONTH_TIMESHEETS:
      return _.mapKeys(action.payload, "id");
    default:
      return state;
  }
}
