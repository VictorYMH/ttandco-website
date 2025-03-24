// filepath: server/api/data.js
import { createConnection } from 'mysql2/promise';

const connection = createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ttandco_web'
});

export default defineEventHandler(async (event) => {
    const method = getMethod(event);

    if (method === 'GET') {
        const [rows] = await connection.query('SELECT * FROM your_table');
        return rows;
    }

    if (method === 'POST') {
        const body = await readBody(event);
        const { field1, field2 } = body;
        const [result] = await connection.query('INSERT INTO your_table (field1, field2) VALUES (?, ?)', [field1, field2]);
        return { id: result.insertId };
    }

    return { message: 'Method not allowed' };
});