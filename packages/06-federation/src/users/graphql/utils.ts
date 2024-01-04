import { FastifyReply } from 'fastify'
import { MercuriusContext } from 'mercurius'
import { LoaderResolver, Loaders, QueryResolvers, Resolvers, User } from './generated'

export type Query = Required<Omit<QueryResolvers, '_service' | '_entities'>> &
  Pick<QueryResolvers, '_service' | '_entities'>

export type IResolvers = Omit<Resolvers, 'Query'> & {
  Query: Query
}

export type ILoaders<TContext = MercuriusContext & { reply: FastifyReply }> = Loaders<TContext> & {
  User?: {
    __resolveReference?: LoaderResolver<User, User, Record<string, unknown>, TContext>
  }
}

export interface MercuriusLoaders extends ILoaders {}
