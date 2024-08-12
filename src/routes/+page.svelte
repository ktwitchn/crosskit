<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Puzzles } from '$lib/components/mol/puzzles';
	import { Cells } from '$lib/components/mol/cells';
	import { toggleMode } from 'mode-watcher';
	import { puzzles, type Puzzle } from '$lib/stores/puzzles';

	let puzzle_val: Puzzle[];
	puzzles.subscribe((value) => {
		puzzle_val = value;
	});
</script>

<div class="container">
	<Puzzles></Puzzles>
	<div>
		<Cells cells={puzzle_val[0].cells}></Cells>
	</div>
	<Button on:click={toggleMode}>Mode</Button>
</div>

<style>
	.container {
		display: flex;
		gap: 1em;
		padding: 1em;
		justify-content: space-between;
	}
</style>
