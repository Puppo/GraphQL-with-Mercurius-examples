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
      return app.db.categories
    },
    getCategory: (_parent, args, { app }) => {
      const { id } = args
      return app.db.categories.find(category => category.id === id)
    },
    getPosts: (_parent, args, { app }) => {
      const { offset, limit } = args
      return app.db.posts.slice(offset, offset + limit)
    },
    getPost: (_parent, args, { app }) => {
      const { id } = args
      return app.db.posts.find(post => post.id === id)
    },
    getPostsByCategory: (_parent, args, { app }) => {
      const { categoryId } = args
      return app.db.posts.filter(post => post.categoryId === categoryId)
    }
  },
  Mutation: {
    createCategory: (_parent, args, { app }) => {
      const { name } = args
      const category = {
        id: randomUUID(),
        name
      }
      app.db.categories.push(category)
      return category
    },
    createPost: (_parent, { newPost }, { app }) => {
      const { title, content, categoryId } = newPost
      const category = app.db.categories.find(category => category.id === categoryId)
      if (!category) {
        throw new mercurius.ErrorWithProps(
          'message',
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
      app.db.posts.push(post)
      return post
    }
  }
}

export const loaders = {
  Category: {
    posts: (queries, { app: { db } }) => {
      const postsByCategoryId = db.posts.reduce((acc, post) => {
        const { categoryId } = post
        const posts = acc.get(categoryId) || []
        posts.push(post)
        acc.set(categoryId, posts)
        return acc
      }, new Map())
      return Promise.resolve(queries.map(({ obj: { id } }) => postsByCategoryId.get(id) || []))
    }
  },
  Post: {
    category: (queries, { app: { db } }) => {
      const categoriesById = new Map(db.categories.map(category => [category.id, category]))
      return Promise.resolve(
        queries.map(({ obj: { id } }) => {
          const categoryId = db.posts.find(p => p.id === id).categoryId
          return categoriesById.get(categoryId)
        })
      )
    }
  }
}
