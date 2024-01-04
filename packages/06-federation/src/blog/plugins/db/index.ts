import fp from 'fastify-plugin'

export type DbCategory = {
  id: string
  name: string
  createdBy: string
}

export type DbPost = {
  id: string
  title: string
  content: string
  categoryId: string
  createdBy: string
}

type Db = {
  categories: DbCategory[]
  posts: DbPost[]
}

declare module 'fastify' {
  interface FastifyInstance {
    dbBlog: Db
  }
}

const categories: DbCategory[] = [
  {
    id: '5e867c4f-8d87-4e65-ac0b-68f23ebef2f4',
    name: 'Programming',
    createdBy: '1'
  },
  {
    id: '518c02ff-dbcc-449e-bb4f-3fc3f09e0d55',
    name: 'Music',
    createdBy: '1'
  },
  {
    id: 'b0b6b2e0-5b9a-4b7e-8b0a-9b0b4b9b0b4b',
    name: 'Travel',
    createdBy: '1'
  }
]

export const posts: DbPost[] = [
  {
    id: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
    title: 'Why I love GraphQL',
    content: '...',
    categoryId: categories[0].id,
    createdBy: '2'
  },
  {
    id: 'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
    title: 'How to write a song',
    content: '...',
    categoryId: categories[1].id,
    createdBy: '2'
  },
  {
    id: 'c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2',
    title: 'How to travel the world',
    content: '...',
    categoryId: categories[2].id,
    createdBy: '2'
  },
  {
    id: 'd3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3',
    title: 'How to travel Asia',
    content: '...',
    categoryId: categories[2].id,
    createdBy: '3'
  },
  {
    id: 'e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e4e4',
    title: 'How to travel Africa',
    content: '...',
    categoryId: categories[2].id,
    createdBy: '3'
  }
]

const dbBlog: Db = {
  categories,
  posts
}

const DbPlugin = fp(function DbPlugin(fastify, opts, next) {
  fastify.log.info('Database loading...')
  fastify.decorate('dbBlog', dbBlog)
  fastify.log.info('Database loaded!')
  next()
})

export default DbPlugin
