import type { ICell, IClue } from '$lib/types/puzzle.types';

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

export const renumberCells = (cells: ICell[], rows: number) => {
	const renumberedCells: ICell[] = [];
	let currentClueNumber = 1;

	for (let row = 1; row <= rows; row++) {
		let foundLeftmostColumn = false; // Track if the leftmost column is found in the current row
		for (let col = 1; col <= cells.length / rows; col++) {
			const cellLocation = `c${col}-r${row}`;
			const isTopRow = row === 1;
			const isLeftmostColumn = col === 1;
			const isDisabled = cells.some((cell) => cell.location === cellLocation && cell.disabled);

			const aboveCellLocation = `c${col}-r${row - 1}`;
			const leftCellLocation = `c${col - 1}-r${row}`;
			const isAboveCellDisabled = cells.some(
				(cell) => cell.location === aboveCellLocation && cell.disabled
			);
			const isLeftCellDisabled = cells.some(
				(cell) => cell.location === leftCellLocation && cell.disabled
			);
			if (
				!isDisabled &&
				(isTopRow ||
					isLeftmostColumn ||
					!foundLeftmostColumn ||
					(!isLeftCellDisabled && isAboveCellDisabled))
			) {
				let temp = cells.find((cell) => cell.location === cellLocation);
				if (temp) renumberedCells.push({ ...temp, clue_number: currentClueNumber });
				currentClueNumber++;

				if (!foundLeftmostColumn) {
					// only number the next left most
					foundLeftmostColumn = true;
				}
				if (isLeftmostColumn) {
					foundLeftmostColumn = true; // Mark that the leftmost column is found in this row
				}
			} else {
				let temp = cells.find((cell) => cell.location === cellLocation);
				if (temp) renumberedCells.push({ ...temp, clue_number: undefined });
			}
		}
	}

	return renumberedCells;
};
