<script lang="ts">
	import Graph from '../../components/graph.svelte';

	// Placeholder for handling search functionality
	let searchQuery = '';

	// Functions for logout and edit profile buttons
	function logout() {
		alert('Logging out...');
	}

	function editProfile() {
		alert('Editing profile...');
	}

	function focusNode() {}
</script>

<main
	class="flex flex-col items-center justify-start min-h-screen bg-gray-100 text-center relative"
>
	<!-- Search Bar centered at the top of the page -->
	<div class="w-full flex justify-center p-2 z-10">
		<input
			bind:value={searchQuery}
			type="text"
			placeholder="Search..."
			class="w-1/3 p-4 px-10 rounded-3xl shadow-xl outline-none text-gray-700 placeholder-gray-500"
			on:submit={focusNode}
		/>
	</div>

	<!-- Top Bar with Edit Profile and Logout buttons (without background) -->
	<div class="w-fit flex justify-between items-center p-4 absolute top-0 right-0 z-10">
		<!-- Invisible placeholder to center buttons -->
		<div></div>

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
	<section class="w-full absolute top-0 min-h-screen -z-0">
		<Graph {searchQuery} />
	</section>
</main>

<!-- Tailwind CSS for page layout and style -->
<style>
	main {
		min-height: 100vh;
	}
</style>
