'use strict'
const moment = require('moment')

const db = require('../utils/db')

const { getWorkdayId } = require('../workday_route/workday_service')

async function getTimesheets ({ employee, year, month, day }) {
  if (employee === undefined) {
    await Promise.resolve(undefined)
  }

  let query = getTimesheetQueryBeginning()

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

  query += getTimesheetQueryEnding()

  const timesheets = await db.query(query)
  return timesheets
}

function getTimesheetQueryBeginning () {
  return 'select et.id, e.id as employeeId, e.name as employeeName, w.id as workdayId, DATE_FORMAT(w.workday, "%d/%m/%Y") as workday, et.entry_1, et.entry_2, et.entry_3, et.entry_4, TIMEDIFF(ADDTIME(TIMEDIFF(et.entry_2, et.entry_1), TIMEDIFF(et.entry_4, et.entry_3)), "08:00:00") as diff, @accDiff := ADDTIME(@accDiff, TIMEDIFF(ADDTIME(TIMEDIFF(et.entry_2, et.entry_1), TIMEDIFF(et.entry_4, et.entry_3)), "08:00:00")) as accDiff from timesheet et inner join employee e on e.id = et.id_employee inner join workday w on w.id = et.id_workday, (select @accDiff := "00:00:00") as t1'
}

function getTimesheetQueryEnding () {
  return ' group by et.id order by w.workday desc'
}

async function getTimesheetById (timesheetId) {
  let query = getTimesheetQueryBeginning()
  query += ` where et.id = ${timesheetId}`
  query += getTimesheetQueryEnding()

  const timesheet = await db.query(query)

  return timesheet[0]
}

async function deleteExistentEntries (employeeId, workdayId) {
  await db.query(`DELETE FROM timesheet WHERE id_employee = ${employeeId} and id_workday = ${workdayId}`)
}

async function insertTimesheetObject (workdayId, employeeId, entry1, entry2, entry3, entry4) {
  const result = await db.query(`INSERT INTO timesheet (id_workday, id_employee, entry_1, entry_2, entry_3, entry_4) VALUES (${workdayId}, ${employeeId}, "${entry1}", "${entry2}", "${entry3}","${entry4}")`)

  return result.affectedRows
}

async function insertTimesheet (timesheet) {
  const { employeeId, entry_1, entry_2, entry_3, entry_4 } = timesheet

  const workdayId = await getWorkdayId(moment(timesheet.workday, 'DD/MM/YYYY').format('YYYY-MM-DD'))
  await deleteExistentEntries(employeeId, workdayId)

  const result = await insertTimesheetObject(workdayId, employeeId, entry_1, entry_2, entry_3, entry_4)

  return result
}

async function updateTimesheet (id, entry1, entry2, entry3, entry4) {
  const result = await db.query(`UPDATE timesheet SET entry_1 = "${entry1}", entry_2 = "${entry2}", entry_3 = "${entry3}", entry_4 = "${entry4}" WHERE id = ${id}`)

  return result.affectedRows
}

async function editTimesheet (timesheet) {
  const { id, entry_1, entry_2, entry_3, entry_4 } = timesheet

  const affectedRows = await updateTimesheet(id, entry_1, entry_2, entry_3, entry_4)

  return affectedRows
}

async function addTimesheetEntry (id, employeeId, workday, entry) {
  const workdayId = await getWorkdayId(moment(workday, 'DD/MM/YYYY').format('YYYY-MM-DD'))

  if (!id) {
    const result = await db.query(`INSERT INTO timesheet (id_workday, id_employee, entry_1) VALUES (${workdayId}, ${employeeId}, "${entry}")`)
    return result.affectedRows
  }

  const timesheet = await getTimesheetById(id)

  if (!timesheet.entry_2) {
    const result = await db.query(`UPDATE timesheet SET entry_2 = "${entry}" where id = ${id}`)
    return result.affectedRows
  }

  if (!timesheet.entry_3) {
    const result = await db.query(`UPDATE timesheet SET entry_3 = "${entry}" where id = ${id}`)
    return result.affectedRows
  }

  if (!timesheet.entry_4) {
    const result = await db.query(`UPDATE timesheet SET entry_4 = "${entry}" where id = ${id}`)
    return result.affectedRows
  }

  return 0
}

async function deleteTimesheet (id) {
  const result = await db.query(`delete from timesheet where id = ${id}`)

  return result.affectedRows
}

module.exports = {
  getTimesheets,
  insertTimesheet,
  editTimesheet,
  addTimesheetEntry,
  deleteTimesheet
}
