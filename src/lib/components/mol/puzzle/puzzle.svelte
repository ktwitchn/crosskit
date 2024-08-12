<script lang="ts">
	import { selected_puzzle } from '$lib/stores/puzzles';
	import type { IPuzzle } from '$lib/types/puzzle.types';
	import { Cells } from '../cells';
	let puzzle_val: IPuzzle;
	selected_puzzle.subscribe((value) => {
		puzzle_val = value;
	});
</script>

{#if puzzle_val === undefined}
	<h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">Select a puzzle</h3>
{:else}
	<div class="puzzle-area-container">
		<h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">{puzzle_val.name}</h3>

		<div>
			<Cells cells={puzzle_val.cells}></Cells>
		</div>
	</div>
{/if}

<style>
	.puzzle-area-container {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
