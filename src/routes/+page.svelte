<script>
	import { goto } from '$app/navigation';
	console.log('SCRIPT');
	function handleLogin() {
		alert('Redirecting to Raven login...');
		try {
			goto('/visualiser');
		} catch (error) {
			console.log(error);
		}
		console.log('BAHHH');
	}
</script>

<main class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
	<h1 class="text-5xl font-bold text-gray-800 mb-4">Cambridge College Family Tree</h1>
	<p class="text-lg text-gray-600 mb-8">Connect and explore your college family relationships!</p>
	<button
		on:click={handleLogin}
		class="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
	>
		Login with Raven
	</button>
</main>
