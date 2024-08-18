import type { IPuzzle } from '$lib/types';

export async function createPuzzle(puzzleData: IPuzzle): Promise<IPuzzle> {
	const response = await fetch('/api/puzzles', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(puzzleData)
	});

	if (!response.ok) {
		throw new Error('Failed to create puzzle');
	}

	return response.json();
}
