<script lang="ts">
	import * as config from '$lib/config'

</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<section>

	<h1 class="intro">Hey I'm Morgan 👋 <img class="pic" src="../../me.jpg" alt="Just me, looking good"></h1>

	<p>Lately I've been working in tertiary education across the software engineering discipline, where I find joy in teaching the new generation of software developers.</p>
	<br>

	<p>I have been afforded the great opportunity to work with and support dozens of student teams as they complete projects following both scrum and waterfall methodologies.</p>
	<br>
	<p>Technically, I'm into web development with experience with many frameworks including <span style="color: #61DBFB">React</span>, <span style="color: #42b883">Vue</span>, <span style="color: #FF3E00">Svelte</span>, <span style="color: #005F0F">Thymeleaf</span>, <span style="color: #999999">Express</span>, <span style="color: #6CB52D">Spring</span>, and more.
	Though I also teach JavaFX, Android development, and software security</p>
	<br>
	<p>
		Life's not all about work though!
		I also enjoy some baking 👨‍🍳 (even if I'm not amazing at it), badminton 🏸, running 🏃💨, and gaming 🎮.
	</p>
</section>

<style>
	.intro {
		margin-bottom: var(--size-7);
	}
	section * {
		margin: auto;
	}
	.pic {
		border-radius: 50%;
  		object-fit: cover;
		width: 200px;
		display: inline;
		transform: translateY(40px);
	}
</style>