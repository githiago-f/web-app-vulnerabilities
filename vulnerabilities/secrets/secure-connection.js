import Knex from "knex";
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

/**
 * @type {import('knex').Knex.Config}
 */
const knexConfig = {
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        user: process.env.DB_USER,
        port: process.env.DB_PORT || 3306
    },
    migrations: {
        directory: './migrations'
    },
    seeds: {
        directory: './seeds'
    }
};

export const secure_secrets_db = Knex(knexConfig);

export default knexConfig;