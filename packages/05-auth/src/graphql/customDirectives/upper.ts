import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { GraphQLSchema } from 'graphql'

const upperSchemaTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.FIELD]: fieldConfig => {
      if (!('resolve' in fieldConfig)) return null

      const upperDirective = getDirective(schema, fieldConfig, 'upper')?.[0]
      if (!upperDirective) return null
      fieldConfig.resolve = async (obj, _args, _ctx, info) => {
        const value = obj[info.fieldName]
        return typeof value === 'string' ? value.toUpperCase() : value
      }
    }
  })

export default upperSchemaTransformer
