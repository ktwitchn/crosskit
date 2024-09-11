<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import '../app.css';
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import { Moon, Sun, PanelLeftClose, PanelLeftOpen } from 'lucide-svelte';
	import { menu_open } from '$lib/stores/navigation';
	import { onMount } from 'svelte';

	$: menu = $menu_open;
</script>

<ModeWatcher />
<div class="container">
	<div class="header">
		<div class="leftHeader">
			<h3 class="scroll-m-20 text-3xl font-bold tracking-tight">PZLR</h3>
			<Button
				size="icon"
				variant="ghost"
				on:click={() => menu_open.set(!menu)}
			>
				{#if menu}
					<PanelLeftClose />
				{:else}
					<PanelLeftOpen />
				{/if}
			</Button>
		</div>
		<Button
			size="icon"
			variant="ghost"
			class="w-12 self-end"
			on:click={toggleMode}
		>
			{#if $mode === 'light'}
				<Moon />
			{:else}
				<Sun />
			{/if}
		</Button>
	</div>
	<slot></slot>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		padding: 1em;
		height: 100vh;
		max-height: 100vh;
		overflow-y: hidden;
		min-width: 400px;
	}
	.header {
		display: flex;
		justify-content: space-between;
	}
	.leftHeader {
		display: flex;
		gap: 1em;
	}
</style>
