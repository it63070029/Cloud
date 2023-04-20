const express = require("express")

const app = express();
const cors = require('cors')
app.use(cors())

// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')

const userRouter = require('./routes/user')
const authorRouter = require('./routes/author')
const chapterRouter = require('./routes/chapter')
const showChapterRouter = require('./routes/showChapter')
const shelfBookRouter = require('./routes/shelfBook')
const commentRouter = require('./routes/comment')
const profileRouter = require('./routes/profile')

app.use(indexRouter.router)
app.use(userRouter.router)
app.use(authorRouter.router)
app.use(chapterRouter.router)
app.use(showChapterRouter.router)
app.use(shelfBookRouter.router)
app.use(commentRouter.router)
app.use(profileRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})