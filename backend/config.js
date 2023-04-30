const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'dbnovel.ctvy2er5p7yn.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Pass1234',
  database: 'DBNovel',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;