import 'dotenv/config';
import { missingVariables, adminDBPassword, adminDBUser, dbName, } from './src/dbConfig/get-db.js';

if (missingVariables.length > 0) {
    missingVariables.forEach(({ name }) => {
        console.error(`Error creating database: Value for the environment variable ${name} is not provided.`);
    });
    process.exit(1);
}

const config = {
    development: {
        client: 'postgresql',
        connection: {
            database: dbName,
            user: adminDBUser,
            password: adminDBPassword
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_user_migrations',
            directory: './src/dbConfig/migrations'
        }
    },
}
export default config