<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { unsaved_puzzle } from '$lib/stores/puzzles';
	import type { FormInputEvent } from '$lib/components/ui/input';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Check, Edit } from 'lucide-svelte';

	$: unsaved_puz = $unsaved_puzzle;
	$: edit = false;

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
	<div class="title">
		{#if edit}
			<Input
				type="text"
				bind:value={unsaved_puz.name}
				on:input={onChange}
			/>
		{:else}
			<h3 class="scroll-m-20 text-3xl font-semibold tracking-tight">{unsaved_puz.name}</h3>
		{/if}
		<Button
			variant="ghost"
			size="icon"
			on:click={() => (edit = !edit)}
		>
			{#if !edit}
				<Edit color="gray" />
			{:else}
				<Check />
			{/if}
		</Button>
	</div>
{/if}

<style>
	.title {
		display: flex;
		gap: 0.5em;
	}
</style>
