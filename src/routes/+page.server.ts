import type { Post } from '$lib/types'
import { getPosts } from '$lib/api'

export async function load({ fetch }) {
	// const response = await fetch('api/posts')
	// const posts: Post[] = await response.json()
    const posts: Post[] = await getPosts();
	return { posts }
}
