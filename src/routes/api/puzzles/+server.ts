import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addPuzzle } from '$lib/server/models/puzzle';
import type { IPuzzle } from '$lib/types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const puzzleData: IPuzzle = await request.json();
		const newPuzzle = await addPuzzle(puzzleData);
		return json(newPuzzle, { status: 201 });
	} catch (error) {
		console.error('Error creating puzzle:', error);
		return json({ error: 'Failed to create puzzle' }, { status: 500 });
	}
};
