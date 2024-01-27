import fp from 'fastify-plugin'
import { AsyncDatabase } from 'promised-sqlite3'
import sql from 'sqlite3'

const sqlite = sql.verbose()

type Permission = 'admin' | 'user'

export type User = {
  id: string
  name: string
  role: Permission
}

type Users = Record<string, User>

declare module 'fastify' {
  interface FastifyInstance {
    db: AsyncDatabase
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

const DbPlugin = fp(async function DbPlugin(fastify) {
  fastify.log.info('Database loading...')
  const db = new AsyncDatabase(new sqlite.Database(':memory:'))
  fastify.decorate('db', db)

  await new Promise<void>(resolve =>
    db.inner.serialize(async () => {
      await db.run(`
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT,
    role TEXT
)`)
      const userStatement = await db.prepare('INSERT INTO users (id, name, role) VALUES (?,?,?)')
      for (const user of Object.values(users)) {
        await userStatement.run([user.id, user.name, user.role])
      }
      await userStatement.finalize()

      fastify.log.info('Database loaded!')

      resolve()
    })
  )

  fastify.addHook('onClose', async () => db.close())
})

export default DbPlugin
