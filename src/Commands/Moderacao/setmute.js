const Discord = require("discord.js");
const db = require('quick.db')
const logData = require('../../models/logs');
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');

module.exports = {
    name: "setmute",
    description: "[ 🛠️ ] Setar o cargo de mute!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "cargo",
            description: "Qual cargo sera configurado?",
            required: true,
            type: Discord.ApplicationCommandOptionType.Role,
        }
           
    
    ],

    run: async(client, interaction, args) => {
        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply(`${emoji.x_} | Voce não tem perm`) 
        let channelID = await logData.findOne({
            GuildID: interaction.guild.id,
        })
        if (!channelID) return interaction.reply("Canal de Logs Mod não foi setado!")
        let gg = channelID.Channel
        let channel = interaction.guild.channels.cache.get(gg)
        let servidor = interaction.guild.id;
        let cargo_mute = interaction.options.getRole("cargo");

        let embed_2 = new Discord.EmbedBuilder()
        .setColor(config.embed)
        .setDescription(`**O cargo ${cargo_mute} foi configurado com sucesso.**`);

        await db.set(`cargo_mute_${interaction.guild.id}`, cargo_mute.id);
        channel.send({ embeds: [embed_2] });
        interaction.reply({ content: `${interaction.user}`, embeds: [embed_2] });

    }
}