const Discord = require("discord.js");
const db = require('quick.db')
const logData = require('../../models/logs');
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');

module.exports = {
    name: "mute",
    description: "[ 🛠️ ] Adicione Um Cargo A Um Membro!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Qual usuario que será mutado?",
            required: true,
            type: Discord.ApplicationCommandOptionType.User,
        },
    ],

    run: async(client, interaction, args) => {
        if(user.id == interaction.guild.ownerId) return  interaction.reply({content: `${emoji.x_} | Você não pode banir o dono do server!`});
        if (!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply({content: `${emoji.x_} |Você não tem perm.`})
        let channelID = await logData.findOne({
            GuildID: interaction.guild.id,
        })
        if (!channelID) return interaction.reply("Canal de Logs Mod não foi setado!")
        let gg = channelID.Channel
        let channel = interaction.guild.channels.cache.get(gg) 
        let servidor = interaction.guild.id;

        let cargo_mute = await db.get(`cargo_mute_${interaction.guild.id}`);
        let cargo_mute_no_servidor = client.guilds.cache.get(servidor).roles.cache.get(cargo_mute);

        if (!cargo_mute_no_servidor || !cargo_mute || cargo_mute === null || cargo_mute === false) return interaction.reply(`**${interaction.user} O cargo mute não está configurado no servidor.**`);
        let membro = interaction.options.getUser("user");

        let embed_2 = new Discord.EmbedBuilder()
        .setColor(config.embed)
        .setDescription(`${emoji.correto} | **O usuário ${membro} foi mutado com sucesso.**`);

        channel.send({ embeds: [embed_2] })
        interaction.reply({ embeds: [embed_2] }).then(msg => {

            client.guilds.cache.get(servidor).members.cache.get(membro.id).roles.add(cargo_mute_no_servidor.id).catch(err => {

                msg.edit({ content: `<:x__:979386984030167150> | **Ops! Algo deu errado.**`, embeds: [] });

            })

        })

    }
}