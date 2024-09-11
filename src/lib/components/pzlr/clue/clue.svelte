<script lang="ts">
	import type { FormTextareaEvent } from '$lib/components/ui/textarea';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import type { IClue } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	export let clue: IClue;
	export let value: string;
	$: ({ number } = clue);

	const dispatch = createEventDispatcher();

	const onBlur = (event: FormTextareaEvent<FocusEvent>) => {
		const newValue = event.currentTarget.value;
		value = newValue;
		dispatch('updateValue', { ...clue, value });
	};
</script>

<!-- 
Clue id might be -1 here due to how clue renumbering works so basically id is useless?
TODO: fix this ^	
-->
<div class="clue">
	<div>{number}</div>
	<Textarea
		maxlength={255}
		on:blur={onBlur}
		bind:value
	/>
</div>

<style>
	.clue {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}
</style>
