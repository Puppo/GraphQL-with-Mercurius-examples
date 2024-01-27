import { MercuriusLoaders } from 'mercurius'
import { Category, Post } from '../plugins/db'

function createMapById<T extends { id: string }>(items: T[]): Map<string, T> {
  return new Map<string, T>(items.map(item => [item.id, item]))
}

const loaders: MercuriusLoaders = {
  Category: {
    createdBy: async (queries, { app: { db, log } }) => {
      log.info(queries, 'Category.createdBy')
      const categoriesById = createMapById(
        await db.all<Category>(
          `SELECT * FROM category WHERE id IN (${queries.map(({ obj }) => `'${obj.id}'`).join(',')})`
        )
      )
      return queries.map(({ obj: { id } }) => ({
        __typename: 'User',
        id: categoriesById.get(id)!.createdBy
      }))
    },
    posts: async (queries, { app: { db, log } }) => {
      log.info(queries, 'Category.posts')
      const postsByCategory = await db.all<Omit<Post, 'createdBy'> & { category_id: Category['id'] }>(`
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
    createdBy: async (queries, { app: { db, log } }) => {
      log.info(queries, 'Post.createdBy')
      const postsById = createMapById(
        await db.all<Post>(
          `SELECT id, createdBy FROM post WHERE id IN (${queries.map(({ obj }) => `'${obj.id}'`).join(',')})`
        )
      )
      return queries.map(({ obj: { id } }) => ({
        __typename: 'User',
        id: postsById.get(id)!.createdBy
      }))
    },
    category: async (queries, { app: { db, log } }) => {
      log.info(queries, 'Post.category')
      const categoriesByPostId = await db.all<Omit<Category, 'createdBy'> & { post_id: Post['id'] }>(`
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
