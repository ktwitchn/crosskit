<script lang="ts">
	import { Puzzle } from '$lib/components/pzlr/puzzle';
	import { unsaved_puzzle } from '$lib/stores/puzzles';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	let unsaved_state = false;
	let loading = false;
	export let data: PageData;
	$: puzzle = data?.puzzle ?? null;
	$: unsaved_puz = $unsaved_puzzle;
	$: if (puzzle !== null) {
		unsaved_puzzle.subscribe((val) => {
			// if the unsaved puzzle changes, prompt user to save
			unsaved_state = puzzle !== val;
		});
		unsaved_puzzle.set(puzzle);
	}
	async function onSave() {
		try {
			loading = true;
			const response = await fetch(`/api/save`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(unsaved_puz)
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			unsaved_state = false;
		} catch (error) {
			console.error('Error updating puzzle:', error);
			throw error;
		} finally {
			loading = false;
		}
	}
</script>

<div class="container">
	<div class="wrapper">
		<Puzzle></Puzzle>
		<Button
			size="sm"
			class="w-1/4"
			on:click={onSave}
			disabled={!unsaved_state || loading}
			>{#if loading}
				Saving...
			{:else}
				Save
			{/if}</Button
		>
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
