import type { DbCategory, DbPost } from '../plugins/db'
import type { Category, Post } from './generated'

export function mapCategory(category: DbCategory): Omit<Category, 'posts' | 'createdBy'> {
  return category
}

export function mapPost(post: DbPost): Omit<Post, 'category' | 'createdBy'> {
  return post
}
