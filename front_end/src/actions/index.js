import axios from "axios";
import moment from "moment";

import {
  FETCH_MONTH_TIMESHEETS,
  FETCH_EMPLOYEE,
  ADD_TIMESHEET,
  CREATE_TIMESHEET,
  EDIT_TIMESHEET
} from "./types";

const API = "http://localhost:4000";

function fetchEmployee() {
  const request = axios.get(`${API}/employees/1`);

  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_EMPLOYEE, payload: data });
    });
  };
}

function fetchMonthTimesheets() {
  const now = moment()
  const request = axios.get(`${API}/timesheets/1/${now.year()}/${now.month()}`);

  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_MONTH_TIMESHEETS, payload: data });
    });
  };
}

function createTimesheet(timesheet, callback) {
  const request = axios.post(`${API}/timesheets/new`, {
    employeeId: timesheet.employeeId,
    workday: timesheet.workday,
    entry_1: timesheet.entry_1,
    entry_2: timesheet.entry_2,
    entry_3: timesheet.entry_3,
    entry_4: timesheet.entry_4
  });

  return dispatch => {
    request.then(({ data }) => {
      dispatch({ type: CREATE_TIMESHEET, payload: data });
      callback();
    });
  };
}

function addTimesheet(timesheet) {
  return { type: ADD_TIMESHEET, payload: timesheet }
}

function editTimesheet(timesheet, callback) {
  const request = axios.post(`${API}/timesheets/edit`, timesheet);

  return dispatch => {
    request.then(() => {
      dispatch({ type: EDIT_TIMESHEET, payload: timesheet });
      callback();
    });
  };
}

module.exports = {
  fetchEmployee,
  fetchMonthTimesheets,
  addTimesheet,
  createTimesheet,
  editTimesheet
};
