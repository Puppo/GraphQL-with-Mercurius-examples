import fastify from 'fastify'
import logger from './loggerConfig'
import server from './server'

export default async function () {
  const app = fastify({
    logger
  })
  app.register(server)

  try {
    const address = await app.listen({
      port: 3001,
      host: '0.0.0.0'
    })
    app.log.info(`Server BLOG listening at ${address}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
