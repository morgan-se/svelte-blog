import type { Recipe } from '$lib/types'
import { getRecipes } from '$lib/api'

export async function load() {
    const recipes: Recipe[] = await getRecipes();
	return { recipes }
}
