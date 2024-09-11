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
			value={cell.value}
			{cell}
			on:updateValue={updateCellValue}
		></Cell>
	{/each}
</div>

<style>
	.cellsContainer {
		/* TODO make these height and widths dynamic based on cell size */
		height: 336px; /* (cell (64px) * 5) + (gap (4px) * 4) */
		width: 336px;
		display: grid;
		grid-column: auto;
		grid-auto-flow: row;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 4px;
		caret-color: transparent;
	}
</style>
