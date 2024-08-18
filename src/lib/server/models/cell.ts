import { query } from '$lib/server/db';
import type { ICell } from '$lib/types';

export async function addCellsForPuzzle(puzzleId: string, cells: ICell[]): Promise<void> {
	for (const cell of cells) {
		await query.execute(
			'INSERT INTO cells (puzzle_id, location, value, disabled, clue_number) VALUES ($1, $2, $3, $4, $5)',
			[puzzleId, cell.location, cell.value, cell.disabled, cell.clue_number]
		);
	}
}
