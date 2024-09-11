<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		selected_cell,
		unsaved_puzzle,
		unsaved_state,
		updatePuzzleCell
	} from '$lib/stores/puzzles';

	let loading = false;
	$: unsaved_puz = $unsaved_puzzle;
	$: current_cell = $selected_cell;

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
			unsaved_state.set(false);
		} catch (error) {
			console.error('Error updating puzzle:', error);
			throw error;
		} finally {
			loading = false;
		}
	}
	const onDisable = (event: MouseEvent) => {
		if (current_cell) {
			selected_cell.set({ ...current_cell, disabled: !current_cell.disabled });
			if (unsaved_puz)
				updatePuzzleCell({ ...current_cell, disabled: !current_cell.disabled, value: ' ' });
		}
	};
</script>

{#if current_cell || $unsaved_state}
	<div class="toolbarContainer">
		<div>{current_cell?.location ?? 'Select a cell'} {current_cell?.value ?? ''}</div>
		<div>
			<Button
				size="sm"
				disabled={!current_cell}
				on:click={onDisable}>{current_cell?.disabled ? 'Enable' : 'Disable'}</Button
			>
			<Button
				size="sm"
				on:click={onSave}
				disabled={!$unsaved_state || loading}
				>{#if loading}
					Saving...
				{:else}
					Save
				{/if}</Button
			>
		</div>
	</div>
{/if}

<style>
	.toolbarContainer {
		display: flex;
		gap: 1em;
		justify-content: space-between;
		align-items: center;
		padding: 1em;
		border: 1px solid lightgray;
		border-radius: 0.5em;
		width: 100%;
	}
</style>
