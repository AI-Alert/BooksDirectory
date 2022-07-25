const Router = require('express');
const router = new Router();
const searchBook = require("./searchBookRouter")
const searchAuthor = require("./searchAuthorRouter")

router.use('/search/books', searchBook);

router.use('/search/authors', searchAuthor)

module.exports = router;