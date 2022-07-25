const Router = require("express");
const router = new Router();
const bookController = require("../controllers/bookController")

router.get("/", bookController.getAllBooksSearch);

router.get("/:id", bookController.getOneBookSearch);

router.post("/", bookController.createOneBook);

router.put("/:id", bookController.updateOneBook);

router.delete("/:id", bookController.deleteOneBook);

module.exports = router;