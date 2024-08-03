const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    GuildID: String,
    Discord: String,
    Name: String,
    ID: String
});

const rolemodel = mongoose.model('Verificacao', roleSchema);

module.exports = rolemodel;