const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    GuildID: String,
    Channel: String
});

const rolemodel = mongoose.model('logsticket', roleSchema);

module.exports = rolemodel;