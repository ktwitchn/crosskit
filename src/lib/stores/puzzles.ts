import { renumberCells } from '$lib/helpers/puzzlehelper';
import type { ICell, IPuzzle } from '$lib/types/puzzle.types';
import { writable } from 'svelte/store';

export const unsaved_puzzle = writable<IPuzzle | null>(null);
export const unsaved_state = writable<boolean>(false);
export const selected_cell = writable<ICell | null>(null);

export const updatePuzzleCell = (newCell: ICell) => {
	unsaved_puzzle.update((puz) => {
		if (!puz) return null;
		const updatedCells = puz.cells.map((cell) => (cell.id === newCell.id ? { ...newCell } : cell));
		const renumberedCells = renumberCells(updatedCells, Math.sqrt(puz.cells.length));
		return { ...puz, cells: renumberedCells };
	});
};
