import { puzzles } from '$lib/stores/puzzles';
import type { ICell, IClue, IPuzzle } from '$lib/types/puzzle.types';

export const createDummyPuzzle = () => {
	let cells = initializeCells(5, 5);
	let clues = initalizeClues(cells);
	return {
		id: crypto.randomUUID(),
		name: 'unnamed',
		clues,
		cells
	};
};

export const initializeCells = (rows: number, cols: number): ICell[] => {
	const newCells: ICell[] = [];
	for (let row = 1; row <= rows; row++) {
		for (let col = 1; col <= cols; col++) {
			const cellId = `c${col}-r${row}`;
			newCells.push({
				id: -1,
				puzzle_id: '',
				location: cellId,
				disabled: false,
				clue_number: row === 1 ? col : col === 1 ? row + rows - 1 : undefined,
				value: ''
			});
		}
	}
	return newCells;
};

export const initalizeClues = (cells: ICell[]): IClue[] => {
	const half = Math.sqrt(cells.length);
	const length = half * 2;
	const half_index1 = half + 1;
	const newClues: IClue[] = [];
	for (let i = 1; i < length + 1; i++) {
		newClues.push({
			id: -1,
			puzzle_id: '',
			number: i < half_index1 ? i : i === half_index1 ? 1 : i - 1,
			direction: i < half_index1 ? 'down' : 'across',
			value: ''
		});
	}
	return newClues;
};
