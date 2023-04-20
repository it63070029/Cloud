const express = require("express");
const path = require("path");
const pool = require("../config");


router = express.Router();

//Get Comment
router.get("/comment/:novel_id",async function (req, res, next){
    const promise = pool.query("SELECT * FROM comment LEFT OUTER JOIN user using(user_id) WHERE novel_id=?",[req.params.novel_id]);

    Promise.all([promise])
    .then((results) => {
        const [comments, commentsFields] = results[0];
        // console.log("comment"+comments[0])
        res.json({
            comments: comments,
        
            error: null,
        });
    })
    .catch((err) => {
        return res.status(500).json(err);
    });

})
//create comment
router.post("/comment/:novel_id/:user_id",async function (req, res, next) {
    console.log("Post Comment"+req.body.comment_text)

    const comment_text = req.body.comment_text;
    // const user_id = req.body.user_id
    
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let results = await conn.query(
          "INSERT INTO comment(comment_text,novel_id,user_id)" +
          "VALUES(?,?, ?);",
          [comment_text,req.params.novel_id,req.params.user_id]
        );
        await conn.commit();
        res.send("success!");
      } catch (err) {
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        conn.release();
      }

});

//edit comment
router.put("/comment/:comment_id",async function (req, res, next) {
    const comment_text = req.body.comment_text
    const conn = await pool.getConnection()
    await conn.beginTransaction();

    try {
       
        await conn.query(
        'UPDATE comment SET comment_text=? WHERE comment_id=?',[comment_text, req.params.comment_id])
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
//delete chapter Select
router.delete("/comment/:comment_id/:user_id",async function (req, res, next) {
    
    console.log("delete Comment"+req.params.comment_id)
    try {
        const [rows1, fields1] = await pool.query(
            'DELETE FROM comment WHERE comment_id=?', [req.params.comment_id]
        )
        res.json("success")
    } catch (error) {
        res.status(500).json(error)
    }

});

exports.router = router;
