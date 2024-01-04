import { mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema, mergeSchemas } from '@graphql-tools/schema'
import { getResolversFromSchema, printSchemaWithDirectives } from '@graphql-tools/utils'
import { buildFederationSchema } from '@mercuriusjs/federation'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import mercurius from 'mercurius'
import mercuriusCodegen from 'mercurius-codegen'
import mercuriusValidation from 'mercurius-validation'

import customDirectives from './customDirectives'
import loaders from './loaders'
import resolvers from './resolvers'
import schema from './schema'

const federationSchema = buildFederationSchema(schema)

const executableSchema = makeExecutableSchema({
  typeDefs: printSchemaWithDirectives(federationSchema),
  resolvers: mergeResolvers([getResolversFromSchema(federationSchema), resolvers])
})

const gqlPlugin = fp(async function gqlPlugin(app: FastifyInstance) {
  await app.register(mercurius, {
    schema: mergeSchemas({
      schemas: [executableSchema, ...customDirectives.map(dir => dir(executableSchema))]
    }),
    loaders,
    graphiql: process.env.NODE_ENV === 'development',
    jit: 1
  })
  app.register(mercuriusValidation)

  app.register(import('./auth'))

  mercuriusCodegen(app, {
    targetPath: './src/blog/graphql/generated.ts'
  }).catch(console.error)
})

export default gqlPlugin
