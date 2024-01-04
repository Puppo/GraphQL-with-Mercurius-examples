import fp from 'fastify-plugin'

type Permission = 'admin' | 'user'

type User = {
  id: string
  name: string
  role: Permission
}

type Users = Record<string, User>

type Db = {
  users: Users
}

declare module 'fastify' {
  interface FastifyInstance {
    dbUsers: Db
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

const dbUsers: Db = {
  users
}

const DbPlugin = fp(function DbPlugin(fastify, opts, next) {
  fastify.log.info('Database loading...')
  fastify.decorate('dbUsers', dbUsers)
  fastify.log.info('Database loaded!')
  next()
})

export default DbPlugin
