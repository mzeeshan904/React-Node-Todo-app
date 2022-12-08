const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "tasks",
    password: "zee200200200",
    port: 5432,
});

module.exports = pool;
