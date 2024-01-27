import { MercuriusLoaders } from 'mercurius'
import { User } from './generated'
import { MercuriusLoaders as MercuriusLoadersCustom } from './utils'

const loaders = {
  User: {
    __resolveReference: async (queries, { app: { db, log } }) => {
      log.info(queries, 'User.__resolveReference')
      const users = await db.all<User>(
        `SELECT * FROM users WHERE id IN (${queries.map(({ obj }) => `'${obj.id}'`).join(',')})`
      )
      return queries.map(({ obj }) => users.find(({ id }) => id === obj.id)!)
    }
  }
} satisfies MercuriusLoadersCustom

export default loaders as MercuriusLoaders
