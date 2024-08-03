const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    GuildID: { type: String, default: null},
    Discord: { type: String, default: null},
    Mensagem: { type: String, default: null},
    Inicio: { type: String },
    Status: { type: String },
});

const rolemodel = mongoose.model('bate-ponto', roleSchema);

module.exports = rolemodel;