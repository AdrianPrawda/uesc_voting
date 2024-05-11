<script lang="ts">
	import VotingResult from '$lib/components/VotingResult.svelte';
	import { getCountryName } from '$lib/countries';
	import type { Vote } from '$lib/server/votes';
	import timer from '$lib/timer';
	import { onDestroy, onMount } from 'svelte';
	import { flip } from 'svelte/animate';

	const poll = timer(1000 * 60);
	const unsubscribe = poll.subscribe((n) => {
		updateResults();
		console.log(`Poll update id: ${n}`);
	});

	let results: Vote[] = [];

	onMount(async function () {
		const resp = await fetch('/api/results');
		const data: Vote[] = (await resp.json())?.data ?? [];
		results = data;
	});

	onDestroy(() => unsubscribe);

	async function updateResults() {
		const resp = await fetch('/api/results');
		if (resp.status !== 200) {
			console.log(`Error updating status: ${resp.status}`);
			return;
		}

		const votes: Vote[] | undefined = (await resp.json())?.data;
		if (votes) {
			results = votes;
		}
	}
</script>

<h1>Hello from /result</h1>

{#if results.length === 0}
	<h1>No results yet!</h1>
{:else}
	<div class="content">
		{#each results as result (result.country)}
			<div
				class="item-container"
				animate:flip={{ duration: 200 }}
				aria-label="Flag of {getCountryName(result.country, 'en')}"
			>
				<svelte:component
					this={VotingResult}
					country={result.country}
					rank={result.rank}
					score={result.score}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.content {
		margin: 6vh 8vw 0 8vw;
	}

	.item-container {
		margin: 0.25em 0 0.25em 0;
	}
</style>
