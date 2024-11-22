export async function load({ url }) {
	return {
		url: url.pathname
	}
}

// create pre render to html in build
// export const prerender = true
