<script lang="ts">
	import { dndzone, type DndEvent, type Item } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { UserVote } from '$lib/components';
	import { countries, getCountryName, type CountryISO } from '$lib/countries';
	import { onMount } from 'svelte';
	import type { Vote } from '$lib/server/votes';
	import { moveElement } from '$lib/util';
	import MediaQuery from 'svelte-media-queries';

	const flipDurationMs: number = 200;

	interface DndItem {
		id: number;
		country: CountryISO;
		rank: number;
		score: number;
	}

	let items: DndItem[] = [];
	let ranks: Map<number, CountryISO> = new Map<number, CountryISO>();

	function handleSort(event: CustomEvent<DndEvent<DndItem>>) {
		event.detail.items.forEach((item, i) => {
			item.rank = calculatePositionalRank(i);
		});
		items = event.detail.items;
	}

	async function handleFinalize(event: CustomEvent<DndEvent<DndItem>>) {
		updateRanks();

		const payload: Vote[] = event.detail.items.map((item, i) => ({
			country: item.country,
			rank: calculatePositionalRank(i),
			score: item.score
		}));

		// TODO: Handle error
		const resp = await fetch('/api/vote', {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		});

		console.log(`Finalize: ${resp.status}`);

		event.detail.items.forEach((item, i) => {
			item.rank = calculatePositionalRank(i);
		});
		items = event.detail.items;
	}

	function transformDraggedElement(element?: HTMLElement, data?: Item, index?: number) {
		// There may be a less hacky way to do this
		if (element && element.querySelector('p[class~=desc-score]')) {
			element.querySelector('p[class~=desc-score].desc-score')!.innerHTML =
				`${calculatePositionalRank(index ?? 0)}`;
		}
	}

	// TODO: Could be extracted
	function calculatePositionalRank(index: number): number {
		if (index == 0) return 12;
		if (index == 1) return 10;
		return Math.max(0, 10 - index);
	}

	async function handleVoteChange(vote: Vote) {
		const src = items.findIndex((e) => e.country === vote.country);

		if (src < 0) {
			console.log(`Invalid country code ${vote.country}`);
			return;
		}

		if (vote.rank === 12) {
			// move element to i = 0
			items = moveElement(items, src, 0);
		} else if (vote.rank === 10) {
			// move element to i = 1
			items = moveElement(items, src, 1);
		} else if (vote.rank <= 8 && vote.rank > 0) {
			// move element to i = 10 - rank
			items = moveElement(items, src, 10 - vote.rank);
		} else {
			// move element to i = 10
			items = moveElement(items, src, 10);
		}

		// update ranks
		items.forEach((item, i) => {
			item.rank = calculatePositionalRank(i);
		});

		// TODO: Extract
		// update server
		const payload: Vote[] = items.map((item, i) => ({
			country: item.country,
			rank: calculatePositionalRank(i),
			score: item.score
		}));

		const resp = await fetch('/api/vote', {
			method: 'POST',
			body: JSON.stringify(payload),
			headers: {
				'Content-Type': 'application/json;charset=UTF-8'
			}
		});

		console.log(`Vote changed: ${resp.status}`);
	}

	function updateRanks() {
		items.slice(0, 10).forEach((vote) => {
			ranks.set(vote.rank, vote.country);
		});
	}

	onMount(async function () {
		const resp = await fetch('/api/vote', { method: 'GET' });
		// TODO: Clean up messy logic
		let val: Vote[] = (await resp.json())?.data ?? initializeVotingList();
		if (val.length === 0) {
			val = initializeVotingList();
		}

		items = val.map((vote, i) => ({
			id: i,
			country: vote.country,
			rank: calculatePositionalRank(i),
			score: vote.score
		}));

		updateRanks();
	});

	function initializeVotingList(): Vote[] {
		return countries.map((country, i) => ({
			id: i,
			country: country,
			rank: calculatePositionalRank(i),
			score: 1
		}));
	}
</script>

<div class="content">
	<MediaQuery query="(max-width: 1200px)" let:matches>
		{#if matches}
			{#each items as item (item.id)}
				<div
					class="item-container"
					animate:flip={{ duration: flipDurationMs }}
					aria-label="Flag of {getCountryName(item.country, 'en')}"
				>
					<svelte:component
						this={UserVote}
						country={item.country}
						bind:rank={item.rank}
						bind:score={item.score}
						onChange={handleVoteChange}
					/>
				</div>
			{/each}
		{:else}
			<section
				use:dndzone={{ items, flipDurationMs, transformDraggedElement }}
				on:consider={handleSort}
				on:finalize={handleFinalize}
				aria-label="List of participating countries"
			>
				{#each items as item (item.id)}
					<div
						class="item-container"
						animate:flip={{ duration: flipDurationMs }}
						aria-label="Flag of {getCountryName(item.country, 'en')}"
					>
						<svelte:component
							this={UserVote}
							country={item.country}
							bind:rank={item.rank}
							bind:score={item.score}
							onChange={handleVoteChange}
						/>
					</div>
				{/each}
			</section>
		{/if}
	</MediaQuery>
</div>

<style>
	.content {
		margin: 6vh 8vw 0 8vw;
	}

	.item-container {
		margin: 0.25em 0 0.25em 0;
	}
</style>
