import type { Post } from '$lib/types'
import { error } from '@sveltejs/kit'

export async function load({ fetch }) {
	const response = await fetch('api/posts')
	const posts: Post[] = await response.json()
	let p = []
	for (let i = 0; i < posts.length; i++){
		try {
			const post = await import(`../../posts/${posts[i].slug}.md`)

			if (post.metadata.type == 'game') {
				p.push({
					content: post.default,
					meta: post.metadata,
					slug: posts[i].slug
				})
			}

		} catch (e) {
			throw error(404, `Could not find ${posts[i].slug}`)
		}
	}
	return { posts: p}
}
