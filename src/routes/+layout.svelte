<script lang="ts">
	import { Puzzles } from '$lib/components/mol/puzzles';
	import { Button } from '$lib/components/ui/button';
	import '../app.css';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ puzzles } = data);
</script>

<ModeWatcher />
<div class="container">
	<Puzzles {puzzles}></Puzzles>
	<slot></slot>
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
