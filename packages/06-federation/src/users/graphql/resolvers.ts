import { ErrorWithProps } from 'mercurius'
import type { IResolvers } from './utils'

const resolvers = {
  Query: {
    signIn: async (_root, args, context) => {
      const { name, password } = args
      if (password !== 'password') {
        context.reply.code(401)
        throw new ErrorWithProps('Invalid username or password')
      }
      const user = Object.values(context.app.dbUsers.users).find(user => user.name === name)

      if (!user) {
        context.reply.code(401)
        throw new ErrorWithProps('Invalid username or password')
      }

      const token = context.app.jwt.sign({
        id: user.id,
        name: user.name,
        role: user.role
      })

      return {
        user,
        token
      }
    },
    getUserById: async (_root, args, context) => {
      const { id } = args
      return context.app.dbUsers.users[id]
    },
    getUsersByIds: async (_root, args, context) => {
      const { ids } = args
      return ids.map(id => context.app.dbUsers.users[id])
    }
  }
} satisfies IResolvers

export default resolvers
