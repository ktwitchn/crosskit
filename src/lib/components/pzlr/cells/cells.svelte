<script lang="ts">
	import { unsaved_puzzle, updatePuzzleCell } from '$lib/stores/puzzles';
	import type { ICell } from '$lib/types';
	import { Cell } from '../cell';

	$: unsaved_cells = $unsaved_puzzle?.cells || [];

	const updateCellValue = (event: CustomEvent<ICell>) => {
		updatePuzzleCell(event.detail);
	};
</script>

<div class="col-auto grid grid-flow-row grid-cols-5 justify-center gap-2 caret-transparent">
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
