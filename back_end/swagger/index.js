
function getSwaggerBase (basePath) {
  return {
    swagger: '2.0',
    info: {
      title: 'UVA Mono',
      description: 'Endpoints para a API da aplicação de Monografia',
      version: '1.0.0'
    },
    basePath: '/',
    host: 'localhost:4000',
    paths: {
      $ref: basePath + '/paths.json'
    },
    securityDefinitions: {
      Authorization: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    definitions: {
      $ref: basePath + '/definitions.json'
    }
  }
}

module.exports = {
  getSwaggerBase
}
