const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    GuildID: { type: String, default: null},
    Discord: { type: String, default: null},
    Avaliacoes: { type: Number, default: null},
});

const rolemodel = mongoose.model('rank-avaliacoes', roleSchema);

module.exports = rolemodel;