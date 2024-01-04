import { MutationResolvers, QueryResolvers } from './generated'

export type Mutation = Required<MutationResolvers>
export type Query = Required<Omit<QueryResolvers, '_service' | '_entities'>>

type MutationPolicy<Policy> = Partial<Record<keyof MutationResolvers, Policy>>
type QueryPolicy<Policy> = Partial<Record<keyof QueryResolvers, Policy>>

export type Policy<P> = Partial<{
  Mutation: MutationPolicy<P>
  Query: QueryPolicy<P>
}>
