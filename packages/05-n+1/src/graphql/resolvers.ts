import { randomUUID } from 'crypto'
import { ErrorWithProps, IResolvers } from 'mercurius'
import type { Mutation, Query } from './utils'

const Query = {
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
} satisfies Query

const Mutation = {
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
      categoryId: category.id
    }
    app.db.posts.push(post)
    return post
  }
} satisfies Mutation

const resolvers: IResolvers = {
  Query,
  Mutation,
  Category: {
    posts: (category, _, { app: { db, log } }) => {
      log.info({ category }, 'Resolvers Category.posts')
      return Promise.resolve(db.posts.filter(post => post.categoryId === category.id))
    }
  },
  Post: {
    category: (post, _, { app: { db, log } }) => {
      log.info({ post }, 'Resolvers Post.category')
      const dbPost = db.posts.find(p => p.id === post.id)
      const { categoryId } = dbPost!
      return Promise.resolve(db.categories.find(category => category.id === categoryId)!)
    }
  }
}

export default resolvers
