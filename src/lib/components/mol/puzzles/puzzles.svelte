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
		<h2
			class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
		>
			Puzzles
		</h2>
		<Button on:click={handleCreatePuzzle}>New</Button>
	</div>

	<ScrollArea>
		<div class="puzzles-list">
			{#each puzzles as puzzle (puzzle.id)}
				<a in:fly={{ y: -30, duration: 600 }} href={'/edit/' + puzzle.id}>
					<Button variant="ghost">
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
		width: 100%;
		min-width: 15em;
	}
	.puzzles-list {
		position: relative;
		height: 90vh;
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		margin-right: 1em;
	}
	@media screen and (min-width: 550px) {
		.puzzles-container {
			width: 25%;
		}
	}
</style>
