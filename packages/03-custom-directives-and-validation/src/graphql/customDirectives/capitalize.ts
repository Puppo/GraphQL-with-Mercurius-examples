import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { GraphQLSchema } from 'graphql'

function capitalize(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const capitalizeSchemaTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.FIELD]: fieldConfig => {
      if (!('resolve' in fieldConfig)) return null

      const capitalizeDirective = getDirective(schema, fieldConfig, 'capitalize')?.[0]
      if (!capitalizeDirective) return null
      fieldConfig.resolve = async (obj, _args, _ctx, info) => {
        const value = obj[info.fieldName]
        return typeof value === 'string' ? capitalize(value) : value
      }
    }
  })

export default capitalizeSchemaTransformer
