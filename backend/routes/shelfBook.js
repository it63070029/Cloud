const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");
const multer = require("multer");


router = express.Router();

// SET STORAGE
//add ShelfBook
router.post("/shelfBook",async function (req, res, next) {
    const novel_id = req.body.novel_id
    const user_id = req.body.user_id

    try {
        // const [rows,columns] = await pool.query("SELECT * FROM shelfbook WHERE user_id=?",[user_id]);
        // console.log(rows)
        // for(let i =0;i<rows.length;i++){
        //     if(rows[i].novel_id == novel_id){
        //         continue
        //     }
        //     else{
        //         const [rows1, fields1]= await pool.query(
        //         "INSERT INTO shelfbook(novel_id,user_id)" +
        //         "VALUES(?, ?);",
        //         [novel_id, user_id]);
        //     }
        // }
        const [rows1, fields1]= await pool.query(
            "INSERT INTO shelfbook(novel_id,user_id)" +
            "VALUES(?, ?);",
            [novel_id, user_id]);
        // console.log("Hii"+novel_id+"user_id"+user_id)

        
        // console.log(rows1)
        res.send("success!");
      } catch (err) {
          console.log(err)
        return res.status(400).json(err);
      } 
});
//Get check shlfBook for add to shelfBook
router.get("/:user_id",async function (req, res, next){
    const promise = pool.query("SELECT * FROM shelfbook WHERE user_id=?",[req.params.user_id]);
    const promise2 = pool.query("SELECT * FROM novel WHERE novel_id in (SELECT novel_id FROM shelfbook WHERE user_id=?)",[req.params.user_id]);
    Promise.all([promise,promise2])
    .then((results) => {
        const [shelfBooks, shelfBooksFields] = results[0];
        const [novelsShelf, novelsShelfFields] = results[1];
        res.json({
            shelfBooks: shelfBooks,
            novelsShelf:novelsShelf,
            error: null,
        });
    })
    .catch((err) => {
        return res.status(500).json(err);
    });

})

//delete chapter Select from shelfbook
router.delete("/:user_id/:novel_id",async function (req, res, next) {
    // console.log(req.params.novel_id)
    // const novel_id = req.params.novel_id
    try {
        // console.log(novel_id)
        const [rows1, fields1] = await pool.query(
            'DELETE FROM shelfbook WHERE user_id=? AND novel_id=? ', [req.params.user_id,req.params.novel_id]
        )
        res.json("success")
    } catch (error) {
        res.status(500).json(error)
    }

});

exports.router = router;
