<script lang="ts">
	import { unsaved_puzzle } from '$lib/stores/puzzles';
	import { Cell } from '../cell';

	$: unsaved_cells = $unsaved_puzzle?.cells || [];

	interface UpdateValueDetail {
		id: number;
		newValue: string;
	}

	const updateCellValue = (event: CustomEvent<UpdateValueDetail>) => {
		const { id, newValue } = event.detail;
		unsaved_puzzle.update((puz) => {
			if (!puz) return null;
			const updatedCells = puz.cells.map((cell) =>
				cell.id === id ? { ...cell, value: newValue } : cell
			);
			return { ...puz, cells: updatedCells };
		});
	};
</script>

<div class="col-auto grid grid-flow-row grid-cols-5 justify-center gap-2 caret-transparent">
	{#each unsaved_cells as cell}
		<Cell
			clue_number={cell.clue_number}
			id={cell.id}
			disabled={cell.disabled}
			value={cell.value}
			on:updateValue={updateCellValue}
		></Cell>
	{/each}
</div>
