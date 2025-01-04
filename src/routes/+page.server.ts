import type { Post } from '$lib/types'
import { getPosts } from '$lib/api'

export async function load() {
    const posts: Post[] = await getPosts();
	const featuredPosts: Post[] = await getPosts(undefined, true)
	return { posts, featuredPosts }
}
