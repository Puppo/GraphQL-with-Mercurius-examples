import { MercuriusLoaders } from 'mercurius'

const loaders: MercuriusLoaders = {
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
          const categoryId = db.posts.find(p => p.id === id)!.categoryId
          return categoriesById.get(categoryId)!
        })
      )
    }
  }
}

export default loaders
