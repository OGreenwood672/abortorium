<script lang="ts">
	import { onMount } from 'svelte';
	import { Network, type Edge, type IdType, type Node } from 'vis-network';
	import { DataSet } from 'vis-data';

	let familyTree: Record<string, { partners: string[]; parents: string[] }>;
	let college = "Queens'";

	let searchQuery = '';

	// Fetch data from the API endpoint
	async function fetchGraph() {
		const response = await fetch(`database?college=${college}`);
		if (response.ok) {
			familyTree = await response.json();
		} else {
			console.error('Failed to fetch data');
		}
	}

	onMount(() => {
		setupVis();
	});

	let selectNode = (node: IdType) => {};

	async function setupVis() {
		await fetchGraph();

		// Arrays for nodes and edges
		const nodes: Node[] = [];
		const edges: Edge[] = [];

		// Iterate over familyData to build nodes and edges
		Object.keys(familyTree).forEach((person) => {
			// Add the person as a node
			nodes.push({ id: person, label: person });

			// Add edges for partners
			familyTree[person].partners.forEach((partner) => {
				// Create an undirected edge for each partnership
				edges.push({ from: person, to: partner, label: 'partner', arrows: '' });
			});

			// Add edges for parents
			familyTree[person].parents.forEach((parent) => {
				// Create a directed edge from the parent to the child
				edges.push({ from: parent, to: person, label: 'parent', arrows: 'to' });
			});
		});

		// Create a network
		const container = document.getElementById('network') as HTMLElement;

		// Provide data in the form of a vis.js DataSet
		const data = {
			nodes: new DataSet<Node>(nodes),
			edges: new DataSet<Edge>(edges)
		};

		// Configuration for the network
		const options = {
			height: `${window.innerHeight}px`,
			edges: {
				arrows: {
					to: { enabled: true, scaleFactor: 1 } // Arrow for parent-to-child relationships
				},
				smooth: false,
				color: '#848484',
				font: { align: 'top' }
			},
			nodes: {
				shape: 'dot',
				size: 20,
				font: {
					size: 15
				}
			},
			physics: {
				enabled: true, // Enable physics for better layout and spacing
				solver: 'forceAtlas2Based',
				forceAtlas2Based: {
					gravitationalConstant: -50,
					centralGravity: 0.005,
					springLength: 100,
					springConstant: 0.05
				},
				maxVelocity: 50,
				minVelocity: 0.1
			}
		};

		// Initialize the network
		const network = new Network(container, data, options);

		selectNode = (nodeId: IdType) => {
			network.selectNodes([nodeId]); // Select the node by its ID
			network.focus(nodeId); // Optionally, focus on the node
		};
	}
</script>

<div class="w-full flex justify-center p-2 z-10">
	<input
		bind:value={searchQuery}
		type="text"
		placeholder="Search..."
		class="w-1/3 p-4 px-10 rounded-3xl shadow-xl outline-none text-gray-700 placeholder-gray-500"
		on:keydown={(event) => {
			if (event.key === 'Enter') {
				selectNode(searchQuery); // Call the selectNode function when Enter is pressed
			}
		}}
	/>
</div>

<div id="network" class="min-h-screen w-full" />
