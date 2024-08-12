<script lang="ts">
	import { Cell } from '../cell';
	import { type Cell as TCell } from '$lib/stores/puzzles';
	export let cells: TCell[];
</script>

<div class="col-auto grid grid-flow-row grid-cols-5 justify-center gap-2 caret-transparent">
	{#each cells as cell}
		<Cell clueNumber={cell.clueNumber} id={cell.id} disabled={cell.disabled}></Cell>
	{/each}
</div>
