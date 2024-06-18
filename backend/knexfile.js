import 'dotenv/config';

const config = {
    development: {
        client: 'postgresql',
        connection: {
            database: process.env.POSTGRES_DB_NAME,
            user: process.env.POSTGRES_ADMIN_DB_USER,
            password: process.env.POSTGRES_ADMIN_PASSWORD
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