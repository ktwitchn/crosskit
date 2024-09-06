<script lang="ts">
	import { type ICell } from '$lib/types/puzzle.types';
	import { Cell } from '../cell';
	export let cells: ICell[];
</script>

<div class="col-auto grid grid-flow-row grid-cols-5 justify-center gap-2 caret-transparent">
	{#each cells as cell}
		<Cell clue_number={cell.clue_number} id={cell.id} disabled={cell.disabled} value={cell.value}
		></Cell>
	{/each}
</div>
