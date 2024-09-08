<script lang="ts">
	import { unsaved_puzzle, updatePuzzleCell } from '$lib/stores/puzzles';
	import type { ICell } from '$lib/types';
	import { Cell } from '../cell';

	$: unsaved_cells = $unsaved_puzzle?.cells || [];

	const updateCellValue = (event: CustomEvent<ICell>) => {
		updatePuzzleCell(event.detail);
	};
</script>

<div class="cellsContainer">
	{#each unsaved_cells as cell}
		<Cell
			location={cell.location}
			puzzle_id={cell.puzzle_id}
			clue_number={cell.clue_number}
			id={cell.id}
			disabled={cell.disabled}
			value={cell.value}
			on:updateValue={updateCellValue}
		></Cell>
	{/each}
</div>

<style>
	.cellsContainer {
		/* TODO make these height and widths dynamic based on cell size */
		height: 416px; /* (cell (80px) * 5) + (gap (4px) * 4) */
		width: 416px;
		display: grid;
		grid-column: auto;
		grid-auto-flow: row;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 4px;
		caret-color: transparent;
	}
</style>
