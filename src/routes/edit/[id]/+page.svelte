<script lang="ts">
	import { Puzzle } from '$lib/components/pzlr/puzzle';
	import { selected_cell, unsaved_puzzle, unsaved_state } from '$lib/stores/puzzles';
	import type { PageData } from './$types';
	import Toolbar from '$lib/components/pzlr/toolbar/toolbar.svelte';
	import { Clues } from '$lib/components/pzlr/clues';

	export let data: PageData;
	$: puzzle = data?.puzzle ?? null;

	$: if (puzzle !== null) {
		unsaved_puzzle.subscribe((val) => {
			// if the unsaved puzzle changes, send state
			unsaved_state.set(val !== puzzle);
		});
		unsaved_puzzle.set(puzzle);
		// navigating here for the first time sets the selected cell to null
		selected_cell.set(null);
	}
</script>

<div class="container">
	<Clues />
	<div class="wrapper">
		<Puzzle></Puzzle>
		<Toolbar></Toolbar>
	</div>
</div>

<style>
	.container {
		display: flex;
		padding: 1em;
		gap: 1em;
		justify-content: center;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1em;
		align-items: end;
	}
	@media screen and (max-width: 1050px) {
		.container {
			flex-direction: column-reverse;
			align-items: center;
			justify-content: flex-end;
		}
	}
</style>
