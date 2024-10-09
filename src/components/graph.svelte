<script lang="ts">
	import { onMount } from 'svelte';

	let familyTree: Record<string, { marriage: string[]; parents: string[] }>;
	let depth = 2; // Number of levels of neighbours to fetch
	let csrid = 'og314'; // Example CSRID

	// Fetch data from the API endpoint
	async function fetchNeighbours() {
		const response = await fetch(`database?depth=${depth}&csrid=${csrid}`);
		if (response.ok) {
			familyTree = await response.json();
		} else {
			console.error('Failed to fetch data');
		}
	}

	onMount(() => {
		fetchNeighbours();
		setupCanvas();
	});
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let radius = 20; // Radius of the pulsating circles
	let pulsate = true; // Pulsating effect flag
	let scale = 1; // Scale for pulsating effect
	let increment = 0.01; // Increment for scaling

	// Positions for circles, adjust according to the structure
	const positions = new Map<string, { x: number; y: number }>();

	// Function to draw pulsating circles
	function drawCircle(x: number, y: number, csrid: string) {
		ctx.beginPath();
		ctx.arc(x, y, radius * scale, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(100, 149, 237, 0.7)'; // Cornflower blue
		ctx.fill();
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.stroke();
		ctx.fillStyle = '#000'; // Text color
		ctx.fillText(csrid, x - ctx.measureText(csrid).width / 2, y + 5); // Center the text
	}

	// Function to draw lines
	function drawLine(from: { x: number; y: number }, to: { x: number; y: number }) {
		ctx.beginPath();
		ctx.moveTo(from.x, from.y);
		ctx.lineTo(to.x, to.y);
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
		ctx.lineWidth = 2;
		ctx.stroke();
	}

	// Main draw function
	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
		for (const [csrid, position] of positions) {
			drawCircle(position.x, position.y, csrid); // Draw each CSRID as a circle
		}
		for (const [csrid, relationships] of Object.entries(familyTree)) {
			const { marriage, parents } = relationships;
			const position = positions.get(csrid);
			if (position) {
				for (const partner of marriage) {
					const partnerPosition = positions.get(partner);
					if (partnerPosition) {
						drawLine(position, partnerPosition); // Draw lines for marriages
					}
				}
				for (const parent of parents) {
					const parentPosition = positions.get(parent);
					if (parentPosition) {
						drawLine(position, parentPosition); // Draw lines for parents
					}
				}
			}
		}

		// Pulsating effect
		scale += increment;
		if (scale >= 1.2 || scale <= 0.8) {
			increment = -increment; // Reverse the pulsating direction
		}

		requestAnimationFrame(draw); // Request next frame
	}

	// Set up canvas and positions when component mounts
	function setupCanvas() {
		if (canvas) {
			let ctx_temp = canvas.getContext('2d');
			if (ctx_temp != null) ctx = ctx_temp;

			const width = canvas.width;
			const height = canvas.height;

			let x = 50; // Initial x position
			let y = 50; // Initial y position
			const spacing = 100; // Spacing between circles

			// Define positions for each CSRID
			for (const csrid of Object.keys(familyTree)) {
				positions.set(csrid, { x, y });
				x += spacing; // Move right for the next CSRID
				if (x > width - spacing) {
					// Move to the next row if out of bounds
					x = 50;
					y += spacing;
				}
			}
			draw(); // Start drawing
		}
	}
</script>

<canvas bind:this={canvas} width="800" height="600"></canvas>

<style>
	canvas {
		background: #282c34;
		display: block;
		margin: 0 auto;
	}
</style>
