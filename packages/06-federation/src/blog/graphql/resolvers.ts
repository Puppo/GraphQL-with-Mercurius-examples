import { randomUUID } from 'crypto'
import { ErrorWithProps, IResolvers } from 'mercurius'
import { mapCategory, mapPost } from './mappers'
import type { Mutation, Query } from './utils'

const Query = {
  getCategories: async (_, __, { app }) => {
    return app.dbBlog.categories.map(mapCategory)
  },
  getCategory: async (_parent, args, { app }) => {
    const { id } = args
    const category = app.dbBlog.categories.find(category => category.id === id)
    if (!category) return null
    return mapCategory(category)
  },
  getPosts: async (_parent, args, { app }) => {
    const { offset, limit } = args
    return app.dbBlog.posts.slice(offset, offset + limit).map(mapPost)
  },
  getPost: async (_parent, args, { app }) => {
    const { id } = args
    const post = app.dbBlog.posts.find(post => post.id === id)
    if (!post) return null
    return mapPost(post)
  },
  getPostsByCategory: async (_parent, args, { app }) => {
    const { categoryId } = args
    return app.dbBlog.posts.filter(post => post.categoryId === categoryId).map(mapPost)
  }
} satisfies Query

const Mutation = {
  createCategory: async (_parent, args, { app: { dbBlog }, auth }) => {
    const { id } = auth!
    const { name } = args
    const category = {
      id: randomUUID(),
      name,
      createdBy: id
    }
    dbBlog.categories.push(category)
    return mapCategory(category)
  },
  createPost: async (_parent, { newPost }, { app: { dbBlog }, auth }) => {
    const { id } = auth!
    const { title, content, categoryId } = newPost
    const category = dbBlog.categories.find(category => category.id === categoryId)
    if (!category) {
      throw new ErrorWithProps(
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
      categoryId: category.id,
      createdBy: id
    }
    dbBlog.posts.push(post)
    return mapPost(post)
  }
} satisfies Mutation

const resolvers = {
  Query,
  Mutation
} satisfies IResolvers

export default resolvers
