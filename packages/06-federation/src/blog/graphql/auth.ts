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
      context.app.log.info(context.reply.request.headers.authorization, 'authContext')
      if (!context.reply.request.headers.authorization) {
        return {}
      }
      context.reply.request.jwtVerify()
      return context.reply.request.user as AuthContext
    },
    async applyPolicy(policy, parent, args, context) {
      return policy.requires.includes(context.auth?.role)
    },
    mode: 'external',
    policy: {
      Mutation: {
        createCategory: { requires: ['admin'] },
        createPost: { requires: ['user', 'admin'] }
      }
    } satisfies GraphQLPolicy
  })
})
