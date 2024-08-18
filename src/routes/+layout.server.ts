import { getPuzzles } from '$lib/server/models/puzzle';

export async function load() {
	try {
		const puzzles = await getPuzzles();
		return {
			puzzles
		};
	} catch (error) {
		console.error(error);
		return {
			puzzles: []
		};
	}
}
