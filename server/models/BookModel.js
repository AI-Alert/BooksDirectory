const mongoose = require("mongoose")
const authorSchema = require("./AuthorModel")
const {Schema} = require("mongoose");

const bookSchema = new  mongoose.Schema({
    title:{type: String, required: true},
    desc:{type: String, required: true, unique: true},
    genre: {type: [String]},
    author: { type: Schema.Types.ObjectId, ref: 'author' },
});

module.exports = mongoose.model("book", bookSchema);
