const Discord = require('discord.js')
const logData = require('../../models/logs');
const config = require('../../config/config.json');
const emoji = require('../../config/emoji.json');

module.exports = {
    name: 'ban',
    description: 'Bani um usuário de um servidor.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [{
        name: 'usuario',
        type: Discord.ApplicationCommandOptionType.User,
        description: 'Mencione um usuário.',
        required: true,
    
    },
    {
        name: 'motivo',
        type: Discord.ApplicationCommandOptionType.String,
        description:  'Informe o motivo do banimento! ',
        required: false
    }
], 
    run: async (client, interaction, args) => {
        let usu = interaction.options.getUser("usuario")
        const memberTarget = interaction.guild.members.cache.get(usu.id)
        let reason = interaction.options.getString("motivo")
        if (!reason) reason = "Sem Motivo";
        let channelID = await logData.findOne({
            GuildID: interaction.guild.id,
        })
        if (!channelID) return interaction.reply("Canal de Logs Mod não foi setado!")
        let gg = channelID.Channel
        let channel = interaction.guild.channels.cache.get(gg) 

        let clearbutton = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("sim")
            .setLabel("Sim")
            .setStyle("SUCCESS"),
            new Discord.ButtonBuilder()
            .setCustomId("nao")
            .setLabel("Não")
            .setStyle("DANGER"),
        )

        if(!interaction.member.permissions.has("BAN_MEMBERS")) {
            interaction.reply(`${emoji.x_} | Não posso concluir este comando pois você não possui permissão de \`BANIR MEMBRO\`.`)
        } else {
            if(usu.id == interaction.guild.ownerId) return  interaction.reply({content: `${emoji.x_} | Você não pode banir o dono do server!`});
            if(!interaction.guild.me.permissions.has("BAN_MEMBERS")) return interaction.reply(`${emoji.x_} | Não tenho permissão de banir membros! `)
            if(usu.id === interaction.user.id) return interaction.reply(`${emoji.x_} | Você não pode se proprio banir! `)

            
            let confirm = new Discord.EmbedBuilder()
            .setColor(config.embed)
            .setDescription(`**📝 | Tem certeza que quer banir ${usu} ? **`)
            .setFooter({ text: `${interaction.guild.name} Enviado`, iconURL: `${interaction.guild.iconURL({ dynamic: true })}`})
            .setTimestamp()
            let enviado = await interaction.channel.send({ embeds: [confirm], components: [clearbutton]})

            const collector = enviado.createMessageComponentCollector({ componentType: "BUTTON"})

            collector.on("collect", async(interaction) => {
            if(!interaction.memberPermissions.has("ADMINISTRATOR")) return interaction.reply({ content: `${interaction.user}, apenas administradores podem limpar o chat`, ephemeral: true})
            if( interaction.customId === "sim") {

                let sucess = new Discord.EmbedBuilder()
                .setTitle(`<a:miku:1073374831644520449> | Banimento feito com sucesso!`)
                .setDescription(`**📌 | Voce baniu o jogador ${usu} por ${reason}!**`)
                .setColor(config.embed)
                .setFooter({ text: `🕐 | Enviado ` })
                .setTimestamp()
                enviado.edit({embeds: [sucess], components: [] })

            const embed = new Discord.EmbedBuilder()
                .setTitle(`<:ban:1073373787426394365 | Você está banido!`)
                .setThumbnail(interaction.guild.iconURL({dynamic : true}))
                .setDescription(`🔨 | Servidor: ${interaction.guild.name}\n🔨 | Banido por: ${interaction.user}\n🔨 | Motivo: ${reason}`)
                .setColor(config.embed)
                .setTimestamp()
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic : true}) });  

            const banmsg = new Discord.EmbedBuilder()
                .setTitle(`<:ban:1073373787426394365 | Banimento!`)
                .setThumbnail(usu.displayAvatarURL())
                .setDescription(`🔨 | Banido: ${usu.username}\n🖖 | Por: ${interaction.user}\n🔔 | Motivo: ${reason}`)
                .setColor(config.embed)
                .setTimestamp()
                .setFooter({ text: interaction.user.tag, iconURL: interaction.user.displayAvatarURL() });

            await usu.send({embeds: [embed]});
            await memberTarget.ban({ reason: reason });
            channel.send({embeds: [banmsg]});
        }
        if( interaction.customId === "nao") {
            enviado.edit({
                content: "**Você cancelou a ação de Banimento.**",
                embeds: [],
                components: []
    })
}})}
}}