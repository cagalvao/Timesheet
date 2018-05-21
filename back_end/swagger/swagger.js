const resolve = require('json-refs').resolveRefs
const fs = require('fs')

function generateSwagger () {
  let getIndex = require('./index.js').getSwaggerBase

  resolve(getIndex(__dirname), { filter: ['relative', 'remote'] }).then((results) => {
    fs.writeFileSync(__dirname.concat('/doc/swagger.json'),
      JSON.stringify(results.resolved, null, 2))
  })
}

generateSwagger()
