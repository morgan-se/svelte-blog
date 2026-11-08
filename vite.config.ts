import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte, mdsvex, type MdsvexOptions } from 'mdsvex';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypeSlug from 'rehype-slug';
import remarkToc from 'remark-toc';
import { createHighlighter } from 'shiki';
import { defineConfig } from 'vite';

const theme = 'ayu-dark';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['javascript', 'typescript', 'java', 'python']
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const mdsvexOptions: MdsvexOptions = {
	extensions: ['.md'],
	layout: {
		_: path.resolve(__dirname, './src/mdsvex.svelte')
	},
	highlight: {
		highlighter: async (code, lang = 'text') => {
			await highlighter.loadLanguage('javascript', 'typescript', 'java', 'python');
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang: lang || 'text', theme }));
			return `{@html \`${html}\` }`;
		}
	},
	remarkPlugins: [[remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug]
};

export default defineConfig({
	plugins: [
		sveltekit({
			adapter: adapter(),
			extensions: ['.svelte', '.md'],
			preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)]
		})
	]
});
