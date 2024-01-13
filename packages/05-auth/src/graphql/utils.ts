import { MutationResolvers, QueryResolvers } from './generated'

export type Mutation = Required<MutationResolvers>
export type Query = Required<QueryResolvers>

type MutationPolicy<Policy> = Partial<Record<keyof MutationResolvers, Policy>>
type QueryPolicy<Policy> = Partial<Record<keyof QueryResolvers, Policy>>

export type Policy<P> = {
  Mutation: MutationPolicy<P>
  Query: QueryPolicy<P>
}
