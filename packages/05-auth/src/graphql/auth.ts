import fp from 'fastify-plugin'
import { ErrorWithProps } from 'mercurius'
import mercuriusAuth from 'mercurius-auth'
import { User } from '../plugins/db'
import { Policy } from './utils'

type Permission = 'admin' | 'user'

type AuthContext = {
  id: string
  name: string
  role: Permission
}

declare module 'mercurius' {
  interface MercuriusContext {
    auth?: AuthContext
  }
}

type PolicyItem = {
  requires: Permission[]
}

type GraphQLPolicy = Policy<PolicyItem>

export default fp(async function Auth(app) {
  app.register(mercuriusAuth, {
    authContext: async (context): Promise<AuthContext | Record<string, never>> => {
      context.app.log.info('authContext')
      const userIdHeader = context.reply.request.headers['x-userid'] ?? ''
      const userIdString = typeof userIdHeader === 'string' ? userIdHeader.trim() : userIdHeader[0].trim()
      if (!userIdString) return {}

      const userId = parseInt(userIdString, 10)
      const user = await context.app.db.get<User>(`SELECT * FROM users WHERE id = ?`, [userId])
      if (!user) return {}
      return user
    },
    async applyPolicy(policy, parent, args, context) {
      const isAuth = policy.requires.includes(context.auth?.role)
      if (!isAuth) {
        throw new ErrorWithProps(
          `Failed auth policy`,
          {
            code: 'AUTH_FAILED',
            message: `Failed auth policy`
          },
          401
        )
      }

      return isAuth
    },
    mode: 'external',
    policy: {
      Query: {
        getPosts: { requires: ['user', 'admin'] },
        getPost: { requires: ['user', 'admin'] },
        getPostsByCategory: { requires: ['user', 'admin'] }
      },
      Mutation: {
        createCategory: { requires: ['admin'] },
        createPost: { requires: ['user', 'admin'] }
      }
    } satisfies GraphQLPolicy
  })
})
