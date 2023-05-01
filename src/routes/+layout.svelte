<script lang="ts">
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { onMount } from 'svelte';
	onMount(async () => {
		const boostrap = await import('bootstrap');
	});
</script>

<slot />
