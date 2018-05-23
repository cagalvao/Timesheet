'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire')

require('should-sinon')

describe('/timesheet_route', function () {
  describe('getEmployeeTimesheet', function () {
    it('getEmployeeTimesheet should return with SUCCESS', function (done) {
      const response = [
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        },
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        }
      ]

      const listTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1
        }
      }

      const res = {
        json: (list) => {
          list.should.deepEqual(response)
          done()
        }
      }

      route.getEmployeeTimesheet(req, res)
    })

    it('getEmployeeTimesheet should return with NOT FOUND', function (done) {
      const response = {}

      const listTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1
        }
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.getEmployeeTimesheet(req, res)
    })

    it('getEmployeeTimesheet should return with ERROR', function (done) {
      const listTimesheets = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1
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

      route.getEmployeeTimesheet(req, res)
    })
  })

  describe('getEmployeeTimesheetByYear', function () {
    it('getEmployeeTimesheetByYear should return with SUCCESS', function (done) {
      const response = [
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        },
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        }
      ]

      const listTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018
        }
      }

      const res = {
        json: (list) => {
          list.should.deepEqual(response)
          done()
        }
      }

      route.getEmployeeTimesheetByYear(req, res)
    })

    it('getEmployeeTimesheetByYear should return with NOT FOUND', function (done) {
      const response = {}

      const listTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018
        }
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.getEmployeeTimesheetByYear(req, res)
    })

    it('getEmployeeTimesheetByYear should return with ERROR', function (done) {
      const listTimesheets = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018
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

      route.getEmployeeTimesheetByYear(req, res)
    })
  })

  describe('getEmployeeTimesheetByMonth', function () {
    it('getEmployeeTimesheetByMonth should return with SUCCESS', function (done) {
      const response = [
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        },
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        }
      ]

      const listTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5
        }
      }

      const res = {
        json: (list) => {
          list.should.deepEqual(response)
          done()
        }
      }

      route.getEmployeeTimesheetByMonth(req, res)
    })

    it('getEmployeeTimesheetByMonth should return with NOT FOUND', function (done) {
      const response = {}

      const listTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5
        }
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.getEmployeeTimesheetByMonth(req, res)
    })

    it('getEmployeeTimesheetByMonth should return with ERROR', function (done) {
      const listTimesheets = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5
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

      route.getEmployeeTimesheetByMonth(req, res)
    })
  })

  describe('getEmployeeTimesheetByDay', function () {
    it('getEmployeeTimesheetByDay should return with SUCCESS', function (done) {
      const response = [
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        },
        {
          name: 'Cássio Galvão',
          workday: '21/05/2018',
          entry_1: '10:36:16',
          entry_2: '12:12:41',
          entry_3: '13:07:33',
          entry_4: '19:15:19'
        }
      ]

      const listTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5,
          day: 22
        }
      }

      const res = {
        json: (list) => {
          list.should.deepEqual(response)
          done()
        }
      }

      route.getEmployeeTimesheetByDay(req, res)
    })

    it('getEmployeeTimesheetByDay should return with NOT FOUND', function (done) {
      const response = {}

      const listTimesheets = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5,
          day: 22
        }
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.getEmployeeTimesheetByDay(req, res)
    })

    it('getEmployeeTimesheetByDay should return with ERROR', function (done) {
      const listTimesheets = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          listTimesheets
        }
      })

      const req = {
        params: {
          employee: 1,
          year: 2018,
          month: 5,
          day: 22
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

      route.getEmployeeTimesheetByDay(req, res)
    })
  })

  describe('insertTimesheet', function () {
    it('insertTimesheet should return with SUCCESS', function (done) {
      const response = {
        name: 'Cássio Galvão',
        workday: '04/06/2018',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }

      const body = {
        employeeId: 1,
        workday: '2018-06-04',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }

      const insertTimesheet = sinon.stub().resolves(response)

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          insertTimesheet
        }
      })

      const req = {
        body
      }

      const res = {
        json: (list) => {
          list.should.deepEqual(response)
          done()
        }
      }
      route.insertTimesheet(req, res)
    })

    it('insertTimesheet should return with ERROR', function (done) {
      const body = {
        employeeId: 1,
        workday: '2018-06-04',
        entry_1: '10:16:16',
        entry_2: '12:12:41',
        entry_3: '13:27:33',
        entry_4: '19:15:19'
      }

      const insertTimesheet = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../timesheet_routes', {
        './timesheet_service': {
          insertTimesheet
        }
      })

      const req = {
        body
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

      route.insertTimesheet(req, res)
    })
  })
})