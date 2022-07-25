const AuthorModel = require("../models/AuthorModel");

class AuthorController{

    async getAllAuthorsSearch(req, res){
        try {
            const page = parseInt(req.query.page) - 1 || 0;
            const limit = parseInt(req.query.limit) || 5;
            const search = req.query.search || "";
            let sort = req.query.sort || "lastname";

            req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

            let sortBy = {};
            if (sort[1]){
                sortBy[sort[0]] = sort [1];
            } else {
                sortBy[sort[0]] = "asc";
            }

            const authors = await AuthorModel.find({lastname: { $regex: search, $options: "i"}})
                .sort(sortBy)
                .skip(page * limit)
                .limit(limit);

            const total = await AuthorModel.countDocuments({
                lastname: {$regex: search, $options: "i"},
            });

            const response = {
                error: false,
                total,
                page: page + 1,
                limit,
                authors,
            };

            res.status(200).json(response);

        } catch (e){
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }
    }
    async getOneAuthorSearch (req, res){
        try{
            AuthorModel.findOne({
                _id: req.params.id
            }).exec(function (err, author){
                if (err){
                    res.send("error has occurred");
                } else {
                    console.log(author);
                    res.send(author);
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }
    }

    async createOneAuthor (req, res){
        try{
            const newAuthor = new AuthorModel();
            newAuthor.lastname = req.body.lastname;
            newAuthor.firstname = req.body.firstname;
            newAuthor.birthdate = req.body.birthdate;
            newAuthor.save(function (err, author){
                if (err){
                    res.send("Author already exists");
                } else {
                    console.log(author);
                    res.send(author);
                }
            });
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }
    }

    async updateOneAuthor (req, res){
        try{
            AuthorModel.findOneAndUpdate({
                _id: req.params.id
            }, {
                $set: {
                    lastname: req.body.lastname,
                    firstname: req.body.firstname,
                    birthdate: req.body.birthdate,
                }
            }, {upsert: true}, function (err, author){
                if (err){
                    res.send("Update author error");
                } else {
                    console.log(author);
                    res.send(author);
                }
            });

        } catch (e) {
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }
    }

    async deleteOneAuthor (req, res){
        try{

            AuthorModel.findByIdAndRemove({
                _id: req.params.id
            }, function (err, author){
                if (err){
                    res.send("Update author error");
                } else {
                    console.log(author);
                    res.send(author);
                }
            });

        } catch (e) {
            console.log(e);
            res.status(500).json({ error: true, message: "Internal error"});
        }
    }

}

module.exports = new AuthorController();