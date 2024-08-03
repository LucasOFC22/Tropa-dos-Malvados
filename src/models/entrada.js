const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    GuildID: String,
    Channel: String
});

const rolemodel = mongoose.model('entrada', roleSchema);

module.exports = rolemodel;