<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { createPuzzle } from '$lib/helpers/puzzlehelper';
	import { puzzles, selected_puzzle, type IPuzzle } from '$lib/stores/puzzles';

	let puzzles_val: IPuzzle[];
	puzzles.subscribe((value) => (puzzles_val = value));

	const handleCreatePuzzle = () => {
		let new_puzzle = createPuzzle();
		puzzles.update((prev) => [new_puzzle, ...prev]);
		selected_puzzle.set(new_puzzle);
	};

	const handleSelectPuzzle = (puzzle: IPuzzle) => {
		selected_puzzle.set(puzzle);
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
			{#each puzzles_val as puzzle}
				<Button
					variant="ghost"
					on:click={() => {
						handleSelectPuzzle(puzzle);
					}}
				>
					{puzzle.name}
				</Button>
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
