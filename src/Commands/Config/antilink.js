const Discord = require("discord.js");
const logData = require('../../models/logs');
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');
const antilinkData = require('../../models/antilink');

module.exports = {
    name: "antilink",
    description: "[  ⚙️ ] Bloquear links",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'opcao',
            description: 'Selecione a opcao desejada',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Ativar Antilink',
                    value: 'on'
                },                          
                {                           
                    name: 'Desativar Antilink',
                    value: 'off'
                }
            ],
        }
    ],
    run: async(client, interaction, args) => {



        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply({content: `${emoji.x_} | Você não tem perm.`})
        let channelID = await logData.findOne({
            GuildID: interaction.guild.id,
        })

        if (!channelID) return interaction.reply("Canal de Logs Mod não foi setado!")
        let gg = channelID.Channel
        let channel = interaction.guild.channels.cache.get(gg) 
        let opcao = interaction.options.getString('opcao');

        if (opcao === "on") {

            let ativado = new Discord.EmbedBuilder()
            .setTitle(`O sistema de antilinks`)
            .setColor(config.embed)
            .setDescription(`O sistema foi ativado pelo ${interaction.user}`)

            channel.send({ embeds: [ativado] })
            interaction.reply(`O sistema foi ativado com sucesso!`);

            const verify = await antilinkData.findOne({ GuildID: interaction.guild.id })
            if (verify) {
              await antilinkData.findOneAndUpdate({
                GuildID: interaction.guild.id,
                Status: `on`
              })
          } else if (verify === null) {
            await antilinkData.create({
                GuildID: interaction.guild.id,
                Status: `on`
              })
            }
        }



        if (opcao === "off") {

            let desativado = new Discord.EmbedBuilder()
            .setTitle(`O sistema de antilinks`)
            .setColor(config.embed)
            .setDescription(`O sistema foi desativado pelo ${interaction.user}`)
            channel.send({ embeds: [desativado] })

            interaction.reply(`O sistema foi desativado com sucesso!`);
            
            const verify = await antilinkData.findOne({ GuildID: interaction.guild.id })
            if (verify) {
              await antilinkData.findOneAndUpdate({
                GuildID: interaction.guild.id,
                Status: `off`
              })
          } else if (verify === null) {
            await antilinkData.create({
                GuildID: interaction.guild.id,
                Status: `off`
              })
            }
        }



    }

}