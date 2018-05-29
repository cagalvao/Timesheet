import axios from "axios";

import {  
  FETCH_MONTH_TIMESHEETS,
  FETCH_DAY_TIMESHEETS,
  FETCH_EMPLOYEE,
  CREATE_TIMESHEET
} from './types'

const API = "http://localhost:4000"

export function fetchEmployee() {
  const request = axios.get(`${API}/employees/1`);

  return {
    type: FETCH_EMPLOYEE,
    payload: request
  }
}

export function fetchMonthTimesheets() {
  const now = (new Date())

  // const request = axios.get(`${API}/timesheets/1/${now.getFullYear()}/${now.getMonth()}`);
  const request = axios.get(`${API}/timesheets/1/2018/5`);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_MONTH_TIMESHEETS, payload: data })
    })
  }
}

export function fetchDayTimesheets(employee, year, month, day) {
  const now = (new Date())

  // const request = axios.get(`${API}/timesheets/1/${now.getFullYear()}/${now.getMonth()}/${now.getDate()}`);
  const request = axios.get(`${API}/timesheets/1/2018/5/22`);

  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: FETCH_DAY_TIMESHEETS, payload: data })
    })
  }
}

export function createTimesheet(timesheet, callback) {
  const request = axios.post(`${API}/timesheets/new`, values);
  
  return (dispatch) => {
    request.then(({ data }) => {
      dispatch({ type: CREATE_POST, payload: data })
      callback()
    })
  }
}
