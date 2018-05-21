'use strict'

const Promise = require('bluebird')
const db = require('../utils/db.js')

const selectQuery = 'select e.name, DATE_FORMAT(w.workday, "%d/%m/%Y") as workday, t.entry_1, t.entry_2, t.entry_3, t.entry_4 from MONO.employee_timesheet et inner join MONO.employee e on e.id = et.id_employee inner join MONO.workday w on w.id = et.id_workday inner join MONO.timesheet t on t.id = et.id_timesheet'

function getEmployeeTimesheet (req, res) {
  Promise.coroutine(function * () {
    const { employee } = req.params
    const conn = db.createConnection()

    const filters = ' where e.id = ' + employee

    conn.query(selectQuery + filters, function (err, rows, field) {
      conn.end()
      if (!err) {
        return res.json(rows)
      }
      console.log(err)
    })
  })()
}

function getEmployeeTimesheetByYear (req, res) {
  Promise.coroutine(function * () {
    const { employee, year } = req.params
    const conn = db.createConnection()

    const filters = ' where e.id = ' + employee + ' and YEAR(w.workday) = ' + year

    conn.query(selectQuery + filters, function (err, rows, field) {
      conn.end()
      if (!err) {
        return res.json(rows)
      }
      console.log(err)
    })
  })()
}

function getEmployeeTimesheetByMonth (req, res) {
  Promise.coroutine(function * () {
    const { employee, year, month } = req.params
    const conn = db.createConnection()

    const filters = ' where e.id = ' + employee + ' and YEAR(w.workday) = ' + year + ' and MONTH(w.workday) = ' + month

    conn.query(selectQuery + filters, function (err, rows, field) {
      conn.end()
      if (!err) {
        return res.json(rows)
      }
      console.log(err)
    })
  })()
}

function getEmployeeTimesheetByDay (req, res) {
  Promise.coroutine(function * () {
    const { employee, year, month, day } = req.params
    const conn = db.createConnection()

    const filters = ' where e.id = ' + employee + ' and YEAR(w.workday) = ' + year + ' and MONTH(w.workday) = ' + month + ' and DAY(w.workday) = ' + day

    conn.query(selectQuery + filters, function (err, rows, field) {
      conn.end()
      if (!err) {
        return res.json(rows)
      }
      console.log(err)
    })
  })()
}

module.exports = {
  getEmployeeTimesheet,
  getEmployeeTimesheetByYear,
  getEmployeeTimesheetByMonth,
  getEmployeeTimesheetByDay
}
