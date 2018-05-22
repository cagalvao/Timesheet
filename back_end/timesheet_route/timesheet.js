const db = require('../utils/db')

const employeeTimesheetQuery = 'select e.name, DATE_FORMAT(w.workday, "%d/%m/%Y") as workday, t.entry_1, t.entry_2, t.entry_3, t.entry_4 from MONO.employee_timesheet et inner join MONO.employee e on e.id = et.id_employee inner join MONO.workday w on w.id = et.id_workday inner join MONO.timesheet t on t.id = et.id_timesheet'

async function listTimesheets ({ employee, year, month, day }) {
  let query = employeeTimesheetQuery

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

  const timesheets = await db.query(query)

  return timesheets
}

async function getEmployeeTimesheetById (employeeTimesheetId) {
  const query = `${employeeTimesheetQuery} where et.id = ${employeeTimesheetId}`
  const employeeTimesheet = await db.query(query)

  return employeeTimesheet
}

async function getWorkdayId (workday) {
  const result = await db.query(`SELECT id FROM MONO.workday where workday = "${workday}"`)

  if (result.length > 0 && result[0].id) {
    return result[0].id
  } else {
    const id = await insertWorkday(workday)
    return id
  }
}

async function insertWorkday (workday) {
  const result = await db.query(`INSERT INTO MONO.workday (workday) VALUES ("${workday}")`)

  return result.insertId
}

async function insertTimesheetEntries (entry1, entry2, entry3, entry4) {
  const result = await db.query(`INSERT INTO MONO.timesheet(entry_1,entry_2, entry_3, entry_4) VALUES ("${entry1}", "${entry2}", "${entry3}","${entry4}")`)

  return result.insertId
}

async function deleteExistentEntries (employeeId, workdayId) {
  await db.query(`DELETE FROM MONO.employee_timesheet WHERE id_employee = ${employeeId} and id_workday = ${workdayId}`)
}

async function insertEmployeeTimesheet (workdayId, employeeId, timesheetId) {
  const result = await db.query(`INSERT INTO MONO.employee_timesheet (id_workday,id_employee,id_timesheet) VALUES (${workdayId}, ${employeeId}, ${timesheetId})`)

  return result.insertId
}

async function insertTimesheet (timesheet) {
  const { employeeId, workday, entry_1, entry_2, entry_3, entry_4 } = timesheet

  const workdayId = await getWorkdayId(workday)
  await deleteExistentEntries(employeeId, workdayId)
  const timesheetId = await insertTimesheetEntries(entry_1, entry_2, entry_3, entry_4)
  const employeeTimesheetId = await insertEmployeeTimesheet(workdayId, employeeId, timesheetId)

  const employeeTimesheet = await getEmployeeTimesheetById(employeeTimesheetId)

  return employeeTimesheet
}

module.exports = {
  listTimesheets,
  insertTimesheet
}
