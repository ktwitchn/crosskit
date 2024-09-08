<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { createDummyPuzzle } from '$lib/helpers/puzzlehelper';
	import { createPuzzle } from '$lib/api';
	import type { IPuzzle } from '$lib/types/puzzle.types';
	import { fly } from 'svelte/transition';

	export let puzzles: IPuzzle[];

	const handleCreatePuzzle = async () => {
		const puzzle = createDummyPuzzle();
		try {
			const newPuzzle = await createPuzzle(puzzle);
			puzzles = [newPuzzle, ...puzzles];
		} catch (e) {
			console.error(e);
		}
	};
</script>

<div class="puzzles-container">
	<div class="flex justify-between">
		<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">My puzzles</h3>
		<Button
			size="sm"
			on:click={handleCreatePuzzle}>Create</Button
		>
	</div>

	<ScrollArea>
		<div class="puzzles-list">
			{#each puzzles as puzzle (puzzle.id)}
				<a
					in:fly={{ y: -30, duration: 600 }}
					href={'/edit/' + puzzle.id}
				>
					<Button
						variant="ghost"
						class="w-full justify-start"
					>
						{puzzle.name}
					</Button>
				</a>
			{/each}
		</div>
	</ScrollArea>
</div>

<style>
	.puzzles-container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		position: relative;
		max-width: 15em;
	}
	.puzzles-list {
		position: relative;
		height: 80vh;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-right: 1em;
	}
</style>
