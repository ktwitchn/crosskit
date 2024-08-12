<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { createPuzzle } from '$lib/helpers/puzzlehelper';
	import { puzzles, type Puzzle } from '$lib/stores/puzzles';

	let puzzles_val: Puzzle[];
	puzzles.subscribe((value) => (puzzles_val = value));

	const handleCreatePuzzle = () => {
		puzzles.update((prev) => [createPuzzle('new name', 'newer description'), ...prev]);
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

	{#each puzzles_val as puzzle}
		<Card.Root>
			<Card.Header>
				<Card.Title>{puzzle.name}</Card.Title>
				<Card.Description>{puzzle.description}</Card.Description>
			</Card.Header>
		</Card.Root>
	{/each}
</div>

<style>
	.puzzles-container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 100%;
		min-width: 15em;
	}
	@media screen and (min-width: 550px) {
		.puzzles-container {
			width: 25%;
		}
	}
</style>
