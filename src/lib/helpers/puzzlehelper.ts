import type { ICell, IPuzzle } from '$lib/stores/puzzles';
import { puzzles } from '$lib/stores/puzzles';

let puzzles_value: IPuzzle[];
puzzles.subscribe((value) => {
	puzzles_value = value;
});

export const createPuzzle = () => {
	let id = Date.now.toString();
	let cells = initializeCells(5, 5);
	let name = 'untitled' + puzzles_value.length;
	return {
		id,
		name,
		clues: [],
		cells
	};
};

export const initializeCells = (rows: number, cols: number): ICell[] => {
	const newCells = [];
	for (let row = 1; row <= rows; row++) {
		for (let col = 1; col <= cols; col++) {
			const cellId = `c${col}-r${row}`;
			newCells.push({
				id: cellId,
				disabled: false,
				clueNumber: row === 1 ? `${col}` : col === 1 ? `${row + rows - 1}` : undefined,
				value: ''
			});
		}
	}
	return newCells;
};
