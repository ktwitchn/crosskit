import { query } from '$lib/server/db';
import type { IClue } from '$lib/types';

export async function addCluesForPuzzle(puzzleId: string, clues: IClue[]): Promise<void> {
	for (const clue of clues) {
		await query.execute(
			'INSERT INTO clues (puzzle_id, number, value, direction) VALUES ($1, $2, $3, $4)',
			[puzzleId, clue.number, clue.value, clue.direction]
		);
	}
}
