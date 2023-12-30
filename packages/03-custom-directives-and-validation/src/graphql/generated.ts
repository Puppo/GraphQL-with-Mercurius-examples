import type { GraphQLResolveInfo } from 'graphql'
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
  _FieldSet: any
}

export type Category = {
  __typename?: 'Category'
  id: Scalars['ID']
  name: Scalars['String']
  posts: Array<Post>
}

export type Post = {
  __typename?: 'Post'
  id: Scalars['ID']
  title: Scalars['String']
  content: Scalars['String']
  category: Category
}

export type PostCreate = {
  title: Scalars['String']
  content: Scalars['String']
  categoryId: Scalars['ID']
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

export type ResolverTypeWrapper<T> = Promise<T> | T

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

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Category: ResolverTypeWrapper<Category>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  Post: ResolverTypeWrapper<Post>
  PostCreate: PostCreate
  Query: ResolverTypeWrapper<{}>
  Int: ResolverTypeWrapper<Scalars['Int']>
  Mutation: ResolverTypeWrapper<{}>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Category: Category
  ID: Scalars['ID']
  String: Scalars['String']
  Post: Post
  PostCreate: PostCreate
  Query: {}
  Int: Scalars['Int']
  Mutation: {}
  Boolean: Scalars['Boolean']
}

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

export type CategoryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>
}

export type PostResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType>
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

export type Resolvers<ContextType = MercuriusContext> = {
  Category?: CategoryResolvers<ContextType>
  Post?: PostResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
}

export type DirectiveResolvers<ContextType = MercuriusContext> = {
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
  Category?: {
    id?: LoaderResolver<Scalars['ID'], Category, {}, TContext>
    name?: LoaderResolver<Scalars['String'], Category, {}, TContext>
    posts?: LoaderResolver<Array<Post>, Category, {}, TContext>
  }

  Post?: {
    id?: LoaderResolver<Scalars['ID'], Post, {}, TContext>
    title?: LoaderResolver<Scalars['String'], Post, {}, TContext>
    content?: LoaderResolver<Scalars['String'], Post, {}, TContext>
    category?: LoaderResolver<Category, Post, {}, TContext>
  }
}
declare module 'mercurius' {
  interface IResolvers extends Resolvers<import('mercurius').MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
