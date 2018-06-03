import axios from "axios";
import moment from "moment";

export const FETCH_MONTH_TIMESHEETS = "fetch_month_timesheets";
export const ADD_ENTRY = "add_entry";
export const ADD_TIMESHEET_LINE = "add_timesheet_line";
export const CREATE_TIMESHEET = "create_timesheet";
export const EDIT_TIMESHEET = "edit_timesheet";
export const DELETE_TIMESHEET = "delete_timesheet";

const API = "http://localhost:4000";

export function fetchMonthTimesheets() {
  const now = moment();
  const request = axios.get(
    `${API}/timesheets/1/${now.year()}/${now.month() + 1}`
  );

  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_MONTH_TIMESHEETS, payload: data });
    });
  };
}

export function createTimesheet(timesheet, callback) {
  const request = axios.put(`${API}/timesheets/new`, {
    employeeId: timesheet.employeeId,
    workday: timesheet.workday,
    entry_1: timesheet.entry_1,
    entry_2: timesheet.entry_2,
    entry_3: timesheet.entry_3,
    entry_4: timesheet.entry_4
  });

  return dispatch => {
    request.then(() => {
      dispatch({ type: CREATE_TIMESHEET });
      callback();
    });
  };
}

export function addTimesheetLine(timesheet) {
  return {
    type: ADD_TIMESHEET_LINE,
    payload: Object.assign(timesheet, {
      workday: moment().format("DD/MM/YYYY")
    })
  };
}

export function editTimesheet(timesheet, callback) {
  const request = axios.post(`${API}/timesheets/edit`, timesheet);

  return dispatch => {
    request.then(() => {
      dispatch({ type: EDIT_TIMESHEET, payload: timesheet });
      callback();
    });
  };
}

export function deleteTimesheet(timesheet, callback) {
  const request = axios.delete(`${API}/timesheets/delete`, {
    data: {
      id: timesheet.id
    }
  });

  return dispatch => {
    request.then(() => {
      dispatch({ type: DELETE_TIMESHEET });
      callback();
    });
  };
}
