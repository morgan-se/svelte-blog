<script lang="ts">
    import {title} from '$lib/config'
    import Toggle from './toggle.svelte'
</script>

<nav>
    <a href="/" class="title">
        <b>{title}</b>
    </a>

    <ul class="links">
        <li>
            <a href="/posts">Posts</a>
        </li>
        <li>
            <a href="/about">About</a>
        </li>
        <li>
            <a href="/recipes">Recipes</a>
        </li>
        <li>
            <a href="/contact">Contact</a>
        </li>
    </ul>

    <Toggle/>
</nav>

<style>
    nav {
        padding-block: var(--size-7);
    }

    .links {
        margin-block: var(--size-7);
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    @media (min-width: 768px) {
        nav {
            display: flex;
            justify-content: space-between;
        }

        .links {
            display: flex;
            gap: var(--size-7);
            margin-block: 0;
        }
    }
</style>