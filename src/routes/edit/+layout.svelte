<script lang="ts">
	import type { PageData } from './$types';
	import { Puzzles } from '$lib/components/pzlr/puzzles';

	export let data: PageData;
	$: ({ puzzles } = data);
</script>

<div class="myPuzzles">
	<Puzzles {puzzles}></Puzzles>
	<slot></slot>
</div>

<style>
	.myPuzzles {
		flex-grow: 1;
		display: flex;
		gap: 1em;
	}
</style>
