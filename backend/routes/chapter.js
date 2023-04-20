const express = require("express");
const path = require("path");
const pool = require("../config");


router = express.Router();


//Get for Edit Chapter
router.get("/novel/:novel_id/chapter/editChapter/:chapter_id",async function (req, res, next){
    // console.log("chapter_id"+req.params.chapter_id)
    const promise = pool.query("SELECT * FROM chapter WHERE chapter_id=?",[req.params.chapter_id]);
    Promise.all([promise])
    .then((results) => {
        const [selectchapter, selectChapterFields] = results[0];
        console.log(selectchapter[0])
        res.json({
            selectchapter: selectchapter[0],
        
            error: null,
        });
    })
    .catch((err) => {
        return res.status(500).json(err);
    });

})
//create Chapter
router.post("/novel/chapter/:novel_id",async function (req, res, next) {
    const name = req.body.name
    const detail = req.body.detail
    const conn = await pool.getConnection();
    await conn.beginTransaction();
    try {
        let results = await conn.query(
          "INSERT INTO chapter(name,detail,novel_id)" +
          "VALUES( ?, ?, ?);",
          [name, detail, req.params.novel_id]
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
//get Chapter List
router.get("/novel/chapter/:novel_id", function (req, res, next) {
  
  const promise1 =pool.query("SELECT user_id FROM author WHERE author_id=(SELECT author_id FROM novel WHERE novel_id =?)",[req.params.novel_id])
  const promise2 = pool.query("SELECT * FROM novel WHERE novel.novel_id=?",[req.params.novel_id]);
  const promise3 = pool.query("SELECT * FROM chapter WHERE chapter.novel_id = ?",[req.params.novel_id]);
  // Use Promise.all() to make sure that all queries are successful
  Promise.all([promise2,promise3,promise1])
    .then((results) => {
        const [selectNovels, selectNovelFields] = results[0];
        const [chapters, chapterFields] = results[1];
        const [byAuthorId, byAuthorIdFields] = results[2];
        res.json({
            selectNovels: selectNovels,
            chapters: chapters,
            byAuthorId: byAuthorId,
        
            error: null,
        });
    })
    .catch((err) => {
        return res.status(500).json(err);
    });
});
//update chapter
router.put("/novel/:novel_id/chapter/:chapter_id",async function (req, res, next) {
    const name = req.body.name
    const detail = req.body.detail
    console.log("Put Chapter")
    const conn = await pool.getConnection()
    await conn.beginTransaction();
    console.log("put chapter"+name)

    try {
       
        await conn.query(
        'UPDATE chapter SET name=?, detail=? WHERE chapter_id=?',[name, detail, req.params.chapter_id])
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
router.delete("/novel/:novel_id/chapter/:chapter_id",async function (req, res, next) {
    console.log("test Delete Chapter")
    console.log(req.params.chapter_id)
    try {
        const [rows1, fields1] = await pool.query(
            'DELETE FROM chapter WHERE chapter_id=?', [req.params.chapter_id]
        )
        res.json("success")
    } catch (error) {
        res.status(500).json(error)
    }

});

exports.router = router;
