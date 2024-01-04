import { MercuriusLoaders } from 'mercurius'
import { mapCategory } from './mappers'

const loaders: MercuriusLoaders = {
  Category: {
    createdBy: async (queries, { app: { dbBlog, log } }) => {
      log.info(queries, 'Category.createdBy')
      const categoriesById = new Map(dbBlog.categories.map(category => [category.id, category]))
      return queries.map(({ obj: { id } }) => {
        const dbCategory = categoriesById.get(id)!
        return {
          __typename: 'User',
          id: dbCategory.createdBy
        }
      })
    },
    posts: async (queries, { app: { dbBlog: db, log } }) => {
      log.info(queries, 'Category.posts')
      const postsByCategoryId = db.posts.reduce((acc, post) => {
        const { categoryId } = post
        const posts = acc.get(categoryId) || []
        posts.push(post)
        acc.set(categoryId, posts)
        return acc
      }, new Map())
      return queries.map(({ obj: { id } }) => postsByCategoryId.get(id) || [])
    }
  },
  Post: {
    createdBy: async (queries, { app: { dbBlog, log } }) => {
      log.info(queries, 'Post.createdBy')
      const postsById = new Map(dbBlog.posts.map(post => [post.id, post]))
      return queries.map(({ obj: { id } }) => {
        const dbPost = postsById.get(id)!
        return {
          __typename: 'User',
          id: dbPost.createdBy
        }
      })
    },
    category: async (queries, { app: { dbBlog: db, log } }) => {
      log.info(queries, 'Post.category')
      const categoriesById = new Map(db.categories.map(category => [category.id, category]))
      return queries.map(({ obj: { id } }) => {
        const { categoryId } = db.posts.find(p => p.id === id)!
        return mapCategory(categoriesById.get(categoryId)!)
      })
    }
  }
}

export default loaders
