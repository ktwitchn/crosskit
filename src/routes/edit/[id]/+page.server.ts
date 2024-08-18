import { getPuzzle } from '$lib/server/models/puzzle';

export async function load({ params }) {
	try {
		const puzzle = await getPuzzle(params.id);
		return { puzzle };
	} catch (error) {
		console.error(error);
		return { puzzle: null };
	}
}
