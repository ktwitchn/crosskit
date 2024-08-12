<script lang="ts">
	import * as Card from '$lib/components/ui/card';

	let puzzles = [
		{
			name: 'Classic Crossword',
			description: 'A traditional crossword puzzle with a mix of general knowledge and trivia.'
		},
		{
			name: 'Themed Crossword: Movies',
			description: 'A crossword puzzle with clues and answers all related to popular movies.'
		},
		{
			name: 'Cryptic Crossword',
			description: 'A challenging crossword where the clues are riddles or wordplay.'
		},
		{
			name: 'Mini Crossword',
			description: 'A smaller, quicker crossword for a brief brain exercise.'
		},
		{
			name: 'Trivia Crossword: History',
			description: 'A crossword puzzle with questions focused on historical events and figures.'
		}
	];
</script>

<div class="puzzles-container">
	<h2
		class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
	>
		Puzzles
	</h2>
	{#each puzzles as puzzle}
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
