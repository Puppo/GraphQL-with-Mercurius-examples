import { gql } from 'mercurius-codegen'

const schema = gql`
  type Category {
    id: ID!
    name: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    category: Category!
  }

  input PostCreate {
    title: String!
    content: String!
    categoryId: ID!
  }

  type Query {
    getCategories: [Category!]!
    getCategory(id: ID!): Category
    getPosts(offset: Int!, limit: Int!): [Post!]!
    getPost(id: ID!): Post
    getPostsByCategory(categoryId: ID!): [Post!]!
  }

  type Mutation {
    createCategory(name: String!): Category!
    createPost(newPost: PostCreate!): Post!
  }
`

export default schema
