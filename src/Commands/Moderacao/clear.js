const Discord = require('discord.js');
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');
const logData = require('../../models/logs');

module.exports = {
  name: "clear",
  description: "[ 🛠️ ] Limpe mensagens de um canal",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
      {
          name: 'quantidade',
          type: Discord.ApplicationCommandOptionType.Number,
          description: 'Quantas mensagens deseja apagar?',
          required: true,
      },
  ],




  run: async (client, interaction, args) => {
    try {
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply({content: `${emoji.x_} |Você não tem perm.`})
        let channelID = await logData.findOne({
            GuildID: interaction.guild.id,
        })
        if (!channelID) return interaction.reply("Canal de Logs Mod não foi setado!")
        let gg = channelID.Channel
        let channel = interaction.guild.channels.cache.get(gg)
          if(!interaction.guild.members.cache.get(client.user.id).permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) return interaction.reply({content: `Eu não tenho perm para isso!`});
          let delamount = interaction.options.getNumber('quantidade');
          if (isNaN(delamount) || parseInt(delamount <= 0)) return interaction.reply({content: ' > ``Coloque um número específico;``\n > ``Exp: /clear 3.``'} )

          if (parseInt(delamount) > 100) return interaction.reply({ content:'Só podes eleminar 99 mensagens de uma vez!'})

          let embed = new Discord.EmbedBuilder()
          .setDescription(`**♻️ O chat foi Limpo.**`)
          .setColor(config.embed)
          .setTitle('`CLEAR`')
          .setThumbnail('https://imgur.com/Qxc4Lcr.gif')
          .setFooter({ text: `• Faxineiro: ${interaction.user.username}`  }) 

        let logs = new Discord.EmbedBuilder()
        .setTitle(`🧹 | O Chat foi Limpo`)
        .setColor(config.embed)
        .setDescription(`O adm: ${interaction.user} limpou ${delamount} messages no canal ${interaction.channel}`)

          channel.send({ embeds: [logs] })
          interaction.reply({embeds: [embed]})
          .then(m => {
            setTimeout(() => {
              interaction.channel.bulkDelete(parseInt(delamount) * 1 + 1, true)
            }, 1000) 
        })

      
    } catch (e) {
        console.log(e)
    }

      
  }
}