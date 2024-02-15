'use strict'

import autoLoad from '@fastify/autoload'
import { join } from 'desm'
import mercurius from 'mercurius'
import { resolvers, schema } from './graphQL.js'

export async function buildServer(app) {
  app.register(autoLoad, {
    dir: join(import.meta.url, 'plugins')
  })

  app.register(mercurius, {
    schema,
    resolvers,
    graphiql: true
  })
}
