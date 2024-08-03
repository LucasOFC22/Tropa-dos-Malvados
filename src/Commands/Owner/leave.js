const Discord = require('discord.js')
const config = require("../../config/config.json")

module.exports = {
    name: 'leave',
    description: '[ 👑 ] Sair do servidor!',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'server',
            description: '[ 👑 ] Escreva o id do servidor',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    run: async (client, interaction, args) => {

      let id = interaction.options.getString('server')

      if(interaction.user.id !== '1116750535345836055') return interaction.reply(`🚨 | Apenas meu desenvolvedor tem acesso`) 
    client.guilds.cache.get(`${id}`).leave()

    let embed = new Discord.EmbedBuilder()
        .setTitle(`Sair do servidor`)
        .setColor(config.embed)
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
        .setTimestamp(new Date())
        .setDescription('Sair do servidor com sucesso!');

interaction.reply({embeds: [embed] })
    }
}