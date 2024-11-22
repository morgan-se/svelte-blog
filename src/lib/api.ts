import type { Post } from '$lib/types'

export async function getPosts(category?: string): Promise<Post[]> {
    let posts: Post[] = []

    const paths = import.meta.glob('/src/posts/*.md', { eager: true })

    for (const path in paths) {
        const file = paths[path]
        const slug = path.split('/').at(-1)?.replace('.md', '')

        if (file && typeof file === 'object' && 'metadata' in file && slug) {
            const metadata = file.metadata as Omit<Post, 'slug'>
            const post = { ...metadata, slug } satisfies Post
            if (post.published) {
                // Filter by category if category is provided
                if (category && !post.categories.includes(category)) {
                    continue
                }
                posts.push(post)
            }
        }
    }

    posts = posts.sort((first, second) =>
        new Date(second.date).getTime() - new Date(first.date).getTime()
    )

    // console.log(`posts: ${posts}`)

    return posts
}