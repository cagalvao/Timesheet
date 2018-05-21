const db = require('../utils/db.js')

function getEmployeesFromDb (callback) {
  const conn = db.createConnection()

  conn.query('SELECT * FROM MONO.employee', callback)
  conn.end()
}

function getEmployeeFromDb (employee, callback) {
  const conn = db.createConnection()

  conn.query('SELECT * FROM MONO.employee where id = ' + employee, callback)
  conn.end()
}

module.exports = {
  getEmployeesFromDb,
  getEmployeeFromDb
}
