import { renumberCells, renumberClues } from '$lib/helpers/puzzlehelper';
import type { ICell, IClue, IPuzzle } from '$lib/types/puzzle.types';
import { writable } from 'svelte/store';

export const unsaved_puzzle = writable<IPuzzle | null>(null);
export const unsaved_state = writable<boolean>(false);
export const selected_cell = writable<ICell | null>(null);

export const updatePuzzleCell = (newCell: ICell) => {
	// TODO: let user know that updating a cell might delete all of the clues due to reordering
	unsaved_puzzle.update((puz) => {
		if (!puz) return null;
		let isDisabledChange = false;
		const updatedCells = puz.cells.map((cell) => {
			if (cell.id === newCell.id) {
				isDisabledChange = cell.disabled !== newCell.disabled;
				return { ...newCell };
			}
			return cell;
		});
		const renumberedCells = renumberCells(updatedCells, Math.sqrt(puz.cells.length));
		const renumberedClues = renumberClues(renumberedCells, puz.clues);
		return {
			...puz,
			cells: renumberedCells,
			clues: isDisabledChange ? renumberedClues : puz.clues
		};
	});
};

export const updatePuzzleClue = (newClue: IClue) => {
	unsaved_puzzle.update((puz) => {
		if (!puz) return null;
		// TODO: would be nice to use ID here for the lookup, but renumbering puts all cells to -1
		// direction + number should work as a unique constraint
		const updatedClues = puz.clues.map((clue) => {
			return clue.direction === newClue.direction && clue.number === newClue.number
				? { ...newClue }
				: clue;
		});
		return { ...puz, clues: updatedClues };
	});
};
