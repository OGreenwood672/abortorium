<script lang="ts">
	import { onMount } from 'svelte';

	let neighbours: string[] = [];
	let depth = 2; // Number of levels of neighbours to fetch
	let csrid = 'og314'; // Example CSRID

	// Fetch data from the API endpoint
	async function fetchNeighbours() {
		const response = await fetch(
			`collegeroots/collegeroots/database?depth=${depth}&csrid=${csrid}`
		);
		if (response.ok) {
			neighbours = await response.json();
		} else {
			console.error('Failed to fetch data');
		}
	}

	onMount(() => {
		fetchNeighbours();
	});
</script>

<template>
	<h1>Neighbours of {csrid} up to depth {depth}</h1>
	<ul>
		{#each neighbours as neighbour}
			<li>{neighbour}</li>
		{/each}
	</ul>
</template>
