<script lang="ts">
	import Graph from '../../components/graph.svelte';

	// Functions for logout and edit profile buttons
	function logout() {
		alert('Logging out...');
	}

	function editProfile() {
		alert('Editing profile...');
	}
</script>

<main
	class="flex flex-col items-center justify-start min-h-screen bg-gray-100 text-center relative"
>
	<!-- Search Bar centered at the top of the page -->

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
		<Graph />
	</section>
</main>

<!-- Tailwind CSS for page layout and style -->
<style>
	main {
		min-height: 100vh;
	}
</style>
