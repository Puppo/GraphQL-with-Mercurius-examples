import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import mercurius from 'mercurius'
import mercuriusCodegen from 'mercurius-codegen'
import mercuriusValidation from 'mercurius-validation'

import { GraphQLSchema } from 'graphql'
import customDirectives from './customDirectives'
import loaders from './loaders'
import resolvers from './resolvers'
import typeDefs from './schema'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const gqlPlugin = fp(async function gqlPlugin(app: FastifyInstance) {
  await app.register(mercurius, {
    schema: customDirectives.reduce<GraphQLSchema>(
      (schema, dir) =>
        mergeSchemas({
          schemas: [schema, dir(schema)]
        }),
      schema
    ),
    loaders,
    graphiql: process.env.NODE_ENV === 'development'
  })
  app.register(mercuriusValidation)

  mercuriusCodegen(app, {
    targetPath: './src/graphql/generated.ts'
  }).catch(console.error)
})

export default gqlPlugin
