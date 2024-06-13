import 'dotenv/config';
import pg from 'pg';
import { checkDbQuery, checkTableQuery, createDbQuery, createTableQuery } from '../queries/dbMigrationQueries.js';

const adminDBName = process.env.POSTGRES_ADMIN_DB_NAME;
const adminDBUser = process.env.POSTGRES_ADMIN_DB_USER
const adminDBHost = process.env.POSTGRES_ADMIN_HOST
const adminDBPORT = process.env.POSTGRES_ADMIN_PORT
const adminDBPassword = process.env.POSTGRES_ADMIN_PASSWORD
const dbUser = process.env.POSTGRES_DB_USER;
const dbPassword = process.env.POSTGRES_DB_PASSWORD;
const dbName = process.env.POSTGRES_DB_NAME;
const dbPort = process.env.POSTGRES_DB_PORT;
const dbHost = process.env.POSTGRES_DB_HOST

const envVariables = [
    { name: 'POSTGRES_DB_NAME', value: dbName },
    { name: 'POSTGRES_DB_PASSWORD', value: dbPassword },
    { name: 'POSTGRES_DB_PORT', value: dbPort },
    { name: 'POSTGRES_DB_USER', value: dbUser },
    { name: 'POSTGRES_DB_HOST', value: dbHost },
    { name: 'POSTGRES_ADMIN_DB_NAME', value: adminDBName },
    { name: 'POSTGRES_ADMIN_PASSWORD', value: adminDBPassword },
    { name: 'POSTGRES_ADMIN_PORT', value: adminDBPORT },
    { name: 'POSTGRES_ADMIN_DB_USER', value: adminDBUser },
    { name: 'POSTGRES_ADMIN_HOST', value: adminDBHost }
];

const missingVariables = envVariables.filter(({ value }) => !value);

if (missingVariables.length > 0) {
    missingVariables.forEach(({ name }) => {
        console.error(`Error creating database: Value for the environment variable ${name} is not provided.`);
    });
    process.exit(1);
}

async function createDatabase() {
    const adminPool = new pg.Pool({
        user: adminDBUser,
        host: adminDBHost,
        database: adminDBName,
        password: adminDBPassword,
        port: adminDBPORT
    });

    const client = await adminPool.connect();
    try {

        const res = await client.query(checkDbQuery, [dbName]);

        if (res.rows.length === 0) {
            await client.query(createDbQuery(dbName));
            console.log(`Database "${dbName}" created successfully.`);
        }

    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        client.release();
    }

    const pool = new pg.Pool({
        user: dbUser,
        host: dbHost,
        database: dbName,
        password: dbPassword,
        port: dbPort
    });

    const client2 = await pool.connect();
    try {
        const res2 = await client2.query(checkTableQuery);
        const tableExists = res2.rows[0].exists;

        if (!tableExists) {
            await client2.query(createTableQuery);
            console.log('Table "users" created successfully.');
        }
        console.log('Connected to PostgreSQL Database');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        client2.release();
    }
    return pool
}

const pool = await createDatabase();

export default pool;
