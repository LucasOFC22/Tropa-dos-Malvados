const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    GuildID: String,
    User: String,
    Channel: String,
    Staff: { type: String, default: null},
});

const rolemodel = mongoose.model('ticket', roleSchema);

module.exports = rolemodel;