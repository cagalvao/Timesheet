'use strict'

const sinon = require('sinon')
const proxyquire = require('proxyquire')

require('should-sinon')

describe('/workday_routes', function () {
  describe('getAllWorkdays', function () {
    it('getAllWorkdays should return with SUCCESS', function (done) {
      const response = [
        {
          id: 11,
          workday: '21/05/2018'
        },
        {
          id: 12,
          workday: '22/05/2018'
        },
        {
          id: 13,
          workday: '23/05/2018'
        }
      ]

      const listWorkdays = sinon.stub().resolves(response)

      const route = proxyquire('../workday_routes', {
        './workday_service': {
          listWorkdays
        }
      })

      const req = {}

      const res = {
        json: (list) => {
          list.should.deepEqual(response)
          done()
        }
      }

      route.getAllWorkdays(req, res)
    })

    it('getAllWorkdays should return with NOT FOUND', function (done) {
      const response = {}

      const listWorkdays = sinon.stub().resolves(response)

      const route = proxyquire('../workday_routes', {
        './workday_service': {
          listWorkdays
        }
      })

      const req = {}

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.getAllWorkdays(req, res)
    })

    it('getAllWorkdays should return with ERROR', function (done) {
      const listWorkdays = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../workday_routes', {
        './workday_service': {
          listWorkdays
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

      route.getAllWorkdays(req, res)
    })
  })

  describe('insertWorkday', function () {
    it('insertWorkday should return with SUCCESS', function (done) {
      const response = {
        id: 34,
        workday: '08/12/2018'
      }

      const body = {
        workday: '2018-12-08'
      }

      const insertWorkday = sinon.stub().resolves(response)

      const route = proxyquire('../workday_routes', {
        './workday_service': {
          insertWorkday
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
      route.insertWorkday(req, res)
    })

    it('insertWorkday should return with NOT FOUND', function (done) {
      const response = {}

      const body = {
        workday: '2018-12-08'
      }

      const insertWorkday = sinon.stub().resolves(response)

      const route = proxyquire('../workday_routes', {
        './workday_service': {
          insertWorkday
        }
      })

      const req = {
        body
      }

      const res = {
        sendStatus: (code) => {
          code.should.be.equal(404)
          done()
        }
      }

      route.insertWorkday(req, res)
    })

    it('insertWorkday should return with ERROR', function (done) {
      const body = {
        workday: '2018-12-08'
      }

      const insertWorkday = sinon.stub().rejects(Error('generic error'))

      const route = proxyquire('../workday_routes', {
        './workday_service': {
          insertWorkday
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

      route.insertWorkday(req, res)
    })
  })
})
