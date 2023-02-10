"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = require("./env");
// Update with your config settings.
var config = {
    development: {
        debug: false,
        client: "postgresql",
        connection: {
            host: env_1.env.DB_HOST,
            database: env_1.env.DB_NAME,
            user: env_1.env.DB_USERNAME,
            password: env_1.env.DB_PASSWORD,
            port: env_1.env.DB_PORT,
            multipleStatements: true,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    staging: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    production: {
        client: "postgresql",
        connection: {
            host: env_1.env.POSTGRES_HOST,
            database: env_1.env.POSTGRES_DB,
            user: env_1.env.POSTGRES_USER,
            password: env_1.env.POSTGRES_PASSWORD,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
module.exports = config;
//# sourceMappingURL=knexfile.js.map