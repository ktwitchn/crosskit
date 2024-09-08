<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import '../app.css';
	import { ModeWatcher, toggleMode, mode } from 'mode-watcher';
	import { Moon, Sun } from 'lucide-svelte';
</script>

<ModeWatcher />
<div class="container">
	<slot></slot>
	<Button
		size="icon"
		variant="ghost"
		class="w-12"
		on:click={toggleMode}
	>
		{#if $mode === 'light'}
			<Moon />
		{:else}
			<Sun />
		{/if}
	</Button>
</div>

<style>
	.container {
		display: flex;
		gap: 1em;
		padding: 1em;
		justify-content: space-between;
	}
</style>
