import { gql } from 'mercurius-codegen'
import mercuriusValidation from 'mercurius-validation'

const schema = gql`
  directive @upper on FIELD_DEFINITION
  directive @capitalize on FIELD_DEFINITION
  ${mercuriusValidation.graphQLTypeDefs}

  type User @key(fields: "id") @extends {
    id: ID! @external
    name: String @external
  }

  type Category @key(fields: "id") {
    id: ID!
    name: String! @upper
    posts: [Post!]!
    createdBy: User
  }

  type Post @key(fields: "id") {
    id: ID!
    title: String! @capitalize
    content: String!
    category: Category!
    createdBy: User
  }

  input PostCreate {
    title: String! @constraint(minLength: 5, maxLength: 50)
    content: String! @constraint(minLength: 10)
    categoryId: ID!
  }

  extend type Query {
    getCategories: [Category!]!
    getCategory(id: ID!): Category
    getPosts(offset: Int!, limit: Int!): [Post!]!
    getPost(id: ID!): Post
    getPostsByCategory(categoryId: ID!): [Post!]!
  }

  extend type Mutation {
    createCategory(name: String!): Category!
    createPost(newPost: PostCreate!): Post!
  }
`

export default schema
