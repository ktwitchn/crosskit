<script lang="ts">
	import type { PageData } from './$types';
	import { Puzzles } from '$lib/components/pzlr/puzzles';
	import { menu_open } from '$lib/stores/navigation';

	export let data: PageData;
	$: ({ puzzles } = data);
</script>

<div
	class="menu"
	style:display={$menu_open ? 'block' : 'none'}
>
	<Puzzles {puzzles}></Puzzles>
</div>
<div class="myPuzzles">
	<div
		class="dummyMenu"
		class:menu-open={$menu_open}
	></div>
	<slot></slot>
</div>

<style>
	.dummyMenu {
		display: none;
		width: 16em;
	}
	.dummyMenu.menu-open {
		display: block;
	}
	.menu {
		position: absolute;
		width: 16em;
		top: 78px; /* header(40px) padding-top(16px) gap(16px) padding(16px)*/
		background-color: hsl(var(--background) / var(--tw-bg-opacity));
		z-index: 99999;
		padding: 1em 1em 0 0;
		height: calc(100vh - 90px);
		box-shadow: 6px 0 8px -6px rgb(0 0 0 / 0.1);
	}
	.myPuzzles {
		flex-grow: 1;
		display: flex;
		gap: 1em;
	}
	@media screen and (max-width: 550px) {
		.dummyMenu {
			display: none !important;
		}
	}
</style>
