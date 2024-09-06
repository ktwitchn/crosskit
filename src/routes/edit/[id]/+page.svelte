<script lang="ts">
	import { Puzzle } from '$lib/components/pzlr/puzzle';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ puzzle } = data);
</script>

<div class="container">
	<Puzzle {puzzle}></Puzzle>
</div>

<style>
	.container {
		display: flex;
		gap: 1em;
		padding: 1em;
		justify-content: center;
	}
</style>
