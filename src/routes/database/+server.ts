// src/routes/api/database.ts
import { json, type RequestHandler } from '@sveltejs/kit';
import pg from 'pg';
import * as dotenv from 'dotenv';
const { Pool } = pg


// Initialize PostgreSQL client with environment variables
dotenv.config();
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Function to get all neighbours up to a specified depth iteratively
async function getAllNeighbours(csrid: string, depth: number): Promise<Set<string>> {
    const neighbours = new Set<string>();
    const queue: { id: string; currentDepth: number }[] = [{ id: csrid, currentDepth: 0 }];
    const visited = new Set<string>([csrid]); // Mark the initial csrid as visited

    while (queue.length > 0) {
        const { id, currentDepth } = queue.shift()!; // Dequeue the first element

        // If we have reached the maximum depth, continue
        if (currentDepth >= depth) continue;

        // Fetch direct neighbours for the current CSRID
        const { rows } = await pool.query('SELECT neighbour FROM edges WHERE csrid = $1', [id]);

        for (const row of rows) {
            if (!visited.has(row.neighbour)) {
                visited.add(row.neighbour); // Mark neighbour as visited
                neighbours.add(row.neighbour); // Add to the neighbours set
                queue.push({ id: row.neighbour, currentDepth: currentDepth + 1 }); // Enqueue the neighbour with incremented depth
            }
        }
    }

    return neighbours;
}

// Example GET endpoint to fetch all neighbours
export const GET: RequestHandler = async ({ url }) => {
    try {
        const depth = parseInt(url.searchParams.get('depth') || '1', 10); // Specify depth
        const csrid = url.searchParams.get('csrid');

        if (!csrid) {
            return json({ error: 'Missing csrid parameter' }, { status: 400 });
        }

        // Get all neighbours up to the specified depth
        const neighbours = await getAllNeighbours(csrid, depth);

        return json(Array.from(neighbours));
    } catch (error) {
        console.error('Database query error:', error);
        // console.log(pool)
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};
