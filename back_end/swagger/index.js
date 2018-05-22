'use strict'
function getSwaggerBase (basePath) {
  return {
    swagger: '2.0',
    info: {
      title: 'Timesheet',
      description: 'Endpoints para a API da aplicação de Monografia, Timesheet',
      version: '1.0.0'
    },
    basePath: '/',
    host: 'localhost:4000',
    paths: {
      $ref: basePath + '/paths.json'
    },
    definitions: {
      $ref: basePath + '/definitions.json'
    }
  }
}

module.exports = {
  getSwaggerBase
}
