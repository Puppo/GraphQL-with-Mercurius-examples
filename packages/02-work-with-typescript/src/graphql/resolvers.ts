import { randomUUID } from 'crypto'
import { ErrorWithProps, IResolvers } from 'mercurius'
import { Category } from './generated'
import type { Mutation, Query } from './utils'

const Query = {
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
} satisfies Query

const Mutation = {
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
    const category = await app.db.get<Category>('SELECT * FROM category WHERE id=?', [categoryId])
    if (!category) {
      throw new ErrorWithProps(
        `Category with id ${categoryId} not found`,
        {
          code: 'CATEGORY_NOT_FOUND',
          message: `Category with id ${categoryId} not found`
        },
        404
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
} satisfies Mutation

const resolvers: IResolvers = {
  Query,
  Mutation
}

export default resolvers
