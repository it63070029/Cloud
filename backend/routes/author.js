const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");


router = express.Router();

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./static/uploads");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: storage });
//add Like
router.put("/novel/addlike/:novel_id/:user_id" , async function (req, res, next){
  console.log(req.params.novel_id)
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();

  try {
    let [
      rows,
      fields,
    ] = await conn.query("SELECT `like` FROM `novel` WHERE `novel_id` = ?", [
      req.params.novel_id,
    ]);
    let like = rows[0].like + 1;

    await conn.query("UPDATE `novel` SET `like` = ? WHERE `novel_id` = ?", [
      like,
      req.params.novel_id,
    ]);

    await conn.commit();
    res.json({ like: like });
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
})
//add view
router.put("/novel/addview/:novel_id/:user_id" , async function (req, res, next){
  console.log(req.params.novel_id)
  const conn = await pool.getConnection();
  // Begin transaction
  await conn.beginTransaction();

  try {
    let [
      rows,
      fields,
    ] = await conn.query("SELECT view FROM `novel` WHERE `novel_id` = ?", [
      req.params.novel_id,
    ]);
    let view = rows[0].view + 1;

    await conn.query("UPDATE `novel` SET `view` = ? WHERE `novel_id` = ?", [
      view,
      req.params.novel_id,
    ]);

    await conn.commit();
    res.json({ like: like });
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    console.log("finally");
    conn.release();
  }
})
//createNovel
router.post("/novel/createNovel/:user_id",upload.single("image"), async function (req, res, next) {
    const title = req.body.title
    const description = req.body.description
    const file = req.file;
    const conn = await pool.getConnection();
    await conn.beginTransaction();

  try {
        let [rows,columns] = await conn.query("SELECT * FROM author where user_id=?",[req.params.user_id])
        // console.log(rows[0].author_id)
        let results = await conn.query(
        "INSERT INTO novel(title, descript, image, author_id, `like`,alias) " +
        "VALUES(?, ?, ?, ?, 0,?);",
        [title, description, file.path.substring(6),rows[0].author_id,rows[0].alias]);
    
        await conn.commit();
        res.send("success!");
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }

  });
//get Novel author write
router.get("/author/myBook/:user_id", function (req, res, next) {
  // Query data from 3 tables
  const promise1 = pool.query("SELECT * FROM novel WHERE novel.author_id = (SELECT author_id FROM author WHERE user_id= ?)",[req.params.user_id]);
  

  // Use Promise.all() to make sure that all queries are successful
  Promise.all([promise1])
    .then((results) => {
      const [novels, novelFields] = results;
      res.json({
        novels: novels[0],
        
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});
// get novel for edit
router.get("/novel/:novel_id", function (req, res, next) {
    const promise1 = pool.query("SELECT * FROM novel WHERE novel.novel_id = ?",[req.params.novel_id]);
    
  
    // Use Promise.all() to make sure that all queries are successful
    Promise.all([promise1])
      .then((results) => {
        const [selectNovel, selectNovelFields] = results;
        res.json({
            selectNovel: selectNovel[0],
          
          error: null,
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  });
//update Novel
router.put("/novel/:novel_id/:user_id",upload.single("newImage"),async function (req, res, next) {
  const title = req.body.title
  const descript = req.body.descript
  const file = req.file;

  // console.log(file)

  const conn = await pool.getConnection();
  await conn.beginTransaction();
  console.log("Put Novel")

    try {
      
      await conn.query(
      'UPDATE novel SET title=?, descript=? WHERE novel_id=?',[title, descript,req.params.novel_id])

      if(req.body.image == undefined){
        await conn.query('UPDATE novel SET image=? WHERE novel_id=?',[file.path.substring(6),req.params.novel_id])
      }
        // console.log('success')
        conn.commit()
        res.send("success!");
    } 
    catch (err) {
        await conn.rollback();
        next(err);
    } 
    finally {
        console.log('finally')
        conn.release();
    }
    return;

});
//delete novel
router.delete("/novel/:novel_id",async function (req, res, next) {
    console.log("test Delete Novel")
    const conn = await pool.getConnection();
    // Begin transaction
    await conn.beginTransaction();
  
    try {  
      // Delete chapters
      const [rows1,fields1,] =await conn.query("DELETE FROM chapter WHERE novel_id = ?", [req.params.novel_id,]);
      // Delete the selected novel
      const [rows2,fields2,] = await conn.query("DELETE FROM novel WHERE novel_id = ?", [req.params.novel_id,]);
  
      
        await conn.commit();
        res.status(204).send();
    } catch (err) {
      console.log(err)
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }


});

exports.router = router;
