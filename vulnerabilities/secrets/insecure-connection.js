import Knex from "knex";

/**
 * @type {import('knex').Knex.Config}
 */
const knexConfig = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        database: 'db_name',
        password: 'password',
        user: 'username',
        port: 3306
    },
    migrations: {
        directory: './migrations'
    },
    seeds: {
        directory: './seeds'
    }
};

export const insecure_secrets_db = Knex(knexConfig);

export default knexConfig;