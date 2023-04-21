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

//update profile
router.put("/profile/:user_id",upload.single("newImage"),async function (req, res, next) {
    console.log("Profile")
    // const username = req.body.username
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const email = req.body.email
    const file = req.file;
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    console.log(req.body.image)
    

    try {
       
        await conn.query(
        'UPDATE user SET firstname=?,lastname=?,email=? WHERE user_id=?',[firstname,lastname,email,req.params.user_id])
        if(req.body.image == undefined &&file.path !=undefined ){
            await conn.query('UPDATE user SET image=? WHERE user_id=?',[file.path.substring(6),req.params.user_id])
        }
        console.log('success update profile')
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

// apply role to be a author
router.put("/applyAuthor/:user_id", async function(req, res, next){
  const author = 'author'
  const conn = await pool.getConnection()
  await conn.beginTransaction();
  try {
    await conn.query(
      'UPDATE user SET role=? WHERE user_id=?', [author, req.params.user_id]
    )
    console.log('success update role to author')
    conn.commit()
    res.send("success update role!");
  }
  catch (err) {
    await conn.rollback();
    next(err);
  } 
  finally {
      console.log('finally')
      conn.release();
  }
});

exports.router = router;
