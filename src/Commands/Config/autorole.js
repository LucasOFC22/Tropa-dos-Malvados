const Discord = require("discord.js");
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');
const roleData = require('../../models/autorole');
const logData = require('../../models/logs');

module.exports = {
    name: "autorole",
    description: "[ ⚙️ ] Cargo ao entrar",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'opcao',
            description: 'Selecione a opcao desejada',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Ativar Autorole',
                    value: 'on'
                },                          
                {                           
                    name: 'Desativar Autorole',
                    value: 'off'
                }
            ],
        },
        {
            name: "cargo",
            type: Discord.ApplicationCommandOptionType.Role,
            description: "seleciona o cargo que deseja setar.",
            required: false
            
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
        let cargo = interaction.options.getRole('cargo');
        if (opcao === "on") {
            
            let ativado = new Discord.EmbedBuilder()
            .setTitle(`O sistema de autorole`)
            .setColor(config.embed)
            .setDescription(`O sistema foi ativado pelo ${interaction.user}, cargo ${cargo}`)
            channel.send({ embeds: [ativado] })
            interaction.reply(`O sistema foi ativado com sucesso!`);

            const verify = await roleData.findOne({ GuildID: interaction.guild.id })
            if (verify) {
              await roleData.findOneAndUpdate({
                GuildID: interaction.guild.id,
                Role: `${cargo.id}`
              })
          } else if (verify === null) {
            await roleData.create({
                GuildID: interaction.guild.id,
                Role: `${cargo.id}`
              })
            }

        };

        if (opcao === "off") {
  
            let desativado = new Discord.EmbedBuilder()
            .setTitle(`O sistema de autorole`)
            .setColor(config.embed)
            .setDescription(`O sistema foi desativado pelo ${interaction.user}`)
            channel.send({ embeds: [desativado] })
            interaction.reply(`O sistema foi desativado com sucesso!`);

            const data2 = await roleData.findOne({
                GuildID: interaction.guild.id
            });

            if (data2) {
                await roleData.findOneAndRemove({
                    GuildID: interaction.guild.id
                });

        };

    }}
}