<script lang="ts">
	import * as config from '$lib/config';
	import { Github, Gitlab, Linkedin, Mail } from 'lucide-svelte';
	function openMail() {
		window.location.href = 'mailto:morgan.english.seng@gmail.com';
	}
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>
	<div class="wrapper">
	<h2 class="intro">Want to get in touch? 👉🧔🏻</h2>
	<div class="links">
		<a
			href="https://github.com/morgan-se/"
			target="_blank"
			rel="noopener noreferrer"
			tabindex="0"
			style="cursor: pointer;"
		>
			<Github size="40" />
		</a>
		<a
			href="https://gitlab.com/morgan.english.seng"
			target="_blank"
			rel="noopener noreferrer"
			tabindex="0"
			style="cursor: pointer;"
		>
			<Gitlab size="40" />
		</a>
		<a
			href="https://www.linkedin.com/in/morgan-english/"
			target="_blank"
			rel="noopener noreferrer"
			tabindex="0"
			style="cursor: pointer;"
		>
			<Linkedin size="40" />
		</a>
		<a href="mailto:morgan.english.seng@gmail.com" tabindex="0" style="cursor: pointer;">
			<Mail size="40" />
		</a>
	</div>
	

	<h2 class="intro">Or see my résumé? 📄</h2>

	<p>Coming soon... Looks like you'll have to wait</p>
</div>
</section>

<style>
	.wrapper {
		margin: auto;
		justify-content: center;
		width: fit-content;
	}
	.intro {
		margin-bottom: var(--size-4);
	}

	.links {
		display: flex;
		margin-bottom: var(--size-4);
	}

	.links a {
		color: var(--link);
	}

	.links * {
		margin: var(--size-3);
	}
</style>
