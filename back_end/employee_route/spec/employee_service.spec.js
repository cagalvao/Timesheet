'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire')
const Promise = require('bluebird')
const testingUtils = require('../../utils/testing')

require('should-sinon')

describe('/employee_service', function () {
  beforeEach(function () {
    testingUtils.hijackMysql()
  })

  afterEach(function () {
    testingUtils.restoreMysql()
  })

  describe('getEmployees', function () {
    it('getEmployees should return with SUCCESS', function (done) {
      const response = [
        {
          id: 1,
          name: 'Heisenberg'
        },
        {
          id: 1,
          name: 'Gus Fring'
        }
      ]

      const service = proxyquire('../employee_service', {
        '../utils/db': {
          query: sinon.stub().resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const employees = yield service.getEmployees()
        employees.should.deepEqual(response)

        done()
      })()
    })
  })

  describe('getEmployee', function () {
    it('getEmployee should return with SUCCESS', function (done) {
      const response = [
        {
          id: 1,
          name: 'Heisenberg'
        }
      ]

      const employeeId = 2

      const service = proxyquire('../employee_service', {
        '../utils/db': {
          query: sinon.stub().resolves(response)
        }
      })

      Promise.coroutine(function * () {
        const employee = yield service.getEmployee(employeeId)
        employee.should.deepEqual(response[0])

        done()
      })()
    })
  })
})
