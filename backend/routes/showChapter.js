const express = require("express");
const path = require("path");
const pool = require("../config");


router = express.Router();

//show detail Chapter select
router.get("/novel/chapter/showChapter/:chapter_id/:novel_id", function (req, res, next) {
  // Query data from 3 tables

  const promise2 = pool.query("SELECT * FROM chapter WHERE chapter_id=?",[req.params.chapter_id]);

  Promise.all([promise2])
    .then((results) => {
        const [selectChapters, selectChapterFields] = results[0];
        // const [chapters, chapterFields] = results[1];
        res.json({
            selectChapters: selectChapters,
            // chapters:chapters,
        
            error: null,
        });
    })
    .catch((err) => {
        return res.status(500).json(err);
    });
});
//get listchapter Novel_id
router.get("/novel/chapter/showChapter/:novel_id", function (req, res, next) {
    // Query data from 3 tables
  
    const promise2 = pool.query("SELECT * FROM chapter WHERE novel_id=?",[req.params.novel_id]);
  
    Promise.all([promise2])
      .then((results) => {
          const [chapters, chapterFields] = results[0];
          // const [chapters, chapterFields] = results[1];
          res.json({
              chapters: chapters,
              // chapters:chapters,
          
              error: null,
          });
      })
      .catch((err) => {
          return res.status(500).json(err);
      });
  });


exports.router = router;
