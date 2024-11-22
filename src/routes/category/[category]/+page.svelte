<script lang="ts">
    import { formatDate } from '$lib/utils'
    let { data } = $props()
</script>

<h1>Posts in category: {data.category}</h1>

{#if data.posts.length > 0}
<section>
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
{:else}
    <p>No posts found for this category.</p>
{/if}

<style>
    /* todo abstract this since its duplicated from src\routes\+page.svelte*/
	.posts {
		display: grid;
		gap: var(--size-7);

		.post {
			max-inline-size: var(--size-content-3);

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
