<script lang="ts">
	import type { IPuzzle } from '$lib/types/puzzle.types';
	import { Cells } from '../cells';
	export let puzzle: IPuzzle | null;
</script>

{#if puzzle === null || puzzle === undefined}
	<h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">Select a puzzle</h3>
{:else}
	<div class="puzzle-area-container">
		<h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">{puzzle.name}</h3>

		<div>
			<Cells cells={puzzle.cells}></Cells>
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
