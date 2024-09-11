<script lang="ts">
	import { selected_cell } from '$lib/stores/puzzles';
	import type { ICell } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import type { FocusEventHandler, FormEventHandler } from 'svelte/elements';
	let maxLength = 1;
	export let cell: ICell;
	export let value: string;
	$: ({ id, disabled, clue_number } = cell);

	const dispatch = createEventDispatcher();

	const onInput: FormEventHandler<HTMLInputElement> = (event) => {
		const newValue = event.currentTarget.value;
		value = newValue; // Update the local value
		dispatch('updateValue', { ...cell, value });
	};
	const onFocus: FocusEventHandler<HTMLInputElement | HTMLDivElement> = (event) => {
		const target = event.currentTarget;
		selected_cell.set(cell);
		setTimeout(() => {
			if (target instanceof HTMLInputElement) {
				target.select();
			}
		}, 100);
	};
	const onClick = (event: MouseEvent) => {
		selected_cell.set(cell);
	};
	const onKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			selected_cell.set(cell);
		}
	};
</script>

{#if disabled}
	<div
		class="h-16 w-16 bg-slate-900 dark:bg-slate-400"
		on:click={onClick}
		on:keydown={onKeydown}
		on:focus={onFocus}
		role="button"
		tabindex="0"
	></div>
{:else}
	<div class="relative">
		{#if clue_number}
			<span
				class="absolute left-0 top-0 rounded bg-slate-200 px-1 py-0.5 text-xs font-semibold text-slate-900 dark:bg-slate-700 dark:text-white"
				>{clue_number}
			</span>
		{/if}
		<input
			type="text"
			id={id.toString()}
			class="h-16 w-16 bg-slate-100 text-center text-5xl uppercase text-slate-900 outline-none ring-1 ring-slate-900/5 selection:bg-transparent hover:bg-slate-200 focus:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus:bg-slate-600"
			maxlength={maxLength}
			autoComplete="off"
			bind:value
			on:input={onInput}
			on:focus={onFocus}
		/>
	</div>
{/if}
