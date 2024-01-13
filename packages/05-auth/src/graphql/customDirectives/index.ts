import capitalizeSchemaTransformer from './capitalize'
import upperSchemaTransformer from './upper'

const customDirectives = [upperSchemaTransformer, capitalizeSchemaTransformer]

export default customDirectives
