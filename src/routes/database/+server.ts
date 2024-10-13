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

async function getCollegeMembers(college: string): Promise<Record<string, { partners: string[]; parents: string[] }>> {
    const neighboursMap: Record<string, { marriage: string[]; parents: string[] }> = {};


        // Fetch direct neighbours for the current CSRID based on marriage and parents
        const { rows } = await pool.query(`
            SELECT csrid, marriage, parents, college
            FROM college_family_members 
            WHERE college = $1
        `, [college]);

        let graph: Record<string, { partners: string[]; parents: string[] }> = {};

        for (const row of rows) {
            let partners = [];
            let parents = [];
            for (const row2 of rows) {
                if (row2.csrid !== row.csrid) {
                    if (row2.marriage == row.marriage) {
                        partners.push(row2.csrid);
                    }
                    if (row2.marriage == row.parents) {
                        parents.push(row2.csrid)
                    }
                }
            }
            graph[row.csrid] = {
                "partners": partners,
                "parents": parents
            }
        }

        return graph;
}



// Example GET endpoint to fetch all neighbours
export const GET: RequestHandler = async ({ url }) => {
    try {
        const college = url.searchParams.get('college');

        if (!college) {
            return json({ error: 'Missing college parameter' }, { status: 400 });
        }

        // Get all neighbours up to the specified depth
        const graph = await getCollegeMembers(college);

        return json(graph);
    } catch (error) {
        console.error('Database query error:', error);
        // console.log(pool)
        return json({ error: 'Failed to fetch data' }, { status: 500 });
    }
};

export async function POST({ url }) {
    const csrid = url.searchParams.get('csrid');
    const marriage = url.searchParams.get('marriage'); // Can be null
    const parents = url.searchParams.get('parents'); // Can be null
    const college = url.searchParams.get('college');

    // Validate that 'csrid' is provided
    if (!csrid) {
        return json({ error: 'csrid is required' }, { status: 400 });
    }

    try {
        // await pool.query("DROP TABLE college_family_members");
        // Check if the table 'users' already exists
        const checkTableQuery = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_name = 'college_family_members'
            );
        `;

        const { rows } = await pool.query(checkTableQuery);
        const tableExists = rows[0].exists;

        // If the table does not exist, create it
        if (!tableExists) {
            const createTableQuery = `
                CREATE TABLE college_family_members (
                    csrid VARCHAR(255) PRIMARY KEY,
                    marriage UUID DEFAULT NULL,
                    parents UUID DEFAULT NULL,
                    college VARCHAR(255)
                );
            `;
            await pool.query(createTableQuery);
            console.log('Table "college_family_members" has been created.');
        }

        // Insert new user entry
        const insertUserQuery = `
            INSERT INTO college_family_members (csrid, marriage, parents, college) 
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (csrid) 
            DO NOTHING;
        `;

        await pool.query(insertUserQuery, [csrid, marriage || null, parents || null, college]);

        console.log(`New user ${csrid} added to the "college_family_members" table.`);

        return json({ message: `User ${csrid} added successfully.` });

    } catch (error) {
        console.error('Error creating table or adding user:', error);
        return json({ error: 'Failed to create table or add user' }, { status: 500 });
    }
}
