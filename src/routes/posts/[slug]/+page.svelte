<script lang="ts">
	import { formatDate } from '$lib/utils';
	import { onMount } from 'svelte';

	let estimatedReadTime: number = $state(0);

	onMount(() => {
		const proseElement = document.querySelector('.prose') as HTMLElement;
		if (proseElement) {
			// Aggregate text content from all child elements
			const textContent = proseElement.textContent || '';
			const wordCount = textContent.split(/\s+/).filter((word) => word.length > 0).length; // Ignore empty strings
			estimatedReadTime = Math.ceil(wordCount / 200); // 200 words per minute
			console.log(estimatedReadTime);
		}
	});

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	<hgroup>
		<h1>{data.meta.title}</h1>
		{#if data.meta.published}
		<p>Published at {formatDate(data.meta.date)}</p>
		{:else}
			<p style="font-weight: bold; color: var(--text-light-warn);">Warning: blog has not been officially published, it may not be complete</p>
		{/if}
		<p>Estimated read time: {estimatedReadTime} min</p>
	</hgroup>

	<div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;<a href="/category/{category}">{category}</a></span>
		{/each}
	</div>

	<div class="prose">
		<data.content />
	</div>
</article>

<style>
	article {
		max-inline-size: var(--size-lg);
		/* max-inline-size: var(--size-content-3); */
		margin-inline: auto;

		h1 {
			max-inline-size: var(--size-lg);

			text-transform: capitalize;
		}

		h1 + p {
			margin-top: var(--size-2);
			color: var(--text-2);
		}

		.tags {
			display: flex;
			gap: var(--size-3);
			margin-top: var(--size-5);
			margin-bottom: var(--size-2);

			> * {
				padding: var(--size-2) var(--size-3);
				border-radius: var(--radius-round);
			}
		}
	}
</style>
