<script lang="ts">
	import { count } from '$lib/stores/counts';

	let count_value: number;
	count.subscribe((value) => (count_value = value));

	function handleClick() {
		count.update((n) => n + 1);
	}
</script>

<button on:click={handleClick}>
	Clicked {count_value}
	{count_value === 1 ? 'time' : 'times'}
</button>
