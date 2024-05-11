<script lang="ts">
	import { getCountryName, type CountryISO } from '$lib/countries';
	import * as Flag from 'svelte-flag-icons';

	export let country: CountryISO;
	export let size: number = 64;
	export let lang: 'en' | 'de' = 'en';

	export let rank: number = 0;
	export let score: number = 1;

	const fs: number = size - 32;
	const height: number = size * 0.75;

	function formatScore(): string {
		if (Number.isInteger(score)) {
			return `${score}/10`;
		}
		return `${(score + Number.EPSILON).toFixed(2)}/10`;
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
		<p class="score" style="font-size: {fs}px;">{formatScore()}</p>
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

	p.score {
		border: none;
		background: transparent;
		font-weight: 800;
		color: var(--dark);
		margin: 0 0 0 8px;
		padding: 0;
	}
</style>
