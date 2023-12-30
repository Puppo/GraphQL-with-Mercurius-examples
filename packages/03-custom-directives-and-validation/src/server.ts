import autoLoad from '@fastify/autoload'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { join } from 'path'

const buildServer = fp(async function buildServer(app: FastifyInstance) {
  app.register(autoLoad, {
    dir: join(__dirname, 'plugins')
  })

  app.register(import('./graphql'))
})

export default buildServer
