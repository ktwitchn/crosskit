<script lang="ts">
	import { count } from '$lib/stores/counts';

	let count_value: number;
	count.subscribe((value) => (count_value = value));
</script>

<h2>{count_value}</h2>
