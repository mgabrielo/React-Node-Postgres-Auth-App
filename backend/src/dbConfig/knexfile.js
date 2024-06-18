import 'dotenv/config';
import { missingVariables } from './create-db.js';

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
            database: 'auth_db',
            user: 'postgres',
            password: 'scott'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_user_migrations',
        }
    },
}
export default config