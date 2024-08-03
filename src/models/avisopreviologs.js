const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    GuildID: String,
    Channel: String
});

const rolemodel = mongoose.model('aviso_previo_logs', roleSchema);

module.exports = rolemodel;