import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql'
import type { MercuriusContext } from 'mercurius'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<import('mercurius-codegen').DeepPartial<TResult>> | import('mercurius-codegen').DeepPartial<TResult>
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  _Any: any
  _FieldSet: any
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  getCategories: Array<Category>
  getCategory?: Maybe<Category>
  getPosts: Array<Post>
  getPost?: Maybe<Post>
  getPostsByCategory: Array<Post>
}

export type QuerygetCategoryArgs = {
  id: Scalars['ID']
}

export type QuerygetPostsArgs = {
  offset: Scalars['Int']
  limit: Scalars['Int']
}

export type QuerygetPostArgs = {
  id: Scalars['ID']
}

export type QuerygetPostsByCategoryArgs = {
  categoryId: Scalars['ID']
}

export type Mutation = {
  __typename?: 'Mutation'
  createCategory: Category
  createPost: Post
}

export type MutationcreateCategoryArgs = {
  name: Scalars['String']
}

export type MutationcreatePostArgs = {
  newPost: PostCreate
}

export type Category = {
  __typename?: 'Category'
  id: Scalars['ID']
  name: Scalars['String']
  posts: Array<Post>
  createdBy?: Maybe<User>
}

export type Post = {
  __typename?: 'Post'
  id: Scalars['ID']
  title: Scalars['String']
  content: Scalars['String']
  category: Category
  createdBy?: Maybe<User>
}

export type PostCreate = {
  title: Scalars['String']
  content: Scalars['String']
  categoryId: Scalars['ID']
}

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ReferenceResolver<TResult, TReference, TContext> = (
  reference: TReference,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>
type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>
type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>
export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> }

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping of union types */
export type ResolversUnionTypes = {
  _Entity: User | Category | Post
}

/** Mapping of union parent types */
export type ResolversUnionParentTypes = {
  _Entity: User | Category | Post
}

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  _Any: ResolverTypeWrapper<Scalars['_Any']>
  _Service: ResolverTypeWrapper<_Service>
  String: ResolverTypeWrapper<Scalars['String']>
  User: ResolverTypeWrapper<User>
  ID: ResolverTypeWrapper<Scalars['ID']>
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Category: ResolverTypeWrapper<Category>
  Post: ResolverTypeWrapper<Post>
  PostCreate: PostCreate
  _Entity: ResolverTypeWrapper<ResolversUnionTypes['_Entity']>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  _Any: Scalars['_Any']
  _Service: _Service
  String: Scalars['String']
  User: User
  ID: Scalars['ID']
  Query: {}
  Int: Scalars['Int']
  Mutation: {}
  Category: Category
  Post: Post
  PostCreate: PostCreate
  _Entity: ResolversUnionParentTypes['_Entity']
  Boolean: Scalars['Boolean']
}

export type extendsDirectiveArgs = {}

export type extendsDirectiveResolver<
  Result,
  Parent,
  ContextType = MercuriusContext,
  Args = extendsDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type upperDirectiveArgs = {}

export type upperDirectiveResolver<
  Result,
  Parent,
  ContextType = MercuriusContext,
  Args = upperDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type capitalizeDirectiveArgs = {}

export type capitalizeDirectiveResolver<
  Result,
  Parent,
  ContextType = MercuriusContext,
  Args = capitalizeDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export type constraintDirectiveArgs = {
  maximum?: Maybe<Scalars['Int']>
  minimum?: Maybe<Scalars['Int']>
  exclusiveMaximum?: Maybe<Scalars['Int']>
  exclusiveMinimum?: Maybe<Scalars['Int']>
  multipleOf?: Maybe<Scalars['Int']>
  maxLength?: Maybe<Scalars['Int']>
  minLength?: Maybe<Scalars['Int']>
  pattern?: Maybe<Scalars['String']>
  maxProperties?: Maybe<Scalars['Int']>
  minProperties?: Maybe<Scalars['Int']>
  required?: Maybe<Array<Scalars['String']>>
  maxItems?: Maybe<Scalars['Int']>
  minItems?: Maybe<Scalars['Int']>
  uniqueItems?: Maybe<Scalars['Boolean']>
  type?: Maybe<Array<Scalars['String']>>
  format?: Maybe<Scalars['String']>
  schema?: Maybe<Scalars['String']>
}

export type constraintDirectiveResolver<
  Result,
  Parent,
  ContextType = MercuriusContext,
  Args = constraintDirectiveArgs
> = DirectiveResolverFn<Result, Parent, ContextType, Args>

export interface _AnyScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['_Any'], any> {
  name: '_Any'
}

export type _ServiceResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['_Service'] = ResolversParentTypes['_Service']
> = {
  sdl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type UserResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['User']>,
    { __typename: 'User' } & GraphQLRecursivePick<ParentType, { id: true }>,
    ContextType
  >

  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  getCategories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>
  getCategory?: Resolver<
    Maybe<ResolversTypes['Category']>,
    ParentType,
    ContextType,
    RequireFields<QuerygetCategoryArgs, 'id'>
  >
  getPosts?: Resolver<
    Array<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QuerygetPostsArgs, 'offset' | 'limit'>
  >
  getPost?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerygetPostArgs, 'id'>>
  getPostsByCategory?: Resolver<
    Array<ResolversTypes['Post']>,
    ParentType,
    ContextType,
    RequireFields<QuerygetPostsByCategoryArgs, 'categoryId'>
  >
  _entities?: Resolver<
    Array<Maybe<ResolversTypes['_Entity']>>,
    ParentType,
    ContextType,
    RequireFields<Query_entitiesArgs, 'representations'>
  >
  _service?: Resolver<ResolversTypes['_Service'], ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createCategory?: Resolver<
    ResolversTypes['Category'],
    ParentType,
    ContextType,
    RequireFields<MutationcreateCategoryArgs, 'name'>
  >
  createPost?: Resolver<
    ResolversTypes['Post'],
    ParentType,
    ContextType,
    RequireFields<MutationcreatePostArgs, 'newPost'>
  >
}

export type CategoryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']
> = {
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['Category']>,
    { __typename: 'Category' } & GraphQLRecursivePick<ParentType, { id: true }>,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PostResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = {
  __resolveReference?: ReferenceResolver<
    Maybe<ResolversTypes['Post']>,
    { __typename: 'Post' } & GraphQLRecursivePick<ParentType, { id: true }>,
    ContextType
  >
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>
  createdBy?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type _EntityResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['_Entity'] = ResolversParentTypes['_Entity']
> = {
  resolveType: TypeResolveFn<'User' | 'Category' | 'Post', ParentType, ContextType>
}

export type Resolvers<ContextType = MercuriusContext> = {
  _Any?: GraphQLScalarType
  _Service?: _ServiceResolvers<ContextType>
  User?: UserResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Category?: CategoryResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  _Entity?: _EntityResolvers<ContextType>
}

export type DirectiveResolvers<ContextType = MercuriusContext> = {
  extends?: extendsDirectiveResolver<any, any, ContextType>
  upper?: upperDirectiveResolver<any, any, ContextType>
  capitalize?: capitalizeDirectiveResolver<any, any, ContextType>
  constraint?: constraintDirectiveResolver<any, any, ContextType>
}

export type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj
    params: TParams
  }>,
  context: TContext & {
    reply: import('fastify').FastifyReply
  }
) => Promise<Array<import('mercurius-codegen').DeepPartial<TReturn>>>
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>
      opts?: {
        cache?: boolean
      }
    }
export interface Loaders<TContext = import('mercurius').MercuriusContext & { reply: import('fastify').FastifyReply }> {
  _Service?: {
    sdl?: LoaderResolver<Maybe<Scalars['String']>, _Service, {}, TContext>
  }

  User?: {
    id?: LoaderResolver<Scalars['ID'], User, {}, TContext>
    name?: LoaderResolver<Maybe<Scalars['String']>, User, {}, TContext>
  }

  Category?: {
    id?: LoaderResolver<Scalars['ID'], Category, {}, TContext>
    name?: LoaderResolver<Scalars['String'], Category, {}, TContext>
    posts?: LoaderResolver<Array<Post>, Category, {}, TContext>
    createdBy?: LoaderResolver<Maybe<User>, Category, {}, TContext>
  }

  Post?: {
    id?: LoaderResolver<Scalars['ID'], Post, {}, TContext>
    title?: LoaderResolver<Scalars['String'], Post, {}, TContext>
    content?: LoaderResolver<Scalars['String'], Post, {}, TContext>
    category?: LoaderResolver<Category, Post, {}, TContext>
    createdBy?: LoaderResolver<Maybe<User>, Post, {}, TContext>
  }
}
declare module 'mercurius' {
  interface IResolvers extends Resolvers<import('mercurius').MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
