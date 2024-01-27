import fp from 'fastify-plugin'
import { AsyncDatabase } from 'promised-sqlite3'
import sql from 'sqlite3'

const sqlite = sql.verbose()

type Category = {
  id: string
  name: string
}

type Post = {
  id: string
  title: string
  content: string
  categoryId: string
}

declare module 'fastify' {
  interface FastifyInstance {
    db: AsyncDatabase
  }
}

export const categories: Category[] = [
  {
    id: '5e867c4f-8d87-4e65-ac0b-68f23ebef2f4',
    name: 'Programming'
  },
  {
    id: '518c02ff-dbcc-449e-bb4f-3fc3f09e0d55',
    name: 'Music'
  },
  {
    id: 'b0b6b2e0-5b9a-4b7e-8b0a-9b0b4b9b0b4b',
    name: 'Travel'
  }
]

export const posts: Post[] = [
  {
    id: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
    title: 'Why I love GraphQL',
    content: '...',
    categoryId: categories[0].id
  },
  {
    id: 'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
    title: 'How to write a song',
    content: '...',
    categoryId: categories[1].id
  },
  {
    id: 'c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2',
    title: 'How to travel the world',
    content: '...',
    categoryId: categories[2].id
  },
  {
    id: 'd3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3',
    title: 'How to travel Asia',
    content: '...',
    categoryId: categories[2].id
  },
  {
    id: 'e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e4e4',
    title: 'How to travel Africa',
    content: '...',
    categoryId: categories[2].id
  }
]

const DbPlugin = fp(async function DbPlugin(fastify) {
  fastify.log.info('Database loading...')
  const db = new AsyncDatabase(new sqlite.Database(':memory:'))
  fastify.decorate('db', db)

  await new Promise<void>(resolve =>
    db.inner.serialize(async () => {
      await db.run(`
CREATE TABLE category (
    id TEXT PRIMARY KEY,
    name TEXT
)`)
      await db.run(`
CREATE TABLE post (
  id TEXT PRIMARY KEY,
  title TEXT,
  content TEXT,
  categoryId TEXT NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES category(id)
)`)

      const categoryStatement = await db.prepare('INSERT INTO category (id, name) VALUES (?,?)')
      for (const category of categories) {
        await categoryStatement.run([category.id, category.name])
      }
      await categoryStatement.finalize()

      const postStatement = await db.prepare('INSERT INTO post (id, title, content, categoryId) VALUES (?,?,?,?)')
      for (const post of posts) {
        await postStatement.run([post.id, post.title, post.content, post.categoryId])
      }
      await postStatement.finalize()

      fastify.log.info('Database loaded!')
      resolve()
    })
  )

  fastify.addHook('onClose', async () => db.close())
})

export default DbPlugin
