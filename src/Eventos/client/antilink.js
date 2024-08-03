const client = require("../../../index")
const Discord = require("discord.js")
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');
const antilinkData = require('../../models/antilink');

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;
    let verificando22 = await antilinkData.findOne({ GuildID: `${config.guild}` }) || "off";
    let verificando = verificando22.Status || "off";

    if (!verificando || verificando === "off" || verificando === null || verificando === false) return;
  
    if (verificando === "on") {

        if (message.member.permissions.has("MANAGE_GUILD")) return;
        if (message.member.permissions.has("ADMINISTRATOR")) return;
  
        if (message.content.includes("https".toLowerCase() || "http".toLowerCase() || "www".toLowerCase() || ".com".toLowerCase() || ".br".toLowerCase())) {
  
          message.delete();
        message.channel.send(`${emoji.x_} | ${message.author} Você não pode enviar links aqui!`).then((m) => {
          setTimeout(() => m.delete().catch(e => e), 5000)
      })
  
        }
  
  
    }
  
  })