import { j as json } from './index-BIAFQWR9.js';
import pg from 'pg';
import * as dotenv from 'dotenv';

const { Pool } = pg;
dotenv.config();
const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
async function getAllNeighbours(csrid, depth) {
  const neighbours = /* @__PURE__ */ new Set();
  const queue = [{ id: csrid, currentDepth: 0 }];
  const visited = /* @__PURE__ */ new Set([csrid]);
  while (queue.length > 0) {
    const { id, currentDepth } = queue.shift();
    if (currentDepth >= depth) continue;
    const { rows } = await pool.query("SELECT neighbour FROM edges WHERE csrid = $1", [id]);
    for (const row of rows) {
      if (!visited.has(row.neighbour)) {
        visited.add(row.neighbour);
        neighbours.add(row.neighbour);
        queue.push({ id: row.neighbour, currentDepth: currentDepth + 1 });
      }
    }
  }
  return neighbours;
}
const GET = async ({ url }) => {
  try {
    const depth = parseInt(url.searchParams.get("depth") || "1", 10);
    const csrid = url.searchParams.get("csrid");
    if (!csrid) {
      return json({ error: "Missing csrid parameter" }, { status: 400 });
    }
    const neighbours = await getAllNeighbours(csrid, depth);
    return json(Array.from(neighbours));
  } catch (error) {
    console.error("Database query error:", error);
    return json({ error: "Failed to fetch data" }, { status: 500 });
  }
};

export { GET };
//# sourceMappingURL=_server.ts-D-Mmcfi7.js.map
