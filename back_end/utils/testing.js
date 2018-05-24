'use strict'
const mockMysql = require('horaa')('mysql')

function hijackMysql () {
  mockMysql.hijack('createPool', function () {
    return {
      getConnection: function () {},
      query: function () {}
    }
  })
}

function restoreMysql () {
  mockMysql.restore('createPool')
}

module.exports = {
  hijackMysql,
  restoreMysql
}
