<script lang="ts">
	import { getCountryName, type CountryISO } from '$lib/countries';
	import * as Flag from 'svelte-flag-icons';

	export let country: CountryISO;
	export let size: number = 64;
	export let lang: 'en' | 'de' = 'en';

	export let rank: number = 0;
	export let score: number = 1;

	export let id: string = country;

	const fs: number = size - 32;
	const height: number = size * 0.75;

	let scoreText: string = `${score}/10`;

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

	function shrinkScoreText() {
		scoreText = `${score}`;
	}

	function expandScoreText() {
		scoreText = `${score}/10`;
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
		<p class="desc-score" style="font-size: {fs}px;">{rank}</p>
	</div>
	<div class="score-secondary">
		<input
			class="score"
			style="height: {height}px; width: {size * 1.5}px; font-size: {fs}px;"
			type="text"
			autocomplete="off"
			aria-label={scoreText}
			value={scoreText}
			on:change={handleScoreChance}
			on:focusin={shrinkScoreText}
			on:focusout={expandScoreText}
		/>
		<input type="hidden" class="score" {id} name={id} value={score} />
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

	p.desc-score {
		transform: initial;
		transform: skewX(15deg);
		margin: 0;
		padding: 0px 1rem 0px 1rem;
		font-weight: 800;
		color: var(--light);
	}
</style>
