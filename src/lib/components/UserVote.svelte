<script lang="ts">
	import { getCountryName, type CountryISO } from '$lib/countries';
	import type { Vote } from '$lib/server/votes';
	import * as Flag from 'svelte-flag-icons';

	export let country: CountryISO;
	export let size: number = 64;
	export let lang: 'en' | 'de' = 'en';

	export let rank: number = 0;
	export let score: number = 1;

	export let id: string = country;

	// TODO: Change to custom signal / event
	export let onChange: (vote: Vote) => void = () => {};

	const fs: number = size - 32;
	const height: number = size * 0.75;

	let scoreText: string = `${score}/10`;
	let scoreType: string = 'text';

	let prevRank: number = rank;

	function update() {
		onChange({ country: country, score: score, rank: rank });
	}

	function handleScoreChance(event: any) {
		if (typeof event.target.value !== 'string') return;

		let valueIn: string = event.target.value;
		if (!valueIn.match(/^\d+.*$/g)) return;

		let valueOut: number = +(valueIn.match(/^(\d+)/)?.[0] ?? '1');

		if (valueOut < 1) {
			score = 1;
		} else if (valueOut > 10) {
			score = 10;
		} else {
			score = valueOut;
		}
	}

	function handleRankChange(event: any) {
		const value = Number.parseInt(event.target.value);
		const acceptedValues: number[] = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1, 0];

		if (acceptedValues.includes(value)) {
			rank = value;
			prevRank = rank;
		} else {
			rank = prevRank;
		}

		event.target.value = rank;
	}

	function handleRankFocusIn(event: any) {
		event.target.select();
	}

	function handleScoreFocusIn(event: any) {
		scoreText = `${score}`;
		scoreType = 'number';
		event.target.value = scoreText;
		event.target.select();
	}

	function handleScoreBlur() {
		scoreType = 'text';
		scoreText = `${score}/10`;
		update();
	}
</script>

<div class="container">
	<svelte:component
		this={Flag[country]}
		{size}
		ariaLabel="{lang === 'en' ? 'Flag of' : 'Flagge von'} {getCountryName(country, lang)}"
		style="height: {height}px;"
	/>
	<p class="desc" style="font-size: {fs}px;">
		{getCountryName(country, lang).toUpperCase()}
	</p>
	<div class="score-primary">
		<input
			class="rank"
			style="height: {height}px; width: {size * 0.75}px; font-size: {fs}px;"
			type="number"
			autocomplete="off"
			aria-label="Rank {rank}"
			value={rank}
			on:change={handleRankChange}
			on:focusin={handleRankFocusIn}
			on:blur={update}
		/>
		<input type="hidden" class="rank" id="rank_{id}" name="rank_{country}" value={rank} />
	</div>
	<div class="score-secondary">
		<input
			class="score"
			style="height: {height}px; width: {size * 1.5}px; font-size: {fs}px;"
			type={scoreType}
			autocomplete="off"
			aria-label={scoreText}
			value={scoreText}
			on:change={handleScoreChance}
			on:focusin={handleScoreFocusIn}
			on:blur={handleScoreBlur}
		/>
		<input type="hidden" class="score" id="score_{id}" name="score_{country}" value={score} />
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-flow: row;
		justify-content: flex-start;
		align-items: center;
		border: 2px solid var(--light);
		padding: 0;
		margin: 0;
		background: linear-gradient(90deg, var(--bg-4), var(--bg-5));
	}

	.score {
		border: none;
		background: transparent;
		font-weight: 800;
		color: var(--dark);
		margin: 0 0 0 8px;
		padding: 0;
	}

	.score:focus {
		outline: none;
	}

	.rank {
		transform: initial;
		transform: skewX(15deg);
		margin: 0;
		padding: 0px 1rem 0px 1rem;
		font-weight: 800;
		color: var(--light);
		border: none;
		background: transparent;
	}

	.rank:focus {
		outline: none;
	}

	.score-primary {
		margin-left: auto;
		margin-right: -0.4rem;
		display: inline-block;
		transform: skewX(-15deg);
		background: var(--bg-2);
	}

	.score-secondary {
		background: var(--light);
		padding-left: 1.5rem;
		padding-right: 0.5rem;
	}

	p.desc {
		margin-left: 20px;
		color: var(--light);
		margin: 0;
		margin-left: 16px;
		font-weight: 800;
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		display: none;
		margin: 0;
	}
</style>
