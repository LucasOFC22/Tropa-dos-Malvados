const Discord = require("discord.js");
const db = require('quick.db')
const logData = require('../../models/logs');
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');

module.exports = {
    name: "unmute",
    description: "[ 🛠️ ] Retire o mute de um usuario!",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Qual usuario será retirado o mute?",
            required: true,
            type: Discord.ApplicationCommandOptionType.User,
        },
    ],

    run: async(client, interaction, args) => {
            if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply(`${emoji.x_} | Voce não tem perm`) 

        let servidor = interaction.guild.id;

        let cargo_mute = await db.get(`cargo_mute_${interaction.guild.id}`);
        let cargo_mute_no_servidor = client.guilds.cache.get(servidor).roles.cache.get(cargo_mute);

        if (!cargo_mute_no_servidor || !cargo_mute || cargo_mute === null || cargo_mute === false) return interaction.reply(`**${interaction.user} O cargo mute não está configurado no servidor.**`);
        let membro = interaction.options.getUser("user");

        let embed_2 = new Discord.EmbedBuilder()
        .setColor(config.embed)
        .setDescription(`**O usuário ${membro} foi desmutado com sucesso.**`);

        interaction.reply({ embeds: [embed_2] }).then(msg => {

            client.guilds.cache.get(servidor).members.cache.get(membro.id).roles.remove(cargo_mute_no_servidor.id).catch(err => {

                interaction.editReply({ content: `**Ops! Algo deu errado.**`, embeds: [] });

            })

        })

    }
}