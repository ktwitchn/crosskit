import type { Cell } from '$lib/stores/puzzles';

export const createPuzzle = (name: string, description: string) => {
	let cells = initializeCells(5, 5);
	return {
		name,
		description,
		clues: [],
		cells
	};
};

export const initializeCells = (rows: number, cols: number): Cell[] => {
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
