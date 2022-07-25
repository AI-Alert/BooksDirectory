const mongoose = require("mongoose")

const authorSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    birthdate: {type: Date, required: true},
});

module.exports = mongoose.model("author", authorSchema);