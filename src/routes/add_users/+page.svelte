<script lang="ts">
	import { v4 as uuidv4 } from 'uuid'; // Import UUID utility

	// Define the API response structure
	interface ApiResponse {
		message?: string;
		error?: string;
	}

	// Function to handle form submission and send a POST request
	async function handleSubmit(event: Event): Promise<void> {
		event.preventDefault(); // Prevent form reload

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		// Extract form fields
		const csrid = formData.get('csrid') as string;
		let marriage = formData.get('marriage') as string | null;
		let parents = formData.get('parents') as string | null;

		// Validate CSRID
		if (!csrid) {
			alert('CSRID is required');
			return;
		}

		// Convert marriage and parents to UUIDs if values are provided, otherwise set to null
		marriage = marriage ? uuidv4() : null;
		parents = parents ? uuidv4() : null;

		// Prepare the query parameters
		let queryParams;
		if (marriage == null && parents == null)
			queryParams = new URLSearchParams({ csrid }).toString();
		else if (parents != null && marriage == null)
			queryParams = new URLSearchParams({ csrid, parents }).toString();
		else if (parents == null && marriage != null)
			queryParams = new URLSearchParams({ csrid, marriage }).toString();
		else if (parents != null && marriage != null)
			queryParams = new URLSearchParams({ csrid, parents, marriage }).toString();

		// Send POST request to the API endpoint
		try {
			const response = await fetch(`collegerooms/collegerooms/database?${queryParams}`, {
				method: 'POST'
			});
			const result: ApiResponse = await response.json();

			if (response.ok) {
				alert(result.message || 'User added successfully');
			} else {
				alert('Error: ' + (result.error || 'An error occurred'));
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while adding the user');
		}
	}
</script>

<main class="min-h-screen bg-gray-100 flex items-center justify-center">
	<div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
		<h1 class="text-4xl font-bold text-gray-800 mb-6 text-center">Add Users</h1>
		<form on:submit={handleSubmit} class="space-y-4">
			<div>
				<input
					class="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
					type="text"
					placeholder="CSRID"
					name="csrid"
					required
				/>
			</div>
			<div>
				<input
					class="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
					type="text"
					placeholder="Marriage (UUID or empty)"
					name="marriage"
				/>
			</div>
			<div>
				<input
					class="w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
					type="text"
					placeholder="Parents (UUID or empty)"
					name="parents"
				/>
			</div>
			<button
				type="submit"
				class="w-full px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-200"
			>
				Add User
			</button>
		</form>
	</div>
</main>
