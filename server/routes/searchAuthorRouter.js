const Router = require('express');
const router = new Router();
const authorController = require("../controllers/authorController");

router.get('/', authorController.getAllAuthorsSearch);

router.get('/:id', authorController.getOneAuthorSearch);

router.post('/', authorController.createOneAuthor);

router.put('/:id', authorController.updateOneAuthor);

router.delete('/:id', authorController.deleteOneAuthor);

module.exports = router;