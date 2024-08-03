const Discord = require("discord.js");
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');
const logData = require('../../models/logs-ticket');

module.exports = {
  name: "setlogs-ticket",
  description: "[ ⚙️ ] Setar canal de logs de tickets",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
         name: "canal",
         description: "O canal onde quer pesquisar",
         type: Discord.ApplicationCommandOptionType.Channel,
         required: true
     }
 ],

  run: async(client, interaction, args) => {

    if(interaction.user.id !== '1116750535345836055') return interaction.reply(`🚨 | Apenas meu desenvolvedor tem acesso`)    
    let channel = interaction.options.getChannel("canal")

    let sucess = new Discord.EmbedBuilder()
    .setTitle(`:white_check_mark: | Canal de Ticket definido com sucesso!`)
    .setColor(config.embed)
    .setDescription(`🔨 | O novo canal de logs Ticket é ${channel}`)

    interaction.reply({embeds: [sucess]})

    let enviado = new Discord.EmbedBuilder()
    .setTitle(`Canal de Logs Ticket`)
    .setColor(config.embed)
    .setDescription(`Este canal foi configurado como o canal de Logs Ticket!!!`)

    channel.send({ embeds: [enviado] })

    const verify = await logData.findOne({ GuildID: interaction.guild.id })
            if (verify) {
              await logData.findOneAndUpdate({
                GuildID: interaction.guild.id,
                Channel: `${channel.id}`
              })
          } else if (verify === null) {
            await logData.create({
                GuildID: interaction.guild.id,
                Channel: `${channel.id}`
              })
            }
  }

} 