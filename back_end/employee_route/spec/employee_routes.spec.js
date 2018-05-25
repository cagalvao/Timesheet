'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire')
const testingUtils = require('../../utils/testing')

describe('/employee_routes', function () {
  beforeEach(function () {
    testingUtils.hijackMysql()
  })

  afterEach(function () {
    testingUtils.restoreMysql()
  })

  describe('getAllEmployees', function () {
    it('getAllEmployees should return with SUCCESS', function (done) {
      const getEmployees = sinon.stub().resolves([
        {
          id: 1,
          name: 'Heisenberg'
        },
        {
          id: 1,
          name: 'Gus Fring'
        }
      ])

      const route = proxyquire('../employee_routes', {
        './employee_service': {
          getEmployees
        }
      })

      const req = {}

      const res = {
        json: (list) => {
          list.should.deepEqual([
            {
              id: 1,
              name: 'Heisenberg'
            },
            {
              id: 1,
              name: 'Gus Fring'
            }
          ])
          done()
        }
      }

      route.getAllEmployees(req, res)
    })

    it('getAllEmployees should return with NOT FOUND', function (done) {
      const getEmployees = sinon.stub().resolves([])

      const route = proxyquire('../employee_routes', {
        './employee_service': {
          getEmployees
        }
      })

      const req = {}

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.getAllEmployees(req, res)
    })

    it('getAllEmployees should return with ERROR', function (done) {
      const getEmployees = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../employee_routes', {
        './employee_service': {
          getEmployees
        }
      })

      const req = {}

      const res = {
        status: (code) => {
          code.should.be.equal(500)
        },
        send: (error) => {
          error.should.be.equal('generic error')
          done()
        }
      }

      route.getAllEmployees(req, res)
    })
  })

  describe('getEmployeeById', function () {
    it('getEmployeeById should return with SUCCESS', function (done) {
      const getEmployee = sinon.stub().resolves({
        id: 1,
        name: 'Heisenberg'
      })

      const route = proxyquire('../employee_routes', {
        './employee_service': {
          getEmployee
        }
      })

      const req = {
        params: {
          id: 1
        }
      }

      const res = {
        json: (obj) => {
          obj.should.deepEqual({
            id: 1,
            name: 'Heisenberg'
          })
          done()
        }
      }

      route.getEmployeeById(req, res)
    })

    it('getEmployeeById should return with NOT FOUND', function (done) {
      const getEmployee = sinon.stub().resolves({})

      const route = proxyquire('../employee_routes', {
        './employee_service': {
          getEmployee
        }
      })

      const req = {
        params: {
          id: 1
        }
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.getEmployeeById(req, res)
    })

    it('getEmployeeById should return with ERROR', function (done) {
      const getEmployee = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../employee_routes', {
        './employee_service': {
          getEmployee
        }
      })

      const req = {
        params: {
          id: 1
        }
      }

      const res = {
        status: (code) => {
          code.should.be.equal(500)
        },
        send: (error) => {
          error.should.be.equal('generic error')
          done()
        }
      }

      route.getEmployeeById(req, res)
    })
  })
})
