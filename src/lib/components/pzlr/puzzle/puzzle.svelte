<script lang="ts">
	import { Cells } from '../cells';
	import { unsaved_puzzle } from '$lib/stores/puzzles';
	import { PuzzleTitle } from '../puzzleTitle';

	$: unsaved_puz = $unsaved_puzzle;
</script>

{#if unsaved_puz === null}
	<h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">Select a puzzle</h3>
{:else}
	<div class="puzzle-title-grid">
		<PuzzleTitle />
		<Cells />
	</div>
{/if}

<style>
	.puzzle-title-grid {
		min-width: 336px;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
