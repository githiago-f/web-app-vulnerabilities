import Knex from "knex";

/**
 * @type {import('knex').Knex.Config}
 */
const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: ':memory:rbac',
        database: 'rbac-demo'
    },
    migrations: {
        directory: './migrations'
    },
    seeds: {
        directory: './seeds'
    }
};

export const rbac_db = Knex(knexConfig);

export default knexConfig;