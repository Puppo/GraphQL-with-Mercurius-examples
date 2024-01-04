import { gql } from 'mercurius-codegen'

const schema = gql`
  type User @key(fields: "id") {
    id: ID!
    name: String!
  }

  type SignUpPayload {
    user: User!
    token: String!
  }

  extend type Query {
    signIn(name: String!, password: String!): SignUpPayload!
    getUserById(id: ID!): User
    getUsersByIds(ids: [ID!]!): [User!]!
  }
`

export default schema
