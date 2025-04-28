<script lang="ts">
	import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'

	let { data } = $props()
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
	<h1 class="post_head">Featured Posts:</h1>
	{#if data.featuredPosts.length > 0}
		<div class="featured-carousel">
		{#each data.featuredPosts as post (post.slug)}
			<div class="featured-post">
			<a href="/posts/{post.slug}" class="title">{post.title}</a>
			<p class="date">{formatDate(post.date)}</p>
			<p class="description">{post.description}</p>
			</div>
		{/each}
		</div>
	{/if}
	
	<h1 class="post_head">Recent Posts:</h1>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href='/posts/{post.slug}' class="title">{post.title}</a>
				<p class="date">{formatDate(post.date)}</p>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>

<style>
	.post_head {
		text-decoration: var(--border-light) dotted underline;
	}

	.featured-carousel {
  		display: flex;
		overflow-x: auto; /* Allows horizontal scrolling for the carousel */
		gap: var(--size-7); /* Space between featured posts */
		padding: var(--size-7) 0; /* Top and bottom padding for separation */
		max-width: var(--size-lg);
	}

	.featured-post {
		min-width: 300px; /* Adjust this to control the size of each featured post */
		max-width: 400px;
		border: 1px solid var(--border-light);
		border-radius: var(--radius-sm);
		padding: var(--size-5);
		background: var(--background-light);
		box-shadow: var(--shadow-sm);
		flex-shrink: 0; /* Ensures the posts don't shrink in the carousel */
	}

	.featured-post .title {
		font-size: var(--font-size-fluid-1);
		text-transform: capitalize;
	}

	.featured-post .date {
		color: var(--text-2);
		margin-bottom: var(--size-3);
	}

	.featured-post .description {
		margin-top: var(--size-3);
		/* font-size: var(--font-size-fluid-1); */
	}

	.posts {
		display: grid;
		gap: var(--size-7);

		.post {
			/* max-inline-size: var(--size-content-3); */
			max-inline-size: var(--size-lg);

			&:not(:last-child) {
				border-bottom: 1px solid var(--border);
				padding-bottom: var(--size-7);
			}

			.title {
				font-size: var(--font-size-fluid-3);
				text-transform: capitalize;
			}

			.date {
				color: var(--text-2);
			}

			.description {
				margin-top: var(--size-3);
			}
		}
	}
</style>
