import fastify from 'fastify'
import logger from './loggerConfig'
import server from './server'

async function main() {
  const app = fastify({
    logger
  })
  app.register(server)

  app.listen(
    {
      port: 3000,
      host: '0.0.0.0'
    },
    (err, address) => {
      if (err) {
        app.log.error(err)
        process.exit(1)
      }
      app.log.info(`Server listening at ${address}`)
    }
  )
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
