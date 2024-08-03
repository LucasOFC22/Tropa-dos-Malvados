const fs = require('fs');
const { Client, GatewayIntentBits, Partials, Collection, GuildMember } = require('discord.js');
const config = require("./src/config/config.json")
const mongo = require("mongoose")

/**
 * @type {Client}
 * @property {Collection} slashCommands - Coleção de comandos personalizados.
 */
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
});
module.exports = client;

client.slashCommands = new Collection();

require("./src/Handler")(client);

client.MongoConnect = () => mongo.connect(config.MongoURL)
client.login(config.BotToken);