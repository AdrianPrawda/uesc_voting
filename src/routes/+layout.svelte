<script lang="ts">
	import { Navbar } from '$lib/components';

	export let data;

	const menu_items = [
		{ name: 'Vote', url: '/vote' },
		{ name: 'Results', url: '/results' }
	];
	if (data.userLoggedIn) {
		menu_items.push({ name: 'Logout', url: '/logout' });
	} else {
		menu_items.push({ name: 'Login', url: '/login' });
	}
	if (data.adminLoggedIn) {
		menu_items.push({ name: 'Admin Logout', url: '/logout/admin' });
	} else {
		menu_items.push({ name: 'Admin Panel', url: '/admin' });
	}
</script>

<Navbar {menu_items} />

<slot />

<style>
	/* color variables */
	:global(:root) {
		--bg-1: #ff7715;
		--bg-2: #ff47df;
		--bg-3: #ffda16;
		--bg-4: #3f1c71;
		--bg-5: #662cb5;
		--bg-6: #555555;
		--dark: #222222;
		--light: #ebebeb;
	}

	:global(*) {
		font-family: 'Poppins', sans-serif;
		color: var(--light);
	}

	:global(body) {
		line-height: 1.5;
		background-color: var(--bg-4);
		background: linear-gradient(250deg, var(--bg-1) 20%, var(--bg-2));
		height: calc(100vh - 2rem);
	}
</style>
