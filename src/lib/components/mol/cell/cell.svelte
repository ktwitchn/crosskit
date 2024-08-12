<script lang="ts">
	let maxLength = 1;
	export let disabled = false;
	export let clueNumber: string | undefined = undefined;
	export let id: string;
</script>

{#if disabled}
	<div class="h-20 w-20 bg-slate-900 dark:bg-slate-400"></div>
{:else}
	<div class="relative">
		{#if clueNumber}
			<span
				class="absolute left-0 top-0 rounded bg-slate-200 px-1 py-0.5 text-xs font-semibold text-slate-900 dark:bg-slate-700 dark:text-white"
				>{clueNumber}
			</span>
		{/if}
		<input
			type="text"
			{id}
			class="h-20 w-20 bg-slate-100 text-center text-5xl uppercase text-slate-900 outline-none ring-1 ring-slate-900/5 selection:bg-transparent hover:bg-slate-200 focus:bg-slate-300 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus:bg-slate-600"
			maxlength={maxLength}
			autoComplete="off"
		/>
	</div>
{/if}
