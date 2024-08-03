const client = require("../../../index");
const Discord = require("discord.js")
const config = require("../../config/config.json")

client.on("messageCreate", async(message) => {

  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
  let bot = new Discord.EmbedBuilder()
  .setTitle(`\📃 Minhas informações`)
  .setColor(config.embed)
  .setDescription(`\n**> \📌 -> Meu chamando é: \`Slash [/]\`\n \> 🚀 -> Meu desenvolvedor: <@1116750535345836055> !\n \> 🧢 -> Veja todos meus comandos em: \`/help\`!**`)
  return message.channel.send({ embeds: [bot] })
  }
});
