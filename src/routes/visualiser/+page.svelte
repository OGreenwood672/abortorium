<script lang="ts">
	// import { onMount } from 'svelte';
	// let depth = 2;
	// let neighbours: any[] = [];
	// let csrid = 'og314';

	import Graph from '../../components/graph.svelte';

	// async function fetchNeighbours() {
	// 	const response = await fetch(`/api/get_neighbours?depth=${depth}&csrid=${csrid}`);
	// 	if (response.ok) {
	// 		neighbours = await response.json();
	// 	} else {
	// 		console.error('Failed to fetch data');
	// 	}
	// }

	// Placeholder for handling search functionality
	let searchQuery = '';

	// Functions for logout and edit profile buttons
	function logout() {
		alert('Logging out...');
	}

	function editProfile() {
		alert('Editing profile...');
	}

	// onMount(() => {
	// 	fetchNeighbours();
	// });
</script>

<main class="flex flex-col items-center justify-start min-h-screen bg-gray-100 text-center">
	<!-- Search Bar centered at the top of the page -->
	<div class="w-full flex justify-center p-2">
		<input
			bind:value={searchQuery}
			type="text"
			placeholder="Search..."
			class="w-1/3 p-4 px-10 rounded-3xl shadow-xl outline-none text-gray-700 placeholder-gray-500"
		/>
	</div>

	<!-- Top Bar with Edit Profile and Logout buttons -->
	<div class="w-full flex justify-between items-center p-4">
		<div class="flex-grow"></div>
		<!-- Invisible placeholder to center buttons -->

		<!-- Edit Profile and Logout Buttons -->
		<div class="flex space-x-4">
			<button
				on:click={editProfile}
				class="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
			>
				Edit Profile
			</button>
			<button
				on:click={logout}
				class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-700"
			>
				Log Out
			</button>
		</div>
	</div>

	<!-- Dynamic Content: Nodes and Their Connections -->
	<section class="w-full flex min-h-screen">
		<Graph />
	</section>
</main>

<!-- Tailwind CSS for page layout and style -->
<style>
	main {
		min-height: 100vh;
	}
</style>
