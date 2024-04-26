<script lang="ts">
	import { dndzone, type DndEvent, type Item } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { UserVote } from '$lib/components';
	import { countries, getCountryName, type CountryISO } from '$lib/countries';

	const flipDurationMs: number = 200;

	interface DndItem {
		id: number;
		country: CountryISO;
		rank: number;
		score: number;
	}

	let items: DndItem[] = countries.map((c, i) => ({
		id: i,
		country: c,
		rank: calculatePositionalRank(i),
		score: 1
	}));

	function handleSort(event: CustomEvent<DndEvent<DndItem>>) {
		event.detail.items.forEach((item, i) => {
			item.rank = calculatePositionalRank(i);
		});
		items = event.detail.items;
	}

	function handleFinalize(event: CustomEvent<DndEvent<DndItem>>) {
		// TODO: Implement, identical to handleSort() for now
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

	function calculatePositionalRank(index: number): number {
		if (index == 0) return 12;
		if (index == 1) return 10;
		return Math.max(0, 10 - index);
	}
</script>

<div class="content">
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
				<svelte:component this={UserVote} country={item.country} rank={item.rank} />
			</div>
		{/each}
	</section>
</div>

<style>
	.content {
		margin: 6vh 8vw 0 8vw;
	}

	.item-container {
		margin: 0.25em 0 0.25em 0;
	}
</style>
