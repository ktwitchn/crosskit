import { query } from '$lib/server/db';
import type { ICell } from '$lib/types';

export async function addCellsForPuzzle(puzzleId: string, cells: ICell[]): Promise<void> {
	for (const cell of cells) {
		await query.execute(
			'INSERT INTO cells (puzzle_id, location, value, disabled, clue_number, shared_cell) VALUES ($1, $2, $3, $4, $5, $6)',
			[puzzleId, cell.location, cell.value, cell.disabled, cell.clue_number, cell.shared_clue]
		);
	}
}
