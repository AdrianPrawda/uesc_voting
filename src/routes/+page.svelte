<script lang="ts">
	import { enhance } from '$app/forms';

	export let form;

	let createUser: boolean = false;
</script>

<div class="text-content">
	<h1>The Unofficial Eurovision Song Contest Vote 2024!</h1>
	<h1>Vote now!</h1>
</div>

<form method="POST" class="content" use:enhance action={createUser ? '?/create' : '?/login'}>
	<label>
		Username
		<input class="default" type="text" name="username" id="username" autocomplete="off" />
	</label>
	<label>
		Pin (Optional)
		<input class="default" type="password" name="pin" id="pin" autocomplete="off" />
	</label>
	{#if createUser}
		<label>
			Pin (Repeat)
			<input class="default" type="password" name="pin2" id="pin2" autocomplete="off" />
		</label>
	{/if}
	{#if form?.error}
		<p class="warn">{form?.error}</p>
	{/if}
	<button class="default">{createUser ? 'Create' : 'Login'}</button>
	<button class="text" on:click|preventDefault={() => (createUser = !createUser)}>
		{createUser ? 'Login instead' : 'Create new user insted'}
	</button>
</form>

<style>
	.content {
		display: flex;
		position: relative;
		align-items: center;
		flex-direction: column;
		gap: 1.5vh;
		margin-top: 12vh;
	}

	.text-content {
		display: flex;
		position: relative;
		align-items: center;
		flex-direction: column;
		margin-top: 5vh;
	}

	h1 {
		font-size: 2rem;
		color: var(--light);
	}

	label {
		font-size: 1.25rem;
		display: flex;
		flex-direction: column;
		color: var(--light);
	}

	input[type='text'] {
		min-width: 40vw;
	}
	input[type='password'] {
		max-width: 25vw;
	}

	p.warn {
		color: var(--warn);
		font-weight: 500;
		font-size: 1.1rem;
		margin-top: -0.1vh;
		margin-bottom: -0.1vh;
	}
</style>
