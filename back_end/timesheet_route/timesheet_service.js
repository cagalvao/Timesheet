'use strict'
const moment = require('moment')

const db = require('../utils/db')

const { getWorkdayId } = require('../workday_route/workday_service')

async function listTimesheets ({ employee, year, month, day }) {
  if (employee === undefined) {
    await Promise.resolve(undefined)
  }

  let query = getEmployeeTimesheetQueryBeginning()

  if (employee) {
    query += ' where e.id = ' + employee

    if (year) {
      query += ' and YEAR(w.workday) = ' + year

      if (month) {
        query += ' and MONTH(w.workday) = ' + month

        if (day) {
          query += ' and DAY(w.workday) = ' + day
        }
      }
    }
  }

  query += getEmployeeTimesheetQueryEnding()

  const timesheets = await db.query(query)
  return timesheets
}

function getEmployeeTimesheetQueryBeginning () {
  return 'select et.id, e.name, DATE_FORMAT(w.workday, "%d/%m/%Y") as workday, t.entry_1, t.entry_2, t.entry_3, t.entry_4, TIMEDIFF(ADDTIME(TIMEDIFF(t.entry_2, t.entry_1), TIMEDIFF(t.entry_4, t.entry_3)), "08:00:00") as diff, @accDiff := ADDTIME(@accDiff, TIMEDIFF(ADDTIME(TIMEDIFF(t.entry_2, t.entry_1), TIMEDIFF(t.entry_4, t.entry_3)), "08:00:00")) as accDiff from employee_timesheet et inner join employee e on e.id = et.id_employee inner join workday w on w.id = et.id_workday inner join timesheet t on t.id = et.id_timesheet, (select @accDiff := "00:00:00") as t1'
}

function getEmployeeTimesheetQueryEnding () {
  return ' group by et.id order by w.workday desc'
}

async function getEmployeeTimesheetById (employeeTimesheetId) {
  let query = getEmployeeTimesheetQueryBeginning()
  query += ` where et.id = ${employeeTimesheetId}`
  query += getEmployeeTimesheetQueryEnding()

  const timesheet = await db.query(query)

  return timesheet
}

async function insertTimesheetEntries (entry1, entry2, entry3, entry4) {
  const result = await db.query(`INSERT INTO timesheet(entry_1,entry_2, entry_3, entry_4) VALUES ("${entry1}", "${entry2}", "${entry3}","${entry4}")`)

  return result.insertId
}

async function deleteExistentEntries (employeeId, workdayId) {
  await db.query(`DELETE FROM employee_timesheet WHERE id_employee = ${employeeId} and id_workday = ${workdayId}`)
}

async function insertEmployeeTimesheet (workdayId, employeeId, timesheetId) {
  const result = await db.query(`INSERT INTO employee_timesheet (id_workday,id_employee,id_timesheet) VALUES (${workdayId}, ${employeeId}, ${timesheetId})`)

  return result.insertId
}

async function insertTimesheet (timesheet) {
  const { employeeId, entry_1, entry_2, entry_3, entry_4 } = timesheet

  let { workday } = timesheet
  workday = moment(workday, 'DD/MM/YYYY').format('YYYY-MM-DD')

  const workdayId = await getWorkdayId(workday)
  await deleteExistentEntries(employeeId, workdayId)
  const timesheetId = await insertTimesheetEntries(entry_1, entry_2, entry_3, entry_4)
  const employeeTimesheetId = await insertEmployeeTimesheet(workdayId, employeeId, timesheetId)

  const employeeTimesheet = await getEmployeeTimesheetById(employeeTimesheetId)

  return employeeTimesheet[0]
}

async function getTimesheetIdByEmployeeTimesheet (employeeTimesheetId) {
  const results = await db.query(`SELECT id_timesheet FROM employee_timesheet where id = ${employeeTimesheetId}`)

  return results[0].id_timesheet
}

async function updateTimesheet (timesheetId, entry1, entry2, entry3, entry4) {
  const results = await db.query(`UPDATE timesheet SET entry_1 = "${entry1}", entry_2 = "${entry2}", entry_3 = "${entry3}", entry_4 = "${entry4}" WHERE id = ${timesheetId}`)

  return results.affectedRows
}

async function editTimesheet (timesheet) {
  const { id, entry_1, entry_2, entry_3, entry_4 } = timesheet

  const timesheetId = await getTimesheetIdByEmployeeTimesheet(id)

  const affectedRows = await updateTimesheet(timesheetId, entry_1, entry_2, entry_3, entry_4)

  return affectedRows
}

module.exports = {
  listTimesheets,
  insertTimesheet,
  editTimesheet
}
