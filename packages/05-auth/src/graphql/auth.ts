import fp from 'fastify-plugin'
import mercuriusAuth from 'mercurius-auth'
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
    authContext(context): AuthContext | Record<string, never> {
      context.app.log.info('authContext')
      const userIdHeader = context.reply.request.headers['x-userid'] ?? ''
      const userIdString = typeof userIdHeader === 'string' ? userIdHeader.trim() : userIdHeader[0].trim()
      if (!userIdString) return {}

      const userId = parseInt(userIdString, 10) + 10
      const user = context.app.db.users[userId]
      if (!user) return {}
      return user
    },
    async applyPolicy(policy, parent, args, context) {
      return policy.requires.includes(context.auth?.role)
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
