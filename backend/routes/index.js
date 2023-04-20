const express = require("express");
const pool = require("../config");


router = express.Router();


//get novel and search
router.get("/", async function (req, res, next) {
  try {
    const search = req.query.search || ''
    let sql = 'SELECT * FROM novel'
    let cond = []
    if (search.length > 0) {
      sql = 'SELECT * FROM novel  JOIN author using (author_id) WHERE novel.title LIKE ? OR author.alias LIKE ?;'
      cond = [`%${search}%`, `%${search}%`]
    }
    const [rows, fields] = await pool.query(sql, cond);
    // console.log(rows)
   
    
    return res.json(rows);
  } 
  catch (err) {
    return res.status(500).json(err)
  }
});

exports.router = router;
