<script lang="ts">
	import { onMount } from 'svelte';
	import { quintOut } from 'svelte/easing';
	import { fly, scale } from 'svelte/transition';
	import { page } from '$app/stores';

	export let menu_items: { name: string; url: string }[];

	let open: boolean = false;
	let mobile: boolean = false;

	let windowWidth: number = 0;
	let prevWindowWidth: number = 99999;

	onMount(() => {
		windowWidth = window.innerWidth;
		prevWindowWidth = windowWidth;
		handleResize();
	});

	function handleResize() {
		prevWindowWidth = windowWidth;
		windowWidth = window.innerWidth;
		mobile = windowWidth <= 1024;
		if (windowWidth <= 1024 && prevWindowWidth > 1024) {
			open = false;
		}
	}
</script>

<svelte:window on:resize={handleResize} />

<div class="main">
	<a href="/" class="logo">PLACEHOLDER</a>
	<nav class="menu">
		{#each menu_items as menu_item, i}
			{#if open}
				<a
					href={menu_item.url}
					class="menu-item"
					class:active={$page.url.pathname === menu_item.url}
					transition:fly={{ y: -15, delay: 50 * i }}
				>
					{menu_item.name}
				</a>
			{/if}
		{/each}
	</nav>
	<button class="burger" on:click={() => (open = !open)}>
		{#if open}
			<div class="burger-container" transition:scale={{ delay: 50, easing: quintOut }}>
				<div class="cross-1" />
				<div class="cross-2" />
			</div>
		{:else}
			<div class="burger-container" transition:scale={{ delay: 50, easing: quintOut }}>
				<div class="bar-1" />
				<div class="bar-2" />
				<div class="bar-3" />
			</div>
		{/if}
	</button>
</div>

<style>
	.main {
		display: flex;
		position: relative;
		margin: -0.6vh -0.8vw 0 -0.6vh;
		min-height: 128px;
		flex-direction: row;
		align-items: center;
		background-color: var(--dark);
	}

	.logo {
		flex-basis: content;
		margin-left: 2vw;
		font-size: 2rem;
		font-weight: 800;
		text-decoration: none;
	}

	.burger {
		--burger-height: 3vh;
		background-color: transparent;
		margin-right: 2vw;
		aspect-ratio: 1;
		height: var(--burger-height);
		border: none;
		border-radius: 5px;
	}

	.burger:hover {
		transform: scale(1.15);
	}

	.burger-container > div {
		height: 2px;
		min-width: calc(var(--burger-height) - 16px);
		background-color: var(--light);
		position: relative;
	}

	.bar-1 {
		transform: translateY(calc(var(--burger-height) / -5));
	}
	.bar-3 {
		transform: translateY(calc(var(--burger-height) / 5));
	}

	.cross-1 {
		transform-origin: center;
		transform: rotateZ(45deg) translateX(1px);
	}
	.cross-2 {
		transform-origin: center;
		transform: rotateZ(-45deg) translateX(1px);
	}

	.menu {
		margin-left: auto;
		background-color: transparent;
		margin-right: 2vw;
	}

	.menu > .menu-item {
		text-decoration: none;
		margin: 0 1vw 0 1vw;
	}

	.menu-item {
		font-size: 1.5rem;
		font-weight: 500;
	}

	a {
		color: var(--light);
		transition: 0.2s;
	}

	a:hover {
		color: var(--bg-1);
	}

	a.active {
		color: var(--bg-2);
	}

	a.active:hover {
		color: var(--bg-1);
	}
</style>
