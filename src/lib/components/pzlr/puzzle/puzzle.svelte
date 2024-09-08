<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { Cells } from '../cells';
	import { unsaved_puzzle } from '$lib/stores/puzzles';
	import type { FormInputEvent } from '$lib/components/ui/input';

	$: unsaved_puz = $unsaved_puzzle;

	const onChange = (event: FormInputEvent<Event>) => {
		const value = event.currentTarget.value;
		if (value) {
			unsaved_puzzle.update((current) => {
				if (!current) return null;
				return { ...current, name: value };
			});
		}
	};
</script>

{#if unsaved_puz === null}
	<h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">Select a puzzle</h3>
{:else}
	<div class="puzzle-area-container">
		{#if unsaved_puz?.name !== undefined}
			<Input
				type="text"
				bind:value={unsaved_puz.name}
				on:input={onChange}
			/>
		{/if}
		<!-- <h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">{puzzle.name}</h3> -->
		<div>
			<Cells></Cells>
		</div>
	</div>
{/if}

<style>
	.puzzle-area-container {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
