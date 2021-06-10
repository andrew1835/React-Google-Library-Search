const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const axios = require("axios")
const db = require("../../models")
// Matches with "/api/books"
router.route("/")
    .get(booksController.findAll)
    .post(booksController.create);

// Matches with "/api/books/:id"
router
    .route("/:id")
    .get(booksController.findById)
    .put(booksController.update)
    .delete(booksController.remove);

router.get("/api/books", (req, res) => {
    db.books.findAll()
        .then(data =>
            res.json(data)
        )
})
module.exports = router;