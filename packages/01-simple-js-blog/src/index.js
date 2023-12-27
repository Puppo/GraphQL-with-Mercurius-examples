'use strict'

import fastify from 'fastify'

import { buildServer } from './server.js'

function main() {
  const app = fastify({
    logger: 'pretty'
  })
  app.register(buildServer)
  app.listen(
    {
      port: 3000,
      host: '0.0.0.0'
    },
    err => {
      if (err) {
        app.log.error(err)
        process.exit(1)
      }
    }
  )
}

main()
