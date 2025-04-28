<script lang="ts">
	// import { formatDate } from '$lib/utils'
	import * as config from '$lib/config'

	let { data } = $props()
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
    <h1 class="post_head">Recipes:</h1>
    <!-- todo: drop down or search of some sort, maybe after I've actually made a few entries so I know whats best -->

    <!-- todo custom style for recipes? maybe including title and image (and maybe some stats like difficulty, time, ...) -->
    <ul class="posts">
        {#each data.recipes as recipe}
        <li class="post">
            <img src='/recipes/title/{recipe.slug}.jpg' alt="recipe hero" class="hero-image"/>
            <div class="title-container">
                <a href='/recipes/{recipe.slug}' class="title">{recipe.title}</a>
                <p class="time">⏲️ ~{recipe.time}</p>
                <p class="description">{recipe.description}</p>
            </div>
        </li>
        {/each}
    </ul>
    
</section>

<style>
    .posts {
		display: grid;
		gap: var(--size-7);

		.post {
			/* max-inline-size: var(--size-content-3); */
			max-inline-size: var(--size-lg);
            display: flex;
            flex-direction: row;

			&:not(:last-child) {
				border-bottom: 1px solid var(--border);
				padding-bottom: var(--size-7);
			}

            .hero-image {
                height: var(--size-xs);
                width: var(--size-xs);
            }

            .title-container{
                margin-left: var(--size-3);

                .title {
                    font-size: var(--font-size-fluid-3);
                    text-transform: capitalize;
                }

                .time {
                    color: var(--text-2);
                }

                .description {
                    margin-top: var(--size-1);
                }
            }
		}
	}
</style>