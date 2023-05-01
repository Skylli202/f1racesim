<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<svelte:head>
	<title>Log In</title>
</svelte:head>

<div class="row justify-content-center mt-5">
	<div class="col-md-8 col-lg-6 col-xl-4">
		<form class="vstack gap-3" method="POST" action="?/login" use:enhance>
			<div>
				<label class="form-label" for="email">Email:</label>
				<input class="form-control" type="text" name="email" id="email" />
			</div>
			<div>
				<label class="form-label" for="password">Password:</label>
				<input class="form-control" type="password" name="password" id="password" />
			</div>
			<button class="btn btn-outline-primary" type="submit">Log In</button>
		</form>
	</div>
</div>
