import fastify from 'fastify'

export default async function () {
  const app = fastify()
  app.register(import('./server'))

  try {
    const address = await app.listen({
      port: 3000,
      host: '0.0.0.0'
    })
    app.log.info(`🚀 Gateway ready at ${address}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}
