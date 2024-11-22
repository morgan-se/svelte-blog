import { getPosts } from '$lib/api'

export async function load({ params }) {
    const { category } = params    
    const posts = await getPosts(category)
    return { posts, category }
}