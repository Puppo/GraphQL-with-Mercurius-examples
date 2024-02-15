'use strict'

import { randomUUID } from 'crypto'
import mercurius from 'mercurius'

export const schema = `
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

export const resolvers = {
  Query: {
    getCategories: (_, __, { app }) => {
      return app.db.all('SELECT * FROM category')
    },
    getCategory: (_parent, args, { app }) => {
      const { id } = args
      return app.db.get('SELECT * FROM category WHERE id=?', [id])
    },
    getPosts: (_parent, args, { app }) => {
      const { offset, limit } = args
      return app.db.all('SELECT * FROM post LIMIT ?,?', [offset, limit])
    },
    getPost: (_parent, args, { app }) => {
      const { id } = args
      return app.db.get('SELECT * FROM post WHERE id=?', [id])
    },
    getPostsByCategory: (_parent, args, { app }) => {
      const { categoryId } = args
      return app.db.all('SELECT * FROM post WHERE categoryId=?', [categoryId])
    }
  },
  Mutation: {
    createCategory: async (_parent, args, { app }) => {
      const { name } = args
      const category = {
        id: randomUUID(),
        name
      }
      await app.db.run('INSERT INTO category (id, name) VALUES (?,?)', [category.id, category.name])
      return category
    },
    createPost: async (_parent, { newPost }, { app }) => {
      const { title, content, categoryId } = newPost
      const category = await app.db.get('SELECT * FROM category WHERE id=?', [categoryId])
      if (!category) {
        throw new mercurius.ErrorWithProps(
          `Category with id ${categoryId} not found`,
          {
            code: 'CATEGORY_NOT_FOUND',
            message: `Category with id ${categoryId} not found`
          },
          200
        )
      }

      const post = {
        id: randomUUID(),
        title,
        content,
        categoryId: category.id
      }
      await app.db.run('INSERT INTO post (id, title, content, categoryId) VALUES (?,?,?,?)', [
        post.id,
        post.title,
        post.content,
        post.categoryId
      ])
      return post
    }
  },
  Category: {
    posts: (category, _, { app: { db } }) =>
      db.all(
        `
      SELECT post.id, post.title, post.content
      FROM post
      WHERE post.categoryId = ?
      ORDER BY post.categoryId
      `,
        [category.id]
      )
  },
  Post: {
    category: (post, _, { app: { db } }) =>
      db.get(
        `
      SELECT category.id, category.name
      FROM category
      INNER JOIN post ON post.categoryId = category.id
      WHERE post.id = ?
      `,
        [post.id]
      )
  }
}
