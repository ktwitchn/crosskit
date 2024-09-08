<script lang="ts">
	import { Puzzle } from '$lib/components/pzlr/puzzle';
	import { unsaved_puzzle, unsaved_state } from '$lib/stores/puzzles';
	import type { PageData } from './$types';
	import Toolbar from '$lib/components/pzlr/toolbar/toolbar.svelte';

	export let data: PageData;
	$: puzzle = data?.puzzle ?? null;

	$: if (puzzle !== null) {
		unsaved_puzzle.subscribe((val) => {
			// if the unsaved puzzle changes, send state
			unsaved_state.set(val !== puzzle);
		});
		unsaved_puzzle.set(puzzle);
	}
</script>

<div class="container">
	<div class="wrapper">
		<Puzzle></Puzzle>
		<Toolbar></Toolbar>
	</div>
</div>

<style>
	.container {
		display: flex;
		padding: 1em;
		justify-content: center;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 1em;
		align-items: end;
	}
</style>
