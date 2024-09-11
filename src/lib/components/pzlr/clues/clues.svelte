<script lang="ts">
	import Clue from '../clue/clue.svelte';
	import { unsaved_puzzle, updatePuzzleClue } from '$lib/stores/puzzles';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import type { IClue } from '$lib/types';

	$: clues = $unsaved_puzzle?.clues;
	$: acrossClues = clues?.filter((c) => c.direction === 'across');
	$: downClues = clues?.filter((c) => c.direction === 'down');

	const updateClueValue = (event: CustomEvent<IClue>) => {
		updatePuzzleClue(event.detail);
	};
</script>

{#if acrossClues && downClues}
	<ScrollArea>
		<div class="clues">
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Across</h4>
			{#each acrossClues as clue}
				<Clue
					value={clue.value}
					{clue}
					on:updateValue={updateClueValue}
				/>
			{/each}
			<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">Down</h4>
			{#each downClues as clue}
				<Clue
					value={clue.value}
					{clue}
					on:updateValue={updateClueValue}
				/>
			{/each}
		</div>
	</ScrollArea>
{/if}

<style>
	.clues {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		width: 336px;
		height: 500px;
		max-height: 500px;
		padding-right: 1em;
	}
</style>
