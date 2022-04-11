const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
    user: "issuetracker",
    host: "localhost",
    database: "IssueTracker",
    password: "702365",
    port: 5432,
});

module.exports = pool;
