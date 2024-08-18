import { query } from '$lib/server/db';
import type { IPuzzle } from '$lib/types';

export async function getPuzzle(id: string): Promise<IPuzzle | null> {
	const client = await query.getClient();

	try {
		await client.query('BEGIN');
		const puzzle_resp = await client.query('SELECT * FROM puzzles WHERE id = $1', [id]);
		const puzzle = puzzle_resp.rows[0];
		const cells_resp = await client.query('SELECT * FROM cells WHERE puzzle_id = $1', [id]);
		const clues_resp = await client.query('SELECT * FROM clues WHERE puzzle_id = $1', [id]);
		await client.query('COMMIT');
		return <IPuzzle>{
			id: puzzle.id,
			name: puzzle.name,
			description: puzzle.description,
			cells: cells_resp.rows,
			clues: clues_resp.rows
		};
	} catch (e) {
		await client.query('ROLLBACK');
		throw e;
	} finally {
		client.release();
	}
}

export async function getPuzzles(): Promise<IPuzzle[]> {
	try {
		const result = await query.execute('SELECT * FROM puzzles ORDER BY name');
		return result.rows;
	} catch (error) {
		console.error('Error fetching puzzles:', error);
		throw new Error('Failed to fetch puzzles');
	}
}

/**
 * Adds a puzzle to the db
 * @param puzzle
 * @returns New puzzle object
 */
export async function addPuzzle(puzzle: IPuzzle): Promise<IPuzzle> {
	const { id, name, description, clues, cells } = puzzle;
	// Start a transaction
	const client = await query.getClient();
	try {
		await client.query('BEGIN');

		// Add puzzle
		const result = await client.query(
			'INSERT INTO puzzles (id, name, description) VALUES ($1, $2, $3) RETURNING *',
			[id, name, description]
		);

		const newPuzzle = result.rows[0];

		// Add cells
		for (const cell of cells) {
			await client.query(
				'INSERT INTO cells (puzzle_id, location, value, disabled, clue_number) VALUES ($1, $2, $3, $4, $5)',
				[id, cell.location, cell.value, cell.disabled, cell.clue_number]
			);
		}

		// Add clues
		for (const clue of clues) {
			await client.query(
				'INSERT INTO clues (puzzle_id, number, value, direction) VALUES ($1, $2, $3, $4)',
				[id, clue.number, clue.value, clue.direction]
			);
		}

		await client.query('COMMIT');
		return newPuzzle;
	} catch (e) {
		await client.query('ROLLBACK');
		throw e;
	} finally {
		client.release();
	}
}
