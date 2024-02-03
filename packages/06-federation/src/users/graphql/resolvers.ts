import { ErrorWithProps } from 'mercurius'
import { User } from '../plugins/db'
import type { IResolvers } from './utils'

const resolvers = {
  Query: {
    signIn: async (_root, args, context) => {
      const { name, password } = args
      if (password !== 'password') {
        throw new ErrorWithProps(
          'Invalid username or password',
          {
            code: 'INVALID_USERNAME_OR_PASSWORD',
            message: 'Invalid username or password'
          },
          401
        )
      }
      const user = await context.app.db.get<User>('SELECT * FROM users WHERE name = ?', [name])

      if (!user) {
        throw new ErrorWithProps(
          'Invalid username or password',
          {
            code: 'INVALID_USERNAME_OR_PASSWORD',
            message: 'Invalid username or password'
          },
          401
        )
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
      return context.app.db.get<User>('SELECT * FROM users WHERE id = ?', [id])
    },
    getUsersByIds: async (_root, args, context) => {
      const { ids } = args
      const users = await context.app.db.all<User>(
        `SELECT * FROM users WHERE id IN (${ids.map(id => `'${id}'`).join(',')})`
      )
      return ids.map(id => users.find(user => user.id === id)!)
    }
  }
} satisfies IResolvers

export default resolvers
