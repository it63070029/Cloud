const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'cloud-db.cnrzmfwdcgln.us-east-1.rds.amazonaws.com',
  user: 'root',
  password: 'POEexm73',
  database: 'cloud',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;