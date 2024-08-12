<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Puzzles } from '$lib/components/mol/puzzles';
	import { toggleMode } from 'mode-watcher';
</script>

<div class="container">
	<Puzzles></Puzzles>
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
