import { MercuriusLoaders } from 'mercurius'
import { Category, Post } from './generated'

const loaders: MercuriusLoaders = {
  Category: {
    posts: async (queries, { app: { db } }) => {
      const postsByCategory = await db.all<Post & { category_id: Category['id'] }>(`
SELECT post.categoryId as category_id, post.id, post.title, post.content
FROM post
INNER JOIN category ON category.id = post.categoryId
WHERE category.id IN (${queries.map(({ obj: { id } }) => `'${id}'`).join(',')})
ORDER BY category.id
`)
      return queries.map(({ obj: { id } }) => postsByCategory.filter(({ category_id }) => category_id === id))
    }
  },
  Post: {
    category: async (queries, { app: { db } }) => {
      const categoriesByPostId = await db.all<Category & { post_id: Post['id'] }>(`
SELECT post.id as post_id, category.id, category.name
FROM category
INNER JOIN post ON post.categoryId = category.id
WHERE post.id IN (${queries.map(({ obj: { id } }) => `'${id}'`).join(',')})
`)
      return queries.map(({ obj: { id } }) => categoriesByPostId.find(({ post_id }) => post_id === id)!)
    }
  }
}

export default loaders
