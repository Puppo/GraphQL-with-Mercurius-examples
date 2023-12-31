import fp from 'fastify-plugin'

type Permission = 'admin' | 'user'

type User = {
  id: string
  name: string
  role: Permission
}

type Users = Record<string, User>

type Category = {
  id: string
  name: string
  createdBy: User['id']
}

type Post = {
  id: string
  title: string
  content: string
  categoryId: string
  createdBy: User['id']
}

type Db = {
  users: Users
  categories: Category[]
  posts: Post[]
}

declare module 'fastify' {
  interface FastifyInstance {
    db: Db
  }
}

const users: Users = {
  1: {
    id: '1',
    name: 'John',
    role: 'admin'
  },
  2: {
    id: '2',
    name: 'Jane',
    role: 'user'
  },
  3: {
    id: '3',
    name: 'Jack',
    role: 'user'
  }
}

const categories: Category[] = [
  {
    id: '5e867c4f-8d87-4e65-ac0b-68f23ebef2f4',
    name: 'Programming',
    createdBy: users[1].id
  },
  {
    id: '518c02ff-dbcc-449e-bb4f-3fc3f09e0d55',
    name: 'Music',
    createdBy: users[1].id
  },
  {
    id: 'b0b6b2e0-5b9a-4b7e-8b0a-9b0b4b9b0b4b',
    name: 'Travel',
    createdBy: users[1].id
  }
]

export const posts: Post[] = [
  {
    id: 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0',
    title: 'Why I love GraphQL',
    content: '...',
    categoryId: categories[0].id,
    createdBy: users[2].id
  },
  {
    id: 'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1',
    title: 'How to write a song',
    content: '...',
    categoryId: categories[1].id,
    createdBy: users[2].id
  },
  {
    id: 'c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2',
    title: 'How to travel the world',
    content: '...',
    categoryId: categories[2].id,
    createdBy: users[2].id
  },
  {
    id: 'd3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3',
    title: 'How to travel Asia',
    content: '...',
    categoryId: categories[2].id,
    createdBy: users[3].id
  },
  {
    id: 'e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e4e4',
    title: 'How to travel Africa',
    content: '...',
    categoryId: categories[2].id,
    createdBy: users[3].id
  }
]

const db: Db = {
  users,
  categories,
  posts
}

const DbPlugin = fp(function DbPlugin(fastify, opts, next) {
  fastify.log.info('Database loading...')
  fastify.decorate('db', db)
  fastify.log.info('Database loaded!')
  next()
})

export default DbPlugin
