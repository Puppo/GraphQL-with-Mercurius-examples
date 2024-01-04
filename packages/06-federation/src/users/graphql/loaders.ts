import { MercuriusLoaders } from './utils'

const loaders: MercuriusLoaders = {
  User: {
    __resolveReference: async (queries, { app: { dbUsers, log } }) => {
      log.info(queries, 'User.__resolveReference')
      return queries.map(({ obj }) => dbUsers.users[obj.id])
    }
  }
}

export default loaders
