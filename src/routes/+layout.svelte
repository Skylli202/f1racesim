<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { invalidate } from '$app/navigation';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: ({ supabase, session } = data);

	onMount(async () => {
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		const boostrap = await import('bootstrap');
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	const signOut = async () => {
		const foo = await supabase.auth.signOut();
		if (foo.error && foo.error.status) {
			throw error(foo.error.status, 'Oops, something bad happened');
		}
	};
</script>

<svelte:head>
	<title>F1 Race sim</title>
</svelte:head>

<div class="container">
	<div class="container p-0">
		<nav class="navbar">
			<div class="container-fluid">
				<a class="navbar-brand" href="/">F1 Race sim</a>
				<div>
					{#if session}
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<btn on:click={signOut} class="btn btn-sm btn-outline-primary">Logout</btn>
					{:else}
						<!-- else content here -->
						<a class="btn btn-sm btn-outline-primary" href="/login">Log In</a>
						<a class="btn btn-sm btn-outline-primary" href="/signup">Sign Up</a>
					{/if}
				</div>
			</div>
		</nav>
	</div>
	<slot />
</div>
