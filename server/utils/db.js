const { Pool } = require('pg');
const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT } = require('../env/production');

const pool = new Pool({ user: PGUSER, host: PGHOST, database: PGDATABASE, password: PGPASSWORD, port: PGPORT });

// maybe doesnt have to be async (can remove if it doesnt work)
const query = async (queryText, queryValues) => {
  const result = await pool.query(queryText, queryValues);
  return result.rows;
};

module.exports = { query };

// example:
// const rooms = await query('SELECT * FROM rooms');
