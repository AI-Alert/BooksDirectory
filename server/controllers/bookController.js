const BookModel = require("../models/BookModel")
const AuthorModel = require("../models/AuthorModel")

class BookController{

    async getAllBooksSearch(req, res){
        try {
            const page = parseInt(req.query.page) - 1 || 0;
            const limit = parseInt(req.query.limit) || 5;
            const search = req.query.search || "";
            let sort = req.query.sort || "title";
            let genre = req.query.genre || "All";


            const genresOptions = [
                "Psychology",
                "Novel",
                "Historical Novel",
                "Programming",
                "Art",
                "Sport",
                "Other",
            ];

            genre === "All"
                ? (genre = [...genresOptions])
                : (genre = req.query.genre.split(","));
            req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

            let sortBy = {};
            if (sort[1]){
                sortBy[sort[0]] = sort [1];
            } else {
                sortBy[sort[0]] = "asc";
            }

            const books = await BookModel.find({title: { $regex: search, $options: "i"}})
                .where("genre")
                .in([...genre])
                .sort(sortBy)
                .skip(page * limit)
                .populate('author', 'lastname')
                .limit(limit);


            const total = await BookModel.countDocuments({
                genre: { $in: [...genre] },
                title: {$regex: search, $options: "i"},
            });

            const response = {
                error: false,
                total,
                page: page + 1,
                limit,
                genre: genresOptions,
                books,
            };

            res.status(200).json(response);

        } catch (e){
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }
    }

    async getOneBookSearch(req, res){
        try{
            BookModel.findOne({
                _id: req.params.id
            }).exec(function(err, book){
                if(err) {
                    res.send('error has occurred');
                } else {
                    console.log(book);
                    res.json(book);
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }
    }

    async createOneBook(req, res){
        try{
            const newBook = new BookModel();
            newBook.title = req.body.title;
            newBook.desc = req.body.desc;
            newBook.genre = req.body.genre;
            newBook.author = req.body.author;
            newBook.save(function(err, book){
                if(err) {
                    res.send('Author doesn\'t found or Book is Already exists');
                } else {
                    const candidate = AuthorModel.findOne({_id: req.body.author})
                    if (candidate) {
                        console.log("Author found!")
                        console.log({book});
                        res.send(book);
                    }
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }
    }

    async updateOneBook(req, res){
        try{
            BookModel.findOneAndUpdate({
                _id: req.params.id
            },{
                $set: {
                    title: req.body.title,
                    desc: req.body.desc,
                    genre: req.body.genre,
                    author: req.body.author
                }
            },{
                upsert: true
            },function(err, updatedBook){
                if(err) {
                    res.send('error updating book');
                } else {
                    console.log(updatedBook);
                    res.send(updatedBook);
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }
    }


    async deleteOneBook(req, res){
        try{
            BookModel.findByIdAndRemove({
                _id: req.params.id
            },function(err, book){
                if(err) {
                    res.send('error deleting post');
                } else {
                    console.log(book);
                    res.send(book);
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }
    }


}
module.exports = new BookController();