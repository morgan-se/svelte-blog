<script lang="ts">
    import {title} from '$lib/config'
</script>

<footer>
    <p>{title} &copy {new Date().getFullYear()}</p>
</footer>

<style>
    footer {
        padding-block: var(--size-7);
        border-top: 1px solid var(--border);
    }

    p {
        color: var(--text-2);
    }    
</style>