
export const createDbQuery = (dbName) => {
    return `CREATE DATABASE ${dbName}`;
}

export const checkDbQuery = `SELECT 1 FROM pg_database WHERE datname = $1`;

export const checkTableQuery = `
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users'
            );
        `;


export const createTableQuery = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `;