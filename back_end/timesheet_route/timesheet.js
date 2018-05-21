const db = require('../utils/db.js')

function getTimesheetsFromDb ({ employee, year, month, day }, callback) {
  const conn = db.createConnection()

  let query = 'select e.name, DATE_FORMAT(w.workday, "%d/%m/%Y") as workday, t.entry_1, t.entry_2, t.entry_3, t.entry_4 from MONO.employee_timesheet et inner join MONO.employee e on e.id = et.id_employee inner join MONO.workday w on w.id = et.id_workday inner join MONO.timesheet t on t.id = et.id_timesheet'

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

  conn.query(query, callback)
  conn.end()
}

module.exports = {
  getTimesheetsFromDb
}
