import type { ICell, IClue } from '$lib/types/puzzle.types';

export const createDummyPuzzle = () => {
	let cells = initializeCells(5, 5);
	let clues = initalizeClues(cells);
	return {
		id: crypto.randomUUID(),
		name: 'unnamed',
		clues,
		cells,
		description: null
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
				clue_number: row === 1 ? col : col === 1 ? row + rows - 1 : null,
				value: '',
				shared_clue: col === 1 && row === 1
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
			// TODO: (known bug) - this logic sucks ass and there are issues with
			// using leftMost as a hard and fast rule. too lazy to fix for 5x5 puzzles
			if (
				!isDisabled &&
				(isTopRow ||
					isLeftmostColumn ||
					!foundLeftmostColumn ||
					(!isLeftCellDisabled && isAboveCellDisabled))
			) {
				let isSharedCell =
					(isLeftmostColumn && isAboveCellDisabled) ||
					(isTopRow && isLeftCellDisabled) ||
					(isLeftCellDisabled && isAboveCellDisabled) ||
					(isTopRow && isLeftmostColumn);
				let temp = cells.find((cell) => cell.location === cellLocation);
				if (temp)
					renumberedCells.push({
						...temp,
						clue_number: currentClueNumber,
						shared_clue: isSharedCell
					});
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
				if (temp) renumberedCells.push({ ...temp, clue_number: null });
			}
		}
	}

	return renumberedCells;
};

export const renumberClues = (cells: ICell[], clues: IClue[]): IClue[] => {
	let newClues: IClue[] = [];
	for (const cell of cells) {
		if (!cell.clue_number) continue;

		const { column, row } = parseCellLocation(cell.location);
		const aboveCell = `c${column}-r${row - 1}`;
		const leftCell = `c${column - 1}-r${row}`;
		const isAboveCellDisabled = cells.some((cell) => cell.location === aboveCell && cell.disabled);
		const isLeftCellDisabled = cells.some((cell) => cell.location === leftCell && cell.disabled);

		// TODO: (known bug) - column > row is not a robust way to check clue location
		if (column > row || cell.shared_clue || isAboveCellDisabled) {
			newClues.push({
				id: -1,
				puzzle_id: cell.puzzle_id,
				number: cell.clue_number,
				value: '',
				direction: 'down'
			});
			if (!cell.shared_clue) continue;
		}
		if (column < row || cell.shared_clue || isLeftCellDisabled) {
			newClues.push({
				id: -1,
				puzzle_id: cell.puzzle_id,
				number: cell.clue_number,
				value: '',
				direction: 'across'
			});
		}
	}
	return newClues;
};

export const parseCellLocation = (location: string): { column: number; row: number } => {
	const [columnStr, rowStr] = location.split('-');

	const column = parseInt(columnStr.slice(1), 10);
	const row = parseInt(rowStr.slice(1), 10);

	return {
		column,
		row
	};
};
