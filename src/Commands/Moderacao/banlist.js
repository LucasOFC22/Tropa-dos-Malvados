const Discord = require("discord.js")
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');

module.exports = {
  name: "banlist",
  description: "[ 🛠️ ] Ver a lista de banimentos do servidor",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction, args) => {

    if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply(`Você não possui permissão de \`Administrador\`!`)
   const bybaliza = interaction.guild.bans.fetch()
   let banMembers = (await bybaliza)
          .map((member) => member.user.id)
          .join("\n")
   const baliza_d = (await bybaliza).map((baliza) => baliza.user.tag).join("\n") || "\`\`\`Ninguém foi banido\`\`\`"
   const bybaliza2 = new Discord.EmbedBuilder()
    .setTitle(`📓 | Lista de banidos`)
    .setDescription(`${baliza_d}  ${banMembers}`)
    .setColor(config.embed)
    .setFooter({ text: `${client.user.username}`, iconURL: client.user.displayAvatarURL({dinamyc : true})})
    .setTimestamp(new Date())
    
    interaction.reply({embeds: [bybaliza2]})
  }
  }