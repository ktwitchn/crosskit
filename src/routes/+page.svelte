<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Puzzles } from '$lib/components/mol/puzzles';
	import { toggleMode } from 'mode-watcher';
	import { Puzzle } from '$lib/components/mol/puzzle';
</script>

<div class="container">
	<Puzzles></Puzzles>
	<Puzzle></Puzzle>
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
