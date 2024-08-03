const Discord = require("discord.js")
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');
const logData = require('../../models/logs');

module.exports = {
    name: "trancar",
    description: '[ 🛠️ ] Tranque um canal',
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

        if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return interaction.reply(`${emoji.x_} | Voce não tem perm`) 
        let channelID = await logData.findOne({
            GuildID: interaction.guild.id,
        })
        if (!channelID) return interaction.reply("Canal de Logs Mod não foi setado!")
        let gg = channelID.Channel
        let channel = interaction.guild.channels.cache.get(gg)   

            interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: false })

        let embed = new Discord.EmbedBuilder()
            .setAuthor({ name: interaction.guild.name + ` - Lock`, iconURL: interaction.guild.iconURL({ dynamic: true }), url: `https://discord.gg/aDVrjdT7` })
            .setDescription(`᲼᲼\n**CANAL** bloqueado com sucesso\nPara **DESBLOQUEAR** clique no botão abaixo.`)
            .setColor(config.embed)
            .setThumbnail(config.Logo)
            .setTimestamp()
            .setFooter({ text: `Trancado por ` + interaction.user.username, iconURL: client.user.avatarURL()})

            let logs = new Discord.EmbedBuilder()
            .setTitle(`Canal Bloqueado`)
            .setColor(config.embed)
            .setDescription(`O adm ${interaction.user} trancou o canal ${interaction.channel}`)

        let row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId("unlock")
                    .setStyle("DANGER")
                    .setLabel("Clique aqui para desbloquear o canal")
            )
            channel.send({ embeds: [logs] })
            const msg = await interaction.channel.send({ embeds: [embed], components: [row] })

        const collector = interaction.channel.createMessageComponentCollector({ componentType: "BUTTON" })
        collector.on("collect", (interaction) => {

            if (interaction.customId === "unlock") {
                if(!interaction.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) 
                return interaction.reply({ content: `Você não possui permissão para isso!`, ephemeral: true })
                interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SEND_MESSAGES: true })


                let embed2 = new Discord.EmbedBuilder()
                .setAuthor({ name: interaction.guild.name + ` - Unlock`, iconURL: interaction.guild.iconURL({ dynamic: true }), url: `https://discord.gg/aDVrjdT7` })
                .setDescription(`᲼᲼\n**CANAL** desbloqueado\nCaso queira bloquear novamente 
                execute de novo o comando.`)
                .setColor(config.embed)
                .setThumbnail(config.Logo)
                .setTimestamp()
                .setFooter({ text: `Destrancado por ` +  interaction.user.username, iconURL: client.user.avatarURL()})

                let logs22 = new Discord.EmbedBuilder()
                .setTitle(`Canal Desbloqueado`)
                .setColor(config.embed)
                .setDescription(`O adm ${interaction.user} destrancou o canal ${interaction.channel}`)
                channel.send({ embeds: [logs22] })
                msg.edit({ embeds: [embed2], components: [] })
                .then(m => { setTimeout(() => { m.delete() }, 5000) })
            }
        })
    }
}