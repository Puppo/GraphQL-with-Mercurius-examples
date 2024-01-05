import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import mercurius from 'mercurius'
import mercuriusCodegen from 'mercurius-codegen'

// import loaders from './loaders'
import resolvers from './resolvers'
import schema from './schema'

const gqlPlugin = fp(async function gqlPlugin(app: FastifyInstance) {
  await app.register(mercurius, {
    schema,
    resolvers,
    // loaders,
    graphiql: process.env.NODE_ENV === 'development'
  })

  mercuriusCodegen(app, {
    targetPath: './src/graphql/generated.ts'
  }).catch(console.error)
})

export default gqlPlugin
