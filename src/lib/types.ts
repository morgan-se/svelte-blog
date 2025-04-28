export type Category = string

export type Post = {
	title: string
	slug: string
	description: string
	date: string
	categories: Category[]
	published: boolean,
	priority: number
}

export type Recipe = {
	title: string,
	slug: string,
	description: string,
	date: string,
	time: string,
	rating: number,
	// categories: Category[]
	published: boolean
}